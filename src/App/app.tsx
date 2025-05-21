import Main from '../pages/Main/Main'
import { Auth } from '../pages/Auth/Auth'
import Background from '../components/Background/Background'
import { Routes, Route } from 'react-router-dom'
import '../index.scss'
import Urls from '../pages/Urls/Urls'
import Profile from '../pages/Profile/Profile'

const App: React.FC = () => {
    return (
        <>
            <Background></Background>
            <Routes>
                <Route path='/' element={<Main />} />
                <Route path='/auth' element={<Auth />} />
                <Route path='/urls' element={<Urls />} />
                <Route path='/profile' element={<Profile />} />
            </Routes>
        </>
    )
}

export default App
