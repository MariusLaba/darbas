import HeroSection from '../components/HeroSection'
import RegisterModal from '../components/RegisterModal'
import {useState} from 'react'
import LoginModal from '../components/LoginModal'

const MainPage = () => {
    const [showRegisterModal, setShowRegisterModal] = useState(false)
    const [showLoginModal, setShowLoginModal] = useState(false)

    return (
        <>
            <HeroSection
                setShowRegisterModal={setShowRegisterModal}
                setShowLoginModal={setShowLoginModal}
            />
            <RegisterModal
                showRegisterModal={showRegisterModal}
                setShowRegisterModal={setShowRegisterModal}
            />
            <LoginModal
                showLoginModal={showLoginModal}
                setShowLoginModal={setShowLoginModal}
            />
        </>
    )
}

export default MainPage