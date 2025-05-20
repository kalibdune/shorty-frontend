import { useState, useRef } from "react"
import { UrlResponse } from "../../types/api"
import { BASE_URL } from "../../utils/constants"
import { validateUrl, validateDate } from "../../utils/validation"
import Button from "../Button/Button"
import './UrlCard.scss'

interface UrlCardProps {
    url: UrlResponse
}

const UrlCard: React.FC<UrlCardProps> = ({ url }: UrlCardProps) => {
    const [isEditing, setIsEditing] = useState(false)
    const [editedUrl, setEditedUrl] = useState(url.url)
    const [editedExpiredAt, setEditedExpiredAt] = useState(url.expired_at ? url.expired_at : "Безлимитно")

    const urlInputRef = useRef<HTMLInputElement>(null)
    const dateInputRef = useRef<HTMLInputElement>(null)

    const handleConfirmChanges = () => {
        const isValidUrl = validateUrl(editedUrl)
        const isValidDate = editedExpiredAt === "Безлимитно" || validateDate(editedExpiredAt)

        if (!isValidUrl) {
            urlInputRef.current?.classList.add("breathing-red")
            return
        } else if (!isValidDate) {
            dateInputRef.current?.classList.add("breathing-red")
            return
        }

        if (url.url !== editedUrl && url.expired_at !== editedExpiredAt) {
            console.log("has changes");
        }

        url.url = editedUrl
        url.expired_at = editedExpiredAt

        setIsEditing(false);
    }

    const handleCancelChanges = () => {
        setEditedUrl(url.url)
        setEditedExpiredAt(url.expired_at ? url.expired_at : "Безлимитно")
        setIsEditing(false)
    }

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (urlInputRef.current?.classList.contains("breathing-red")) {
            urlInputRef.current.classList.remove("breathing-red")
        }
        setEditedUrl(e.target.value)
    }

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (dateInputRef.current?.classList.contains("breathing-red")) {
            dateInputRef.current.classList.remove("breathing-red")
        }
        setEditedExpiredAt(e.target.value)
    }

    return (
        <>
            {isEditing && (
                <div
                    className="overlay"
                    onClick={handleCancelChanges}
                >
                </div>
            )}
            <div className={`card ${isEditing && "above"}`}>
                <div className="card-header styled-link">
                    <a
                        href={`${BASE_URL}/${url.hash}`}
                        className="styled-link"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {url.hash}
                    </a>
                    <div>
                        {isEditing ? (
                            <input
                                value={editedExpiredAt}
                                onChange={handleDateChange}
                                className="card-change"
                                ref={dateInputRef}
                            />
                        ) : (
                            editedExpiredAt ? editedExpiredAt : "Безлимитно"
                        )}
                    </div>
                </div>
                <div className="card-body">
                    <div className="card-field">
                        <div>Ссылка:</div>
                        {isEditing ? (
                            <input
                                value={editedUrl}
                                onChange={handleUrlChange}
                                className="card-change"
                                ref={urlInputRef}
                            />
                        ) : (
                            <a href={editedUrl} className="styled-link card-field-small">
                                {editedUrl.length > 25 ? `${editedUrl.substring(0, 25)}...` : editedUrl}
                            </a>
                        )}
                    </div>
                    <div className="card-field">
                        <div>Время создания:</div>
                        <div>{url.created_at}</div>
                    </div>
                    <div className="card-field">
                        {isEditing ? (
                            <>
                                <Button onClick={handleConfirmChanges} className="card-button">
                                    <div>Подтвердить изменения</div>
                                </Button>
                            </>
                        ) : (
                            <Button onClick={() => setIsEditing(true)} className="card-button">
                                <div>Изменить</div>
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default UrlCard