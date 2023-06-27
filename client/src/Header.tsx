/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import Logo from "./assets/logo.svg"
import Slogan from "./assets/slogan.svg"

const Header = () => {
    return (
        <div css={css`
            width: 100vw;
            position: fixed;
            background-color: #00122d;
            top: 0;
            left: 0;
            display: flex;
            height: 50px;
            border-bottom: 2px solid white;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
        `}>
            <img css={css`
                height: 60px;
            `} src={Logo} alt="logo img" />
            <img css={css`
                height: 33px;
                padding-right: 10px;
            `} src={Slogan} alt="logo img" />
        </div>
    )
}

export { Header }