import React from 'react'

type THeroSection = {
    setShowRegisterModal: React.Dispatch<React.SetStateAction<boolean>>
    setShowLoginModal: React.Dispatch<React.SetStateAction<boolean>>
}

const HeroSection = ({
                         setShowRegisterModal,
                         setShowLoginModal,
                     }: THeroSection) => {
    return (
        <div
            className="container d-flex p100 jc-center  text-white">


            <button
                className="colorBlack  p20"
                onClick={() => setShowLoginModal(true)}
            >
                LOGIN
            </button>
            <button
                className=" textBlack regBtn  p20"
                onClick={() => setShowRegisterModal(true)}
            >
                REGISTER
            </button>


        </div>
    )
}

export default HeroSection