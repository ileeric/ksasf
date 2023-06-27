/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const FormRegister = () => {
    const navigate = useNavigate()
    const [code, setCode] = useState("")

    useEffect(() => {
        const curTime = new Date()
        const curUTCTime = curTime.getTime() + curTime.getTimezoneOffset() * 60 * 1000
        const finishTime = new Date("2023-06-27T18:30:00+09:00")
        const finishUTCTime = finishTime.getTime() + finishTime.getTimezoneOffset() * 60 * 1000
        if (curUTCTime > finishUTCTime) {
            window.alert("The voting time is over.")
            navigate("/form")
            return
        }
    }, [navigate])

    return (
        <div css={css`
            display: flex;
            flex-direction: column;
            gap: 30px;
        `}>
            <div css={css`
                border: 2px solid white;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 30px 50px;
                flex-direction: column;
                gap: 20px;
                color: white;
            `}>
                <div css={css`
                    text-align: center;
                    font-size: 26px;
                `}>
                    Please enter the identification code.
                </div>
                <input css={css`
                    border: none;
                    border-bottom: 1px solid gray;
                    font-size: 17px;
                    padding: 3px;
                    background: transparent;
                    color: white;
                    text-align: center;
                    outline: none;
                `}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={async (e) => {
                    if (e.key === "Enter") navigate(`./survey?code=${code}`)
                }}
                type="text" placeholder="Enter here!" autoFocus />
            </div>
            <div css={css`
                width: 100%;
                display: flex;
                justify-content: end;
            `}>
                <div css={css`
                    color: #e1ffff;
                    font-size: 19px;
                    width: 110px;
                    padding: 11px 5px 9px;
                    text-align: center;
                    border-radius: 15px;
                    background: white;
                    color: #12486d;
                `} onClick={async () => {
                    navigate(`./survey?code=${code}`)
                }}>
                    Go to the survey
                </div>
            </div>
        </div>
    )
}

export { FormRegister }