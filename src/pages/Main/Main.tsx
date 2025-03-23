import React from "react"
import Input from "./Input"
import "./Main.scss"

const Main: React.FC = () => {
    return (
        <div className="container">
            <div className="title">Shorty</div>
            <Input></Input>
        </div>
    );
};

export default Main;
