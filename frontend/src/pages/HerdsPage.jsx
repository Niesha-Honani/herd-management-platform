import { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'
import { getHerds } from '../api/herds'

function HerdsPage() {

    const { accessToken } = useContext(AuthContext)

    const [herds, setHerds] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        async function loadHerds(){
            try {
                const data = await getHerds(accessToken)
                setHerds(data)
            }catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        if (accessToken) {
            loadHerds()
        }
    }, [accessToken])

    if (loading) return <p>Loading herds...</p>
    if (error) return <p>{error}</p>

    return (
        <section>
            <h1> Herds </h1>
            {herds.length === 0 ? (
                <p>No herds found.</p>
            ) : (
                <ul>
                    {herds.map((herd) => (
                        <li key={herd.id}>
                            <strong>{herd.name}</strong>
                            {herd.description ? `- ${herd.description}` : ''}
                        </li>
                    ))}
                </ul>
            )}
        </section>
    )
}

export default HerdsPage