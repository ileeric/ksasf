import type { Student } from "../server/src/data/studentInfo"
import type { Category } from "../server/src/data/status"

interface ServerResTemplate {
    type: string
    content: object | null
}

interface ServerResResearchInfo extends ServerResTemplate {
    type: "researchInfo"
    content: {
        researchInfo: Research[]
    }
}

interface ServerResCheckValid extends ServerResTemplate {
    type: "checkValid"
    content: {
        result: boolean
        message: string
    }
}

interface ServerResSubmit extends ServerResTemplate {
    type: "submit"
    content: {
        result: boolean
    }
}

interface ServerResUpload extends ServerResTemplate {
    type: "upload"
    content: {
        result: boolean
    }
}

interface ServerResCategoryData extends ServerResTemplate {
    type: "categoryData"
    content: {
        categoryData: {
            first: Category[]
            second: Category[]
        }
    }
}

type ServerRes =
    ServerResResearchInfo |
    ServerResCheckValid |
    ServerResSubmit |
    ServerResUpload |
    ServerResCategoryData

export type { ServerRes, ServerResResearchInfo, ServerResCheckValid, ServerResSubmit, ServerResUpload, ServerResCategoryData }