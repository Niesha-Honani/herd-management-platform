import { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'
import { getRanches } from '../api/ranches'

export const RanchesPage = () => {

    const { accessToken } = useContext(AuthContext)

    const [ranches, setRanches]=useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        async function loadRanches(){
            try {
                const data = await getRanches(accessToken)
                setRanches(data)
                console.log(ranches)
            }catch(err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        if (accessToken) {
            loadRanches()
        }
    }, [accessToken])

    if (loading) return <p>Loading Ranches...</p>
    if (error) return <p>{error}</p>

    return (
        <section>
            <h1> Ranches </h1>
            {ranches.length === 0 ? (
                <p>No ranches found.</p>
            ) : (
                <ul>
                    {ranches.map((ranch) => (
                        <li key={ranch.id}>
                            <strong>
                                {ranch.name}
                            </strong>
                            {ranch.location_description ? ` - ${ranch.location_description}` : ''}
                        </li>
                    ))}
                </ul>
            )}
        </section>
    )
}