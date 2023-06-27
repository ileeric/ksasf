import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Status } from "./Status"
import { Header } from "./Header"
import { FormResult } from "./FormResult"
import { FormHome } from "./FormHome"
import { FormRegister } from "./FormRegister"
import { FormTeacher } from "./FormTeacher"
import { FormStudent } from "./FormStudent"

import "./App.css"
import { Home } from "./Home"
import { Upload } from "./Upload"
import { StatusHome } from "./StatusHome"

window.addEventListener("resize", () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
});

const vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);

const App = () =>
    <>
        <Header />
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/form" element={<FormHome />} />
                <Route path="/form/student" element={<FormRegister />} />
                <Route path="/form/teacher" element={<FormRegister />} />
                <Route path="/form/student/survey" element={<FormStudent />} />
                <Route path="/form/teacher/survey" element={<FormTeacher />} />
                <Route path="/form/result" element={<FormResult />} />
                <Route path="/admin" element={<StatusHome />} />
                <Route path="/admin/status" element={<Status />} />
                <Route path="/upload" element={<Upload />} />
            </Routes>
        </BrowserRouter>
    </>

export default App