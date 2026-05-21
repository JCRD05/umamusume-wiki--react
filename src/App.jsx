import { useState } from "react"
import Navbar from "./components/Navbar"
import MainPage from "./components/pages/Mainpage"
import TierlistPage from "./components/pages/TierlistPage"
import BannerPage from "./components/pages/BannerPage"
import TraineePage from "./components/pages/TraineePage"
import SupportPage from "./components/pages/SupportPage"
import SkillPage from "./components/pages/SkillPage"
import EventPage from "./components/pages/EventPage"
import './index.css' 

const Login = ({adminEventHandler, loginEventHandler}) => {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')

    const login = (event) => {
        event.preventDefault()

        if(user === 'Admin' && password === 'Admin') {
            adminEventHandler(true)
            loginEventHandler(true)
        } else if (user !== '' && password !== '') {
            loginEventHandler(true)
        }
    }

    return(
        <form onSubmit={login}>
            <input
                className="login-input" 
                type="text" 
                placeholder="Username"
                onChange={event => setUser(event.target.value)}/>

            <input 
                className="login-input"
                type="password" 
                placeholder="Password"
                onChange={event => setPassword(event.target.value)}/>

            <button
                className="login-button" 
                type="submit">Enter</button>
        </form>
    )
}

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
            case 'skills': return <SkillPage isAdmin={isAdmin}></SkillPage>
            case 'events': return <EventPage></EventPage>
        }
    }

    return(
        <div>
            {
                isLogged
                ? null
                : <Login adminEventHandler={setIsAdmin} loginEventHandler={setIsLogged}></Login>
            }
            <Navbar eventHandler={setView}></Navbar>
            
            <main>
                {renderView()}
            </main>

            <footer className="main-footer">
                <p>© 2026 Uma-Wiki Project | Dedicated to Umamusume fans.</p>
            </footer>
        </div>
    )
}

export default App