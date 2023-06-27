import { resolve } from "path"
import express from "express"
import { ClientRes, ServerRes } from "../../interface"
import { checkValid, researchInfo, voteStudent, voteTeacher } from "./researchInfo"
import { unlinkSync, writeFileSync, readFileSync } from "fs"
import fileUpload from "express-fileupload"
import { RawData, WebSocket } from "ws"
import { categoryData } from "./status"

const app = express()
app.use(express.static(resolve(__dirname, "../../client/build")))
app.use(express.json())
app.use(fileUpload())
app.get("/download", (_, res) => {
    res.download(resolve(__dirname, "../../../data/research.xlsx"), "research.xlsx")
})
app.get("*", (_, res) => {
    res.sendFile(resolve(__dirname, "../../client/build/index.html"));
})
const server = app.listen(7911, () => {
    console.log("The server has started!")
})
const wsServer = new WebSocket.Server({ server })

app.post("/api", async (req, res) => {
    try {
        const send = (serverRes: ServerRes) => {
            res.json(serverRes)
        }
    
        const { query, content } = req.body as ClientRes
        if (query === "getResearchInfo") {
            send({
                type: "researchInfo",
                content: {
                    researchInfo
                }
            })
            return
        }
        if (query === "checkValid") {
            const res = await checkValid(content.category, content.code)
            send({
                type: "checkValid",
                content: res
            })
            return
        }
        if (query === "submit") {
            if (content.category === "Student") {
                const res = voteStudent(content.code, content.vote)
                if (!res) {
                    send({
                        type: "submit",
                        content: {
                            result: false
                        }
                    })
                    return
                }
            }
            else {
                const res = voteTeacher(content.code, content.vote)
                if (!res) {
                    send({
                        type: "submit",
                        content: {
                            result: false
                        }
                    })
                    return
                }
            }
            send({
                type: "submit",
                content: {
                    result: true
                }
            })
            return
        }
        if (query === "getCategoryData") {
            send({
                type: "categoryData",
                content: {
                    categoryData
                }
            })
        }
    }
    catch (error) {
        console.error(error)
    }
})

const PATH = "../../../data/research.xlsx"

app.post("/fileupload", (req, res) => {
    try {
        const files = req.files
        if (!files) {
            res.json({
                type: "upload",
                content: {
                    result: false
                }
            })
            return
        }
        const uploadFile = files["excel"]
        if ("length" in uploadFile) {
            res.json({
                type: "upload",
                content: {
                    result: false
                }
            })
            return
        }
        unlinkSync(resolve(__dirname, PATH))
        uploadFile.mv(resolve(__dirname, PATH))
        writeFileSync(resolve(__dirname, "../../../data/reload.txt"), "True")
        res.json({
            type: "upload",
            content: {
                result: true
            }
        })
    }
    catch (error) {
        console.error(error)
    }
})

const users: Map<string, WebSocket> = new Map()

const generateSessionKey = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let sessionKey = '';

    for (let i = 0; i < 10; i++) {
        sessionKey += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return sessionKey;
}

const allSend = (serverRes: ServerRes) => {
    users.forEach((socket) => {
        socket.send(JSON.stringify(serverRes))
    })
}

wsServer.on("connection", async (socket) => {
    const sessionKey = generateSessionKey()
    users.set(sessionKey, socket)
    socket.on("message", response)
    socket.on("close", () => users.delete(sessionKey))
})

const response = async (data: RawData) => {
    const clientRes = JSON.parse(data.toString()) as ClientRes
    if (clientRes.query !== "toggleSelected") return
    const { half, category } = clientRes.content

    categoryData[half].find((c) => c.name === category)?.toggleSelected()
    allSend({
        type: "categoryData",
        content: {
            categoryData
        }
    })
}