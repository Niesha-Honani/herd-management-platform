import { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'
import { getHerds, createHerd } from '../api/herds'
import { getRanches } from '../api/ranches'

export const HerdsPage = () => {

    const { accessToken } = useContext(AuthContext)

    const [herds, setHerds] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const [ranches, setRanches] = useState([])
    const [formData, setFormData] = useState({
        ranch: '',
        name: '',
        description: '',
        reported_headcount: '',
        notes:'',
    })

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

        async function loadRanches(){
            try{
                const data = await getRanches(accessToken)
                setRanches(data)
            }
            catch (err){
                setError(err.message)
            }
        }

        if (accessToken){
            loadRanches()
        }
    }, [accessToken])

    if (loading) return <p>Loading herds...</p>
    if (error) return <p>{error}</p>

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

        try{
            const newHerd = await createHerd(formData, accessToken)
            setHerds((prev) => [...prev, newHerd])
            
            setFormData({
                ranch: '',
                name: '',
                description: '',
                reported_headcount: '',
                notes: '',
            })
        } catch(err){
            setError(err.message)
        }
    }

    return (
        <section>
            <h1> Herds </h1>
            <form onSubmit={handleSubmit}>
                <select name="ranch" value={formData.ranch} onChange={handleChange}>
                    <option value="">Select a ranch</option>
                {ranches.map((ranch) => (
                    <option key={ranch.id} value={ranch.id}>
                    {ranch.name}
                    </option>
                ))}
                </select>
                <input
                    type="text"
                    name="name"
                    placeholder='Herd name'
                    value={formData.name}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    />
                <input
                    type="number"
                    name="reported_headcount"
                    placeholder='Reported Headcount'
                    value={formData.reported_headcount}
                    onChange={handleChange}
                    />
                <input
                    type='text'
                    name='notes'
                    placeholder='Notes'
                    value={formData.notes}
                    onChange={handleChange} 
                />
                <button type="submit">Create Herd</button>
            </form>
            {error && <p>{error}</p>}
        
            {herds.length === 0 ? (
                <p>No herds found.</p>
            ) : (
                <ul>
                    {herds.map((herd) => (
                        <li key={herd.id}>
                            <strong>{herd.name}</strong>
                            {herd.description ? ` - ${herd.description}` : ''}
                        </li>
                    ))}
                </ul>
            )}
        </section>
    )

}

