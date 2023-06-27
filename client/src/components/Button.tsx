/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { useNavigate } from "react-router-dom"

interface ButtonProps {
    content: string
    href: string
}

const Button: React.FC<ButtonProps> = (props) => {
    const navigate = useNavigate()

    return (
        <div css={css`
            border-radius: 10px;
            padding: 30px;
            font-size: 30px;
            border: 2px solid white;
        `} onClick={() => navigate(props.href)}>
            {props.content}
        </div>
    )
}

export { Button }