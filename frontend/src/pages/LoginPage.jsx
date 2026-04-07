import { useState, useContext } from "react"
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { loginUser } from '../api/auth'

export const LoginPage = () => {
    const navigate = useNavigate()
    const { setAccessToken, setRefreshToken } = useContext(AuthContext)

    const [ formData, setFormData ] = useState({
        username: '',
        password: '',
    })

    const [error, setError] = useState('')

    function handleChange(event){
        const { name, value } = event.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    async function handleSubmit(event){
        event.preventDefault()
        setError('')

        try {
            const data = await loginUser(formData)
            setAccessToken(data.access)
            setRefreshToken(data.refresh)
            navigate('/dashboard')
        } catch(err){
            setError(err.message)
        }
    }

    return (
        <section>
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit">Log In</button>
            </form>

            {error && <p>{error}</p>}
        </section>
    )
}
