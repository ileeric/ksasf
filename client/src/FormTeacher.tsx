/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Option, OptionContainer, Question, QuestionHeader, Title } from "./components/Form"

type ResearchData = {
    isAvailable: [0 | 1]
    code: [string]
    body: [string]
}

const FormTeacher = () => {
    const [searchParams] = useSearchParams()
    const [researchInfo, setResearchInfo] = useState<ResearchData[]>([])
    const [selected, setSelected] = useState<boolean[]>([])

    const navigate = useNavigate()
    const code = searchParams.get("code")

    useEffect(() => {
        (async () => {
            const curTime = new Date()
            const curUTCTime = curTime.getTime() + curTime.getTimezoneOffset() * 60 * 1000
            const finishTime = new Date("2023-06-27T18:30:00+09:00")
            const finishUTCTime = finishTime.getTime() + finishTime.getTimezoneOffset() * 60 * 1000
            if (curUTCTime > finishUTCTime) {
                window.alert("The voting time is over.")
                navigate("/form")
                return
            }
            if (code === null) {
                window.alert("Unknown identification code.")
                navigate("/form/teacher")
                return
            }
            const response = await fetch(`https://kaist.me/api/ksa/ksasf/vote.php?code=${code}&role=T`)
            const data = (await response.json()) as ResearchData[] | { content: string }
            if ("content" in data) {
                window.alert("You've already voted.")
                navigate("/form/student")
                return
            }
            if (data.length === 0) {
                window.alert("Invalid identification code.")
                navigate("/form/student")
                return
            }
            const researchInfo = data
            setResearchInfo(researchInfo)
            setSelected(new Array(researchInfo.length).fill(false))
        })()
    }, [navigate, code])

    const submit = async () => {
        if (selected.filter((v) => v).length !== 3) {
            window.alert("You must select three from the first question.")
            return
        }
        const selectedIndex = selected.map((v, i) => [v, i] as [boolean, number]).filter(([v]) => v).map(([_, i]) => i)
        fetch(`https://kaist.me/api/ksa/ksasf/do.php?code=${code}&role=T&p1=${researchInfo[selectedIndex[0]].code}&p2=${researchInfo[selectedIndex[1]].code}&p3=${researchInfo[selectedIndex[2]].code}`)
        navigate("/form/result")
    }

    return (
        <div css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            font-family: "Noto Sans KR", sans-serif;
            font-weight: 500;
            max-width: 1000px;
            height: 100%;
            gap: 30px;
            box-sizing: border-box;
        `}>
            <Question>
                <QuestionHeader>
                    <Title>
                        1. Please select your THREE favorite posters from your session.
                    </Title>
                </QuestionHeader>
                <OptionContainer>
                    {
                        researchInfo
                            .map((research, i) => (
                                <Option
                                    content={research.body[0]} disabled={research.isAvailable[0] === 0}
                                    action={() => setSelected((rawSelected) => {
                                        const selected = [...rawSelected]
                                        selected[i] = !selected[i]
                                        return selected
                                    })}
                                />
                            ))
                    }
                </OptionContainer>
            </Question>
            <div css={css`
                width: 100%;
                display: flex;
                justify-content: end;
            `}>
                <div css={css`
                    border-radius: 10px;
                    width: 100px;
                    height: 50px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: white;
                    color: #00122d;
                    font-size: 19px;
                    margin-bottom: 30px;
                `} onClick={submit}>
                    Submit
                </div>
            </div>
        </div>
    )
}

export { FormTeacher }