/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { Button } from "./components/Button"

const FormHome = () => {
    return (
        <div css={css`
            display: flex;
            flex-direction: column;
            gap: 50px;
        `}>
            <Button content="Student" href="./student" />
            <Button content="Teacher" href="./teacher" />
        </div>
    )
}

export { FormHome }