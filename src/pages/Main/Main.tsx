import React, { useState, useRef } from "react"
import Input from "./Input"
import "./Main.scss"

const Main: React.FC = () => {
    const [url, setUrl] = useState("Shorty")
    const titleRef = useRef<HTMLInputElement>(null)

    const setTitleUrl = (resUrl: string): void => {
        titleRef.current?.classList.add("title-url")
        setUrl(resUrl)
        navigator.clipboard.writeText(resUrl)
    }

    return (
        <div className="container">
            <header>
                <p
                    ref={titleRef}
                    className="title"
                >
                    {url}
                </p>
            </header>
            <Input
                url={url}
                setTitle={setTitleUrl}
            >
            </Input>
        </div>
    );
};

export default Main;
