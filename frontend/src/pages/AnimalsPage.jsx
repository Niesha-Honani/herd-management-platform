import { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'
import { getAnimals, createAnimal } from '../api/animals'
import { getHerds } from '../api/herds'

export const AnimalPage = () => {
    // Constant variables
    const SEX_OPTIONS = ['female', 'male', 'unknown']

    const ANIMAL_CLASS_OPTIONS = ['cow', 'bull', 'heifer', 'steer', 'calf', 'unknown']

    const STATUS_OPTIONS = ['active', 'sold', 'deceased', 'transferred', 'missing']
    // Access the current user's access token from authentication context
    const { accessToken } = useContext(AuthContext)
    // hooks to manage States
    const [animals, setAnimals] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    //look up herds
    const [herds, setHerds] = useState([])
    const [herdId, setHerdId] = useState('')
    //set form state
    const [formData, setFormData] = 
    useState({
        herd: '',
        hcp_tag: '',
        owner_tag: '',
        tag_color: '',
        description: '',
        sex: '',
        animal_class: '',
        status: '',
        birth_year: '',
        brand: '',
        notes: '',
    })

    useEffect(() => {
        async function loadAnimals() {
            try {
                setLoading(true)
                setError('')
                const data = await getAnimals(accessToken, herdId)
                setAnimals(data)
            }catch (err){
                setError(err.message)
            }finally {
                setLoading(false)
            }
        }
        if (accessToken) {
            loadAnimals()
        }

    }, [accessToken, herdId])

    useEffect(() => {
        async function loadHerds(){
            try{
                const data = await getHerds(accessToken)
                setHerds(data)
            } catch (err){
                setError(err.message)
            }
        }

        if (accessToken){
            loadHerds()
        }
    },[accessToken])

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
            const newAnimal = await createAnimal(formData,accessToken)
            if (!herdId || String(newAnimal.herd) === String(herdId)) {
                setAnimals((prev) => [...prev, newAnimal])
            }
            
            setFormData({
                herd: '',
                hcp_tag: '',
                owner_tag: '',
                tag_color: '',
                description: '',
                sex: '',
                animal_class: '',
                status: '',
                birth_year: '',
                brand: '',
                notes: '',
            })
        } catch(err){
            setError(err.message)
        }
    }

    return (
        <section>
            <h1> Animals Page </h1>
            {error && <p>{error}</p>}

            <label htmlFor='animal-filter-herd'>Filter by herd</label>
            <select 
                id="animal-filter-herd"
                value={herdId}
                onChange={(e) => setHerdId(e.target.value)}
            >
                <option value="">All Herds</option>
                {herds.map((herd) => (
                    <option key={herd.id} value={herd.id}>
                        {herd.name}
                    </option>
                ))}
            </select>

            <form onSubmit={handleSubmit}>
                <select name="herd" value={formData.herd} onChange={handleChange}>
                    <option value="">Select a herd</option>
                {herds.map((herd) => (
                    <option key={herd.id} value={herd.id}>
                        {herd.name}
                    </option>
                ))}
                </select>
                <select name="sex"
                    value={formData.sex} onChange={handleChange}>
                       <option value="">Select sex
                        </option>
                    {SEX_OPTIONS.map((option) => (
                        <option key={option} value={option}>{option}</option>
                    ))} 
                    </select>
                <select
                    name="animal_class"
                    value={formData.animal_class}
                    onChange={handleChange}
                >
                    <option
                        value="">Select animal class
                    </option>
                    {ANIMAL_CLASS_OPTIONS.map((option) => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
                <select 
                    name="status"
                    value={formData.status}
                    onChange={handleChange}>
                    <option 
                        value="">Select status
                    </option>
                    {STATUS_OPTIONS.map((option) => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
                <input
                    type="text"
                    name="hcp_tag"
                    placeholder='HCP tag'
                    value={formData.hcp_tag}
                    onChange={handleChange}
                    />
                <input
                    type='text'
                    name='owner_tag'
                    placeholder='Owner tag'
                    value={formData.owner_tag}
                    onChange={handleChange} 
                />
                <input
                    type='text'
                    name='tag_color'
                    placeholder='Tag color'
                    value={formData.tag_color}
                    onChange={handleChange}
                />
                <input
                    type='text'
                    name='description'
                    placeholder='Description'
                    value={formData.description}
                    onChange={handleChange}
                />
                <input
                    type='number'
                    name='birth_year'
                    placeholder='YYYY'
                    value={formData.birth_year}
                    onChange={handleChange}
                />
                <input
                    type='text'
                    name='brand'
                    placeholder='Brand'
                    value={formData.brand}
                    onChange={handleChange}
                />
                <input
                    type='text'
                    name='notes'
                    placeholder='Notes'
                    value={formData.notes}
                    onChange={handleChange}
                />
                <button type="submit">Create Animal</button>
            </form>

            {loading ? (
                <p>Loading animals...</p>
            ) : animals.length === 0 ? (
                <p>No Animals found.</p>
            ) : (
                <div className="animal-list">
                        {animals.map((animal) => (
                            <div className="animal-card" key={animal.id}>
                                <h2>{animal.herd_detail.name}</h2>
                                <h3>{animal.hcp_tag ? ` ${animal.hcp_tag}` : null} | {animal.owner_tag ? ` ${animal.owner_tag}` : null}</h3>
                                {animal.sex ? <p>Sex: {animal.sex}</p> : null}
                                {animal.animal_class ? <p>Class: {animal.animal_class}</p> : null}
                                {animal.status ? <p>Status: {animal.status}</p> : null}
                                {animal.birth_year ? <p>Birth year: {animal.birth_year}</p> : null}
                                {animal.description ? <p>Description: {animal.description}</p> : null}
                        </div> 
                ))}
                </div>
            )}
        </section>
    )
}