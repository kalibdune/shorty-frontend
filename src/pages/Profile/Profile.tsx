import React, { useEffect, useState } from 'react'
import Nav from '../../components/Nav/Nav'
import { ApiService } from '../../utils/api'
import StorageService from '../../utils/storage'
import { UserResponse } from '../../types/api'
import Button from '../../components/Button/Button'
import { useNavigate } from 'react-router-dom'
import './Profile.scss'

const Profile: React.FC = () => {
    const [userData, setUserData] = useState<UserResponse | null>(null)
    const [isRevoking, setIsRevoking] = useState(false)
    const storage = new StorageService()
    const api = new ApiService()
    const navigate = useNavigate()

    useEffect(() => {
        const user = storage.getItem<UserResponse>('user')
        if (!user) {
            navigate('/auth')
            return
        }
        setUserData(user)
    }, [])

    const formatDate = (dateString: string): string => {
        return new Date(dateString).toLocaleString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const handleRevokeTokens = async () => {
        try {
            setIsRevoking(true)
            await api.revokeTokens()
            storage.removeItem('user')
            storage.setItem('isLogged', false)
            navigate('/')
        } catch (error) {
            console.error('Ошибка при отзыве токенов:', error)
            setIsRevoking(false)
        }
    }

    const handleLogout = async () => {
        try {
            await api.logout()
            storage.removeItem('user')
            storage.setItem('isLogged', false)
            navigate('/auth')
        } catch (error) {
            console.error('Ошибка при выходе:', error)
        }
    }

    return (
        <>
            <Nav></Nav>
            <div className="container">
                <div className="profile-card">
                    <h2 className="profile-title">Профиль пользователя</h2>
                    {userData ? (
                        <div className="profile-info">
                            <div className="profile-field">
                                <span className="field-label">Имя:</span>
                                <span className="field-value">{userData.name}</span>
                            </div>
                            <div className="profile-field">
                                <span className="field-label">Email:</span>
                                <span className="field-value">{userData.email}</span>
                            </div>
                            <div className="profile-field">
                                <span className="field-label">ID пользователя:</span>
                                <span className="field-value">{userData.id}</span>
                            </div>
                            <div className="profile-field">
                                <span className="field-label">Дата регистрации:</span>
                                <span className="field-value">{formatDate(userData.created_at)}</span>
                            </div>
                            <div className="profile-field">
                                <span className="field-label">Последнее обновление:</span>
                                <span className="field-value">{formatDate(userData.updated_at)}</span>
                            </div>
                        </div>
                    ) : (
                        <p>Загрузка данных пользователя...</p>
                    )}

                    <div className="profile-actions">
                        <Button
                            onClick={handleRevokeTokens}
                            disabled={isRevoking}
                            className="revoke-button"
                        >
                            {isRevoking ? 'Выполняется...' : 'Выйти со всех устройств'}
                        </Button>
                        <Button
                            onClick={handleLogout}
                            className="logout-button"
                        >
                            Выйти из аккаунта
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile