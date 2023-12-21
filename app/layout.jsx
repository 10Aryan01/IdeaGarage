import '@styles/globals.css'
import React from 'react'
import Navbar from '@components/navbar'
import Provider from '@components/Provider'
import img from "../assets/images/logo.svg"
export const metadata = {
    title: "IdeaGarage",
    description: "Where Ideas Take Flight and Innovations Find Home.",
    icons:{
        icon:["/favicon.ico?v=4"],
        apple:["/logo.png?v=4"],
        shortcut:["/logo.png"]
        
    }
}
function Rootlayout({ children }) {
    return (
        <html lang='en'>
            <body>
                <Provider>
                    <div className="main">
                        <div className="gradient" />
                    </div>
                    <main className='app'>
                        <Navbar />
                        {children}
                    </main>
                </Provider>
            </body>
        </html>
    )
}

export default Rootlayout