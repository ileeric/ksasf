/** @jsxImportSource @emotion/react */
import { SerializedStyles, css } from "@emotion/react"
import { useState } from "react"

interface QuestionProps {
    children: React.ReactNode
}

const Question: React.FC<QuestionProps> = (props) => {
    return (
        <div css={css`
            padding: 15px 15px;
            border-radius: 10px;
            width: 100%;
            box-sizing: border-box;
            background-color: white;
            color: #00122d;
        `}>
            {props.children}
        </div>
    )
}

interface QuestionHeaderProps {
    children: React.ReactNode
}

const QuestionHeader: React.FC<QuestionHeaderProps> = (props) => {
    return (
        <div css={css`
            margin: 0 0 15px;
            display: flex;
            flex-direction: column;
            gap: 8px;
        `}>
            {props.children}
        </div>
    )
}

interface TitleProps {
    children: string
    style?: SerializedStyles
}

const Title: React.FC<TitleProps> = (props) => {
    return (
        <div css={css`
            display: flex;
            justify-content: start;
            font-size: 17px;
            ${props.style}
        `}>
            {props.children}
        </div>
    )
}

interface DescriptionProps {
    children: string
}

const Description: React.FC<DescriptionProps> = (props) => {
    return (
        <div css={css`
            display: flex;
            justify-content: start;
            font-size: 16px;
            color: #2a9ee9;
        `}>
            {props.children}
        </div>
    )
}

interface OptionContainerProps {
    children: React.ReactNode
}

const OptionContainer: React.FC<OptionContainerProps> = (props) => {
    return (
        <div css={css`
            display: flex;
            flex-direction: column;
            gap: 10px;
        `}>
            {props.children}
        </div>
    )
}

interface OptionProps {
    content: string
    disabled: boolean
    action: () => void
}

const Option: React.FC<OptionProps> = (props) => {
    const [checked, setChecked] = useState(false)

    return (
        <div>
            <label css={css`
                display: flex;
                align-items: center;
                font-family: "a고딕13";
                color: #00122d;
            `}>
                <div css={css`
                    margin: 0 10px 0 0;
                    height: 100%;
                `}>
                    <input
                        type="checkbox" css={css`display: none; margin: 0;`} disabled={props.disabled}
                        onChange={() => {
                            props.action()
                            setChecked((checked) => !checked)
                        }} />
                    <Checkbox disabled={props.disabled} checked={checked} />
                </div>
                {props.content}
            </label>
        </div>
    )
}

interface CheckboxProps {
    checked: boolean
    disabled: boolean
}

const Checkbox: React.FC<CheckboxProps> = (props) => {
    return (
        <div css={css`
            border: 1.5px solid gainsboro;
            border-radius: 4px;
            width: 16px;
            height: 16px;
            background-color: ${props.disabled ? "gainsboro" : (props.checked ? "#2a9ee9" : "white")};
            ${props.checked
                ? `border-color: transparent;
                background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
                background-size: 100% 100%;
                background-position: 50%;
                background-repeat: no-repeat;`
                : ""
            }
        `} />
    )
}

export { Question, QuestionHeader, Title, Description, OptionContainer, Option }