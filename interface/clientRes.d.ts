import { Research } from "../server/src/data/researchInfo"

interface ClientResTemplate {
    query: string
    content: object | null
}

interface ClientResResearchInfo extends ClientResTemplate {
    query: "getResearchInfo"
    content: null
}

interface ClientResCheckValid extends ClientResTemplate {
    query: "checkValid"
    content: {
        category: "Student" | "Teacher"
        code: string
    }
}

interface ClientResSubmitStudent extends ClientResTemplate {
    query: "submit"
    content: {
        category: "Student"
        code: string
        vote: {            
            first: Research[]
            second: Research
        }
    }
}

interface ClientResSubmitTeacher extends ClientResTemplate {
    query: "submit"
    content: {
        category: "Teacher"
        code: string
        vote: Research
    }
}

type ClientResSubmit = ClientResSubmitStudent | ClientResSubmitTeacher

interface ClientResUpload extends ClientResTemplate {
    query: "upload"
    content: {
        data: FormData
    }
}

interface ClientResToggleSelected extends ClientResTemplate {
    query: "toggleSelected"
    content: {
        half: "first" | "second"
        category: string
    }
}

interface ClientResCategoryData extends ClientResTemplate {
    query: "getCategoryData"
    content: null
}

type ClientRes =
    ClientResResearchInfo |
    ClientResCheckValid |
    ClientResSubmit |
    ClientResUpload |
    ClientResToggleSelected |
    ClientResCategoryData

export type { ClientRes }