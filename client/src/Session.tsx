/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"

interface SessionProps {
    name: string
    action: () => void
    selected: boolean
    mode: "mobile" | "pc"
}

const Session: React.FC<SessionProps> = (props) => {
    return (
        <div css={css`
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid white;
            border-radius: 5px;
            aspect-ratio: 3/2;
            max-height: 13vh;
            height: ${props.mode === "mobile" ? 70 : 100}px;
            font-size: 25px;
            background-color: ${props.selected ? "white" : "#00122d"};
            color: ${props.selected ? "#00122d" : "white"};
        `} onClick={props.action}>
            {props.name}
        </div>
    )
}

export { Session }