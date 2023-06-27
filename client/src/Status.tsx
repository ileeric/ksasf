/** @jsxImportSource @emotion/react */
import { SerializedStyles, css } from "@emotion/react"
import React, { useEffect, useState } from "react"
import { Session } from "./Session";
import { connectWS, requestQuery, send } from "./post";
import { ServerRes, ServerResCategoryData } from "../../interface";
import { type CategoryData } from "../../server/src/status"
import { useNavigate, useSearchParams } from "react-router-dom";

const adminCode = process.env["REACT_APP_ADMIN_CODE"]

const room = ["3302", "3304", "3306", "3205", "3207"]

interface MoveProps {
    content: string
    style: SerializedStyles
    action: () => void
}

const Move: React.FC<MoveProps> = (props) => {
    return (
        <div css={css`
            width: 150px;
            height: 30px;
            font-size: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 10px;
            border: 1px solid #00122d;
            transition: background-color 1s, color 1s;
            &:hover {
                border: 1px solid white;
                background-color: white;
                color: #00122d;
            }
            ${props.style}
        `} onClick={props.action}>
            {props.content}
        </div>
    )
}

const Status = () => {
    const [searchParams] = useSearchParams()
    const [half, setHalf] = useState<"first" | "second">("first")
    const [time, setTime] = useState(new Date())
    const [categoryData, setCategoryData] = useState<CategoryData>()
    const [click, setClick] = useState(0)
    const navigate = useNavigate()
    
    const code = searchParams.get("code")
    const mode = searchParams.get("mode")

    const onServerRes = (serverRes: ServerRes) => {
        const { type, content } = serverRes
        if (type === "categoryData") {
            setCategoryData(content.categoryData)
        }
    }

    useEffect(() => {
        if (code !== adminCode) {
            window.alert("Invalid admin code.")
            navigate("/admin")
            return
        }
        connectWS(onServerRes)
        ;(async () => {
            const res = await requestQuery({
                query: "getCategoryData",
                content: null
            }) as ServerResCategoryData
            setCategoryData(res.content.categoryData)
        })()
        const interval = setInterval(() => {
            setTime(new Date())
        }, 1000)
        return (() => clearInterval(interval))
    }, [navigate, code])

    if (mode === "mobile") {
        return (
            <div css={css`
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 40px;
            `}>
                <div css={css`
                    font-size: 30px;
                `} 
                onClick={() => {
                    if (click === 2) {
                        window.alert("홍성민 존잘")
                        setClick(0)
                        return
                    }    
                    setClick((click) => click + 1)
                }}>
                    {time.toLocaleTimeString().replace("오전", "AM").replace("오후", "PM")}
                </div>
                <div css={css`
                    display: flex;
                    flex-direction: column;
                    justify-content: start;
                    align-items: center;
                    gap: 70px;
                `}>
                    <div css={css`
                        width: calc(100vw - 40px);
                        overflow-x: scroll;
                    `}>
                        <div css={css`
                            display: grid;
                            grid-template-columns: repeat(5, 1fr);
                            grid-template-rows: 40px repeat(4, 1fr);
                            gap: 20px;
                        `}>
                            {room.map((name) => (
                                <div css={css`
                                    display: flex;
                                    font-size: 25px;
                                    align-items: center;
                                    justify-content: center;
                                `}>
                                    {name}
                                </div>))}
                            {categoryData?.[half].map((category) =>
                                category.name === ""
                                ? <div />
                                : <Session name={category.name} selected={category.selected} mode={mode}
                                    action={() => {
                                        send({
                                            query: "toggleSelected",
                                            content: {
                                                half,
                                                category: category.name
                                            }
                                        })
                                    }}
                                />
                            )}
                        </div>
                    </div>
                    <div css={css`
                        display: flex;
                        flex-direction: row;
                        gap: 70px;
                        justify-content: center;
                        align-items: center;
                    `}>
                        <Move
                            content="&#9664; First Half"
                            action={() => {
                                setHalf("first")
                            }}
                            style={css`visibility: ${half === "first" ? "hidden" : "visible"};`}
                        />
                        <Move
                            content="Second Half &#9654;"
                            action={() => {
                                setHalf("second")
                            }}
                            style={css`visibility: ${half === "second" ? "hidden" : "visible"};`}
                        />
                    </div>
                </div>
            </div>            
        )
    }

    if (mode === "pc") {
        return (
            <div css={css`
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 40px;
            `}>
                <div css={css`
                    font-size: 30px;
                `}
                onClick={() => {
                    if (click === 2) {
                        window.alert("홍성민 존잘")
                        setClick(0)
                        return
                    }    
                    setClick((click) => click + 1)
                }}>
                    {time.toLocaleTimeString().replace("오전", "AM").replace("오후", "PM")}
                </div>
                <div css={css`
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    gap: 70px;
                `}>
                    <Move
                        content="&#9664; First Half"
                        action={() => {
                            setHalf("first")
                        }}
                        style={css`visibility: ${half === "first" ? "hidden" : "visible"};`}
                    />
                    <div css={css`
                        display: grid;
                        grid-template-columns: repeat(5, 1fr);
                        grid-template-rows: 40px repeat(4, 1fr);
                        gap: 20px;
                    `}>
                        {room.map((name) => (
                            <div css={css`
                                display: flex;
                                font-size: 25px;
                                align-items: center;
                                justify-content: center;
                            `}>
                                {name}
                            </div>))}
                        {categoryData?.[half].map((category) =>
                            category.name === ""
                            ? <div />
                            : <Session name={category.name} selected={category.selected} mode={mode}
                                action={() => {
                                    send({
                                        query: "toggleSelected",
                                        content: {
                                            half,
                                            category: category.name
                                        }
                                    })
                                }}
                            />
                        )}
                    </div>
                    <Move
                        content="Second Half &#9654;"
                        action={() => {
                            setHalf("second")
                        }}
                        style={css`visibility: ${half === "second" ? "hidden" : "visible"};`}
                    />
                </div>
            </div>
        )
    }
    return <div />
}

export { Status }