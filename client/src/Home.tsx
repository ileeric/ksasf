/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { Button } from "./components/Button"

const Home = () => {
    return (
        <div css={css`
            display: flex;
            flex-direction: column;
            gap: 50px;
        `}>
            <Button content="Survey" href="./form" />
            <Button content="Status" href="./admin" />
        </div>
    )
}

export { Home }