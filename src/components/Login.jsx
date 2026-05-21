import { useState } from "react"

const Login = ({ adminEventHandler, loginEventHandler }) => {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')

    const login = (event) => {
        event.preventDefault()

        if (user === 'Admin' && password === 'Admin') {
            adminEventHandler(true)
            loginEventHandler(true)
        } else if (user !== '' && password !== '') {
            loginEventHandler(true)
        }
    }

    return (
        <div className="login-wrap">
            <div className="login-card">
                <div className="login-header">
                    <span className="login-badge">Uma Wiki</span>
                    <h2>Member Login</h2>
                    <p>Enter your credentials to continue to the wiki.</p>
                </div>

                <form onSubmit={login} className="login-form">
                    <input
                        className="login-input"
                        type="text"
                        placeholder="Username"
                        onChange={event => setUser(event.target.value)} />

                    <input
                        className="login-input"
                        type="password"
                        placeholder="Password"
                        onChange={event => setPassword(event.target.value)} />

                    <button
                        className="login-button"
                        type="submit">Enter</button>
                </form>
            </div>
        </div>
    )
}

export default Login
