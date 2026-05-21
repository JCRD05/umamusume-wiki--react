import { useState } from "react"
import Navbar from "./components/Navbar"
import Login from "./components/Login"
import MainPage from "./components/pages/Mainpage"
import TierlistPage from "./components/pages/TierlistPage"
import BannerPage from "./components/pages/BannerPage"
import TraineePage from "./components/pages/TraineePage"
import SupportPage from "./components/pages/SupportPage"
import SkillPage from "./components/pages/SkillPage"
import EventPage from "./components/pages/EventPage"
import './index.css' 

const App = () => {
    const [isAdmin, setIsAdmin] = useState(false)
    const [isLogged, setIsLogged] = useState(false)
    const [view, setView] = useState('')

    const renderView = () => {
        switch(view) {
            case '': return <MainPage></MainPage>
            case 'tierlist': return <TierlistPage></TierlistPage>
            case 'banners': return <BannerPage></BannerPage>
            case 'trainees': return <TraineePage isAdmin={isAdmin}></TraineePage>
            case 'supports': return <SupportPage isAdmin={isAdmin}></SupportPage>
            case 'skills': return <SkillPage></SkillPage>
            case 'events': return <EventPage></EventPage>
        }
    }

    return(
        <div className="app-shell">
            <Navbar eventHandler={setView}></Navbar>
            
            <main>
                {renderView()}
            </main>

            <footer className="main-footer">
                <p>© 2026 Uma-Wiki Project | Dedicated to Umamusume fans.</p>
            </footer>

            {
                !isLogged && (
                    <div className="login-overlay">
                        <Login adminEventHandler={setIsAdmin} loginEventHandler={setIsLogged}></Login>
                    </div>
                )
            }
        </div>
    )
}

export default App