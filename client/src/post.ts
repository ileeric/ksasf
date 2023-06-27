import type { ClientRes, ServerRes } from "../../interface"

let ws: WebSocket

const requestQuery = async (clientRes: ClientRes): Promise<ServerRes> => {
    const response = await fetch(`${window.location.origin}/api/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(clientRes)
    })
    const data = await response.json() as ServerRes
    return data
}

const connectWS = (onServerRes: (serverRes: ServerRes) => void): WebSocket => {
    ws = new WebSocket(`${window.location.protocol === "http:" ? "ws" : "wss"}://${window.location.host}`)
    ws.addEventListener("message", (event) => {
        onServerRes(JSON.parse(event.data) as ServerRes)
    })
    ws.addEventListener("close", () => connectWS(onServerRes))
    return ws
}

const send = (clientRes: ClientRes) => {
    ws.send(JSON.stringify(clientRes))
}

export { requestQuery, connectWS, send }