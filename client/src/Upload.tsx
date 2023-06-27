/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { useState } from "react"
import { ServerResUpload } from "../../interface"

const Upload = () => {
    const [ file, setFile ] = useState<File>()

    return (
        <form action="/fileupload" method="post" encType="multipart/form-data">
            <div css={css`
                display: flex;
                flex-direction: column;
                gap: 50px;
            `}>
                <input type="file"
                onChange={(e) => {
                    const files = e.target.files
                    if (!files) return
                    setFile(files[0])
                }} />
                <div css={css`
                    border: 1px solid white;
                    padding: 30px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 10px;
                `} onClick={async () => {
                    if (!file) return
                    const formData = new FormData()
                    formData.append("excel", file)
                    const response = await fetch(`${window.location.origin}/fileupload/`, {
                        method: "POST",
                        body: formData
                    })
                    const data = await response.json() as ServerResUpload
                    window.alert(data.content.result ? "Success" : "Fail")
                }}>
                    Submit
                </div>
            </div>
        </form>

    )
}

export { Upload }