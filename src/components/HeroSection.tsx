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
        <div className="container flex flex-wrap items-center justify-center mx-auto bg-gray-900 text-white md:px12 md:flex-row">
            <div className="lg:w-1/2">
                <img
                    className="ml-auto"
                    src="https://images.squarespace-cdn.com/content/v1/64b01b7f5312692724db8739/a2c54d31-22bd-492c-8c50-726a20448ff7/ChiAlpha_Icon_White.png"
                    alt=""
                />
            </div>
            <div className="mb-14 lg:mb-0 lg:w-1/2 ">
                <h1 className="max-w-xl text-[2.9rem] leading-none text-white font-bold text-center lg:text-5xl lg:text-left lg:leading-tight mb-5">
                    Welcome to ConnectHub - Your Ultimate Social Connection
                </h1>
                <p className="max-w-xl text-center text-white lg:text-left lg:max-w-md">
                    Are you tired of social media platforms that leave you feeling
                    disconnected, overwhelmed, or uninspired? It's time to switch to
                    ConnectHub, the social media app designed to bring you closer to the
                    people and things that matter most in your life.
                </p>
                <div className="flex justify-center mt-14 lg:justify-start gap-1">
                    <button
                        className="text-white bg-gray-800 font-medium rounded-lg px-5 py-4 text-center hover:bg-gray-700 hover:drop-shadow-md transition duration-300 ease-in-out"
                        onClick={() => setShowLoginModal(true)}
                    >
                        LOGIN
                    </button>
                    <button
                        className="text-gray-900 bg-gray-400 font-medium rounded-lg px-5 py-4 text-center hover:bg-gray-300 hover:drop-shadow-md transition duration-300 ease-in-out"
                        onClick={() => setShowRegisterModal(true)}
                    >
                        REGISTER
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection