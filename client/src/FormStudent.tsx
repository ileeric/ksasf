/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Description, Option, OptionContainer, Question, QuestionHeader, Title } from "./components/Form"

type ResearchData = {
    isAvailable: [0 | 1]
    code: [string]
    body: [string]
}

const FormStudent = () => {
    const [searchParams] = useSearchParams()
    const [myCategoryResearchInfo, setMyCategoryResearchInfo] = useState<ResearchData[]>([])
    const [otherCategoryResearchInfo, setOtherCategoryResearchInfo] = useState<ResearchData[]>([])

    const [selectedFirst, setSelectedFirst] = useState<boolean[]>([])
    const [selectedSecond, setSelectedSecond] = useState<boolean[]>([])

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
                navigate("/form/student")
                return
            }
            const response = await fetch(`https://kaist.me/api/ksa/ksasf/vote.php?code=${code}&role=S`)
            if (response.toString() === "Already Voted") {
                window.alert("You've already voted.")
                navigate("/form/student")
                return
            }
            const data = (await response.json()) as { category1: ResearchData[], category2: ResearchData[] }
            if (data.category1.length === 0) {
                window.alert("Invalid identication code.")
                navigate("/form/student")
                return
            }
            const myCategoryResearchInfo = data.category1
            setMyCategoryResearchInfo(myCategoryResearchInfo)
            const otherCategoryResearchInfo = data.category2
            setOtherCategoryResearchInfo(otherCategoryResearchInfo)
            setSelectedFirst(new Array(myCategoryResearchInfo.length).fill(false))
            setSelectedSecond(new Array(otherCategoryResearchInfo.length).fill(false))
        })()
    }, [navigate, code])

    const submit = async () => {
        if (selectedFirst.filter((v) => v).length !== 2) {
            window.alert("You must select two from the first question.")
            return
        }
        if (selectedSecond.filter((v) => v).length !== 1) {
            window.alert("You must select one from the second question.")
            return
        }
        const selectedFirstIndex = selectedFirst.map((v, i) => [v, i] as [boolean, number]).filter(([v]) => v).map(([_, i]) => i)
        const selectedSecondIndex = selectedSecond.findIndex((v) => v)
        fetch(`https://kaist.me/api/ksa/ksasf/do.php?code=${code}&role=S&p1=${myCategoryResearchInfo[selectedFirstIndex[0]].code}&p2=${myCategoryResearchInfo[selectedFirstIndex[1]].code}&p3=${otherCategoryResearchInfo[selectedSecondIndex]}`)
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
                        1. Please select your TWO favorite posters from your session.
                    </Title>
                    <Description>
                        You can't choose your team and your school's team.
                    </Description>
                </QuestionHeader>
                <OptionContainer>
                    {
                        myCategoryResearchInfo
                            .map((research, i) => (
                                <Option
                                    content={research.body[0]} disabled={research.isAvailable[0] === 0}
                                    action={() => setSelectedFirst((rawSelected) => {
                                        const selected = [...rawSelected]
                                        selected[i] = !selected[i]
                                        return selected
                                    })}
                                />
                            ))

                    }
                </OptionContainer>
            </Question>
            <Question>
                <QuestionHeader>
                    <Title>
                        2. Please select your ONE favorite poster outside of your session.
                    </Title>
                    <Description>
                        You can't choose your school's team.
                    </Description>
                </QuestionHeader>
                <OptionContainer>
                    {
                        otherCategoryResearchInfo
                            .map((research, i) => (
                                <Option
                                    content={research.body[0]} disabled={research.isAvailable[0] === 0}
                                    action={() => setSelectedSecond((rawSelected) => {
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

export { FormStudent }