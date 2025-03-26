import { createRoot } from "react-dom/client"
import { StrictMode } from "react"
import Main from "./pages/Main/Main"
import Nav from "./common/Nav"
import Background from "./common/Background"

const domNode = document.getElementById('root') as HTMLDivElement
const root = createRoot(domNode)
root.render(
    <StrictMode>
        <Nav></Nav>
        <Background></Background>
        <Main></Main>
    </StrictMode>
)