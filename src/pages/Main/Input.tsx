import React from "react"
import "./Main.scss"

const Main: React.FC = () => {
    return (
        <div className="container">
            <div className="input-container">
                <input type="text" className="input-box" placeholder="https://example.com" />
                <button className="button">Сократить</button>
            </div>
            <div className="options">
                <button className="option-button" data-value="24h">24ч</button>
                <button className="option-button" data-value="7d">7 дней</button>
                <button className="option-button" data-value="unlimited" data-selected="true">Безгранично</button>
                <button className="option-button" data-value="custom">свое время</button>
            </div>
        </div>
    );
};

export default Main;
