import { Row, Workbook } from "exceljs"
import { resolve } from "path";

class Student {
    constructor(
        public readonly name: string,
        public readonly code: string
    ) { }
}

class Research {
    constructor(
        public readonly name: string,
        public readonly category: string,
        public readonly school: string,
        public readonly students: Student[]
    ) { }

    addStudent(student: Student) {
        this.students.push(student)
    }
}

const PATH = "../../../data/research.xlsx"
const researchInfo: Research[] = []

; (async () => {
    try {
        const workbook = new Workbook()
        const worksheet = await workbook.xlsx.readFile(resolve(__dirname, PATH))
        const sheet = worksheet.getWorksheet(1)
        sheet.eachRow((row, rowNumber) => {
            if (rowNumber === 1) return
            const getValue = (i: number) => row.getCell(i).value?.toString()
            const category = getValue(10)
            if (!category) return
            if (researchInfo.at(-1)?.category === category) {
                researchInfo.at(-1)?.addStudent(new Student(getValue(7) as string, getValue(14) as string))
            }
            else {
                researchInfo.push(new Research(getValue(12) as string, category, getValue(4) as string, [new Student(getValue(7) as string, getValue(14) as string)]))
            }
        })
        researchInfo.sort((a, b) => a.category > b.category ? 1 : -1)
    }
    catch (error) {
        console.error(error)
    }
})()

const checkValid = async (category: string, code: string) => {
    try {
        const workbook = new Workbook()
        const worksheet = await workbook.xlsx.readFile(resolve(__dirname, PATH))
        const sheet = worksheet.getWorksheet(1)
        const row = sheet.getRows(1, 500)?.find((row) => row.getCell(14).value?.toString() === code)
        if (row === undefined) {
            return {
                result: false,
                message: "Unknown idenfication code."
            }
        }
        if (row.getCell(15).value !== null && (code !== "ksa2040" && code !== "test")) {
            return {
                result: false,
                message: "You've already taken the survey."
            }
        }
        if (row.getCell(8).value !== category) {
            return {
                result: false,
                message: "Invalid category."
            }
        }
        return {
            result: true,
            message: row.getCell(4).value?.toString() as string
        }
    }
    catch (error) {
        console.error(error)
        return {
            result: false,
            message: "There was a problem communicating, please try again later."
        }
    }
}

const voteStudent = async (code: string, vote: { first: Research[], second: Research }) => {
    try {
        const workbook = new Workbook()
        const worksheet = await workbook.xlsx.readFile(resolve(__dirname, PATH))
        const sheet = worksheet.getWorksheet(1)
        const row = sheet.getRows(1, 500)?.find((row) => row.getCell(14).value?.toString() === code) as Row
        row.getCell(15).value = vote.first[0].category
        row.getCell(16).value = vote.first[1].category
        row.getCell(17).value = vote.second.category
        workbook.xlsx.writeFile(resolve(__dirname, PATH))
        return true
    }
    catch (error) {
        console.error(error)
        return false
    }
}

const voteTeacher = async (code: string, vote: Research[]) => {
    try {
        const workbook = new Workbook()
        const worksheet = await workbook.xlsx.readFile(resolve(__dirname, PATH))
        const sheet = worksheet.getWorksheet(1)
        const row = sheet.getRows(1, 500)?.find((row) => row.getCell(14).value?.toString() === code && row.getCell(15).value === null) as Row
        row.getCell(15).value = vote[0].category
        row.getCell(16).value = vote[1].category
        row.getCell(17).value = vote[2].category
        workbook.xlsx.writeFile(resolve(__dirname, PATH))
        return true
    }
    catch (error) {
        console.error(error)
        return false
    }
}

export { type Research, type Student, researchInfo, checkValid, voteStudent, voteTeacher }