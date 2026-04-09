import * as React from 'react'
//import { useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'
import { getAnimals, createAnimal } from '../api/animals'
import { getHerds } from '../api/herds'

//MUI
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import Paper from '@mui/material/Paper'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

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

    const isFormValid=
        formData.hcp_tag !== '' && formData.owner_tag !== '';

    return (
        <section>
            <h1> Animals Page </h1>
            {error && <p>{error}</p>}
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: 'flex', flexDirection: 'column', gap:2, maxWidth: 500, mt: 2 }}
            >
                {/* Herd select */}
                <FormControl fullWidth>
                    <InputLabel>Herd</InputLabel>
                    <Select
                        name="herd"
                        value={FormData.herd}
                        label="Herd"
                        onChange={handleChange}
                    >
                        <MenuItem value="">Select a herd</MenuItem>
                        {herds.map((herd) =>(
                            <MenuItem key={herd.id} value={herd.id}>{herd.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* TextField: HCP Tag, Owner Tag */}
                <TextField fullWidth label="HCP Tag" name="hcp_tag" value={FormData.hcp_tag} onChange={handleChange} />
                <TextField fullWidth label="Owner Tag" name="owner_tag" value={FormData.owner_tag} onChange={handleChange} />
                <TextField fullWidth label="Tag Color" name="tag_color" value={FormData.tag_color} onChange={handleChange} />
                <TextField fullWidth label="Brand" name="brand" value={FormData.brand} onChange={handleChange} />
                <TextField fullWidth label="Description" name="description" value={FormData.description} onChange={handleChange} />
                <TextField fullWidth label="Birth Year" name='birth_year' type='number' value={FormData.birth_year} onChange={handleChange} />
                
                {/* Sex selection */} 
                <FormControl fullWidth>
                    <InputLabel>Sex</InputLabel>
                    <Select
                        name="sex"
                        value={formData.sex}
                        label="Sex"
                        onChange={handleChange}
                    >
                        <MenuItem value="">Select sex</MenuItem>
                        {SEX_OPTIONS.map((option) => (
                            <MenuItem key={option} value={option}>{option}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Animal class select */}
                <FormControl>
                    <InputLabel>Animal Class</InputLabel>
                    <Select
                        name="animal_class"
                        value={FormData.animal_class}
                        label="Animal Class"
                        onChange={handleChange}
                    >
                        <MenuItem value="">Select animal class</MenuItem>
                        {ANIMAL_CLASS_OPTIONS.map((option) => (
                           <MenuItem key={option} value={option}>{option}</MenuItem> 
                        ))}
                    </Select>
                </FormControl>

                {/* Status select */}
                <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                        name="status"
                        value={FormData.status}
                        label="Status"
                        onChange={handleChange}
                    >
                        <MenuItem value="">Select status</MenuItem>
                        {STATUS_OPTIONS.map((option) => (
                           <MenuItem key={option} value={option}>{option}</MenuItem> 
                        ))}
                    </Select>
                </FormControl>
                <TextField fullWidth label="Notes" name='notes' multiline rows={3} value={FormData.notes} onChange={handleChange} />
                <Button
                    type="submit"
                    variant='contained'
                    disabled={!isFormValid}
                >
                    Create Animal
                </Button>
            </Box>
                
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