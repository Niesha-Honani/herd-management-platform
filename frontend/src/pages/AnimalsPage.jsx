import * as React from 'react'
//import { useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'
import { getAnimals, createAnimal } from '../api/animals'
import { getHerds } from '../api/herds'

//MUI
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Toolbar from '@mui/material/Toolbar'
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import PageContainer from '../components/PageContainer'
import FormGroup from '@mui/material/FormGroup'
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'

export const AnimalPage = () => {
    //viewMode create and list 
    const [viewMode, setViewMode]=useState('list')
    const [selectedAnimal, setSelectedAnimal]=useState(null)
     
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
    const [formData, setformData] = 
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
                {error && <Alert severity="error">{error}</Alert>}
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
        setformData((prev) => ({
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
            
            setformData({
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
            setSelectedAnimal(null)
            setViewMode('list') 
        } catch(err){
            setError(err.message)
        }
    }
    
    function resetForm(){
        setError('')
        setformData({
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
            setSelectedAnimal(null)
    }

    const inputStyle = {backgroundColor: 'black', borderRadius: 1 ,
                        input: { color: 'white'},
                        '& .MuiInputLabel-root': { color: 'grey.400'},
                        '& .MuiInputLabel-root.Mui-focused': { color: '#1976d2' },
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: '#1976d2',
                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#1976d2' }
                        },
    }

    const isFormValid=
        formData.hcp_tag !== '' && formData.owner_tag !== '';

    if (viewMode === 'create'){
        return(
            <PageContainer title="Animal" breadcrumbs={[{title: 'New'}]}>
            
            <Box
                component="form"
                onSubmit={handleSubmit}
                autoComplete='off'
                sx={{ width:'100%', mt:2 }}>
                    <FormGroup>
                        <Grid container spacing={2} sx={{mb:2, width:'100%'}}>
                            <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
                                <TextField
                                    value={formData.hcp_tag}
                                    onChange={handleChange}
                                    name="hcp_tag"
                                    label="HCP Tag"
                                    fullWidth
                                    sx={{
                                        backgroundColor: 'black', borderRadius: 1 ,
                                        input: { color: 'white'},
                                        '& .MuiInputLabel-root': { color: 'grey.400'},
                                        '& .MuiInputLabel-root.Mui-focused': { color: '#1976d2' },
                                        '& .MuiOutlinedInput-notchedOutline': { borderColor: '#1976d2',
                                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#1976d2' }
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
                                <TextField
                                    value={formData.owner_tag}
                                    onChange={handleChange}
                                    name="owner_tag"
                                    label="Owner Tag"
                                    fullWidth
                                    sx={{
                                        backgroundColor: 'black', borderRadius: 1 ,
                                        input: { color: 'white'},
                                        '& .MuiInputLabel-root': { color: 'grey.400'},
                                        '& .MuiInputLabel-root.Mui-focused': { color: '#1976d2' },
                                        '& .MuiOutlinedInput-notchedOutline': { borderColor: '#1976d2',
                                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#1976d2' }
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
                                <TextField
                                    value={formData.description}
                                    onChange={handleChange}
                                    name="description"
                                    label="Description"
                                    fullWidth
                                   sx={{
                                        backgroundColor: 'black', borderRadius: 1 ,
                                        input: { color: 'white'},
                                        '& .MuiInputLabel-root': { color: 'grey.400'},
                                        '& .MuiInputLabel-root.Mui-focused': { color: '#1976d2' },
                                        '& .MuiOutlinedInput-notchedOutline': { borderColor: '#1976d2',
                                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#1976d2' }
                                        },
                                    }}
                                />
                            </Grid> 
                            <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
                                <TextField
                                    type="number" 
                                    value={formData.birth_year}
                                    onChange={handleChange}
                                    name="birth_year"
                                    label="Birth Year"
                                    fullWidth
                                    sx={{
                                        backgroundColor: 'black', borderRadius: 1 ,
                                        input: { color: 'white'},
                                        '& .MuiInputLabel-root': { color: 'grey.400'},
                                        '& .MuiInputLabel-root.Mui-focused': { color: '#1976d2' },
                                        '& .MuiOutlinedInput-notchedOutline': { borderColor: '#1976d2',
                                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#1976d2' }
                                        },
                                    }}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
                                
                                <FormControl variant="outlined" fullWidth sx={inputStyle} >
                                    <InputLabel>Herd</InputLabel> 
                                    <Select
                                        value={formData.herd}
                                        name="herd"
                                        label="Herd"
                                        onChange={handleChange}
                                        displayEmpty
                                        
                                    >
                                        <MenuItem value="" disabled>Select Herd</MenuItem>
                                        {herds.map((herd) =>(
                                        <MenuItem key={herd.id} value={herd.id}>{herd.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
                                <FormControl variant="outlined" fullWidth sx={inputStyle} >
                                    <InputLabel >Sex</InputLabel>
                                    <Select
                                        value={formData.sex}
                                        name='sex'
                                        label='Sex'
                                        onChange={handleChange}
                                        displayEmpty
                                    >
                                        <MenuItem value="" disabled>Select Gender</MenuItem>
                                        {SEX_OPTIONS.map((option)=> (
                                            <MenuItem
                                                key={option}
                                                value={option}
                                            >{option}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
                                <FormControl variant="outlined" fullWidth sx={inputStyle} >
                                   <InputLabel>Class</InputLabel> 
                                    <Select
                                        value={formData.animal_class}
                                        name="animal_class"
                                        label="Class"
                                        onChange={handleChange}
                                        displayEmpty
                                    >
                                        <MenuItem value="" disabled>Select Type</MenuItem>
                                        {ANIMAL_CLASS_OPTIONS.map((option) =>(
                                           <MenuItem
                                            key={option}
                                            value={option}
                                           >{option}</MenuItem> 
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
                                <FormControl variant="outlined" fullWidth sx={inputStyle} >
                                    <InputLabel>Status</InputLabel>
                                    <Select
                                        value={formData.status}
                                        name="status"
                                        label="Status"
                                        onChange={handleChange}
                                        displayEmpty
                                    >
                                        <MenuItem value="" disabled>Select Status</MenuItem>
                                        {STATUS_OPTIONS.map((option) => (
                                           <MenuItem
                                            key={option}
                                            value={option}
                                           >
                                            {option}
                                           </MenuItem> 
                                        ))}
                                    </Select>
                                </FormControl> 
                            </Grid>
                             <TextField
                                    value={formData.notes}
                                    onChange={handleChange}
                                    name="notes"
                                    label="Notes"
                                    multiline
                                    fullWidth
                                    placeholder='Enter notes here'
                                    sx={{ 
                                    backgroundColor: 'black', borderRadius: 1 ,
                                    input: { color: 'white'},
                                    '& .MuiInputLabel-root': { color: 'grey.400'},
                                    '& .MuiInputLabel-root.Mui-focused': { color: '#1976d2' },
                                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#1976d2',
                                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#1976d2' }
                                    },
                                    }}
                                />
                        </Grid>
                        <Grid>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                                <Button type="button" variant="contained" onClick={() => {
                                    setSelectedAnimal(null)
                                    setViewMode('list')}}>Back</Button>
                                 <Button type="button"  variant='contained' onClick={resetForm}>Reset</Button>
                                 <Button type="submit" variant={isFormValid ? 'contained' : 'outlined'} disabled={!isFormValid}>Create</Button>
                            </Box>
                        </Grid>
                    </FormGroup>
            </Box>
            </PageContainer>
        )
    }

    if (viewMode === 'details' && selectedAnimal){
        return(
            <Container>
               <Typography variant='h4'>Animal Details</Typography> 
                <Card>
                    <CardContent>
                        <Typography>HCP Tag: {selectedAnimal.hcp_tag || '-'}</Typography>
                        <Typography>Owner Tag: {selectedAnimal.owner_tag || '-'}</Typography>
                        <Typography>Herd Details: {selectedAnimal.herd_detail?.name || '-'}</Typography>
                        <Typography>Sex: {selectedAnimal.sex || '-'}</Typography>
                        <Typography>Animal Class: {selectedAnimal.animal_class || '-'}</Typography>
                        <Typography>Status: {selectedAnimal.status || '-'}</Typography>
                        <Typography>Birth Year: {selectedAnimal.birth_year || '-'}</Typography>
                        <Typography>Description: {selectedAnimal.description || '-'}</Typography>
                    </CardContent>
                </Card>
                 <Box>
                    <Button  variant="contained" onClick={() =>{ 
                        setSelectedAnimal(null)
                        setViewMode('list')}}
                        >Back</Button>
                </Box>
            </Container>
        )
    }
     if (loading) return <p>Loading....</p>

    return (
        <Container>
            <Box>
                <Card>
                    <CardContent>
                        <Box>
                        <FormControl sx={{ minWidth: 200 }}>
                            <InputLabel>Filter by Herd</InputLabel>
                            <Select
                                value={herdId}
                                label="Filter by Herd"
                                onChange={(e) => setHerdId(e.target.value)}>
                                <MenuItem value="">All</MenuItem>
                                {herds.map((herd) =>(
                                    <MenuItem key={herd.id} value={herd.id}>{herd.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        </Box> 
                    </CardContent>
                </Card>
                <Card>
                    <CardContent> 
                        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between'  }}>
                            <Typography variant="h6">Animal Records</Typography>
                            <Button variant="contained" onClick={() => setViewMode('create')}>Create</Button>
                        </Toolbar>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>HCP Tag</TableCell>
                                        <TableCell>Owner Tag</TableCell>
                                        <TableCell>Herd</TableCell>
                                        <TableCell>Sex</TableCell>
                                        <TableCell>Class</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Birth Year</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {animals.length===0 ?(
                                        <TableRow>
                                        <TableCell colSpan={8}>No Records Available</TableCell>
                                        </TableRow>
                                    ): (
                                    animals.map((animal) =>(
                                       <TableRow key={animal.id}>
                                        <TableCell>{animal.hcp_tag || '-'}</TableCell>
                                        <TableCell>{animal.owner_tag || '-'}</TableCell>
                                        <TableCell>{animal.herd_detail?.name || '-'}</TableCell>
                                        <TableCell>{animal.sex || '-'}</TableCell>
                                        <TableCell>{animal.animal_class || '-'}</TableCell>
                                        <TableCell>{animal.status || '-'}</TableCell>
                                        <TableCell>{animal.birth_year || '-'}</TableCell>
                                        <TableCell>
                                          <IconButton onClick={() => {
                                            setSelectedAnimal(animal)
                                            setViewMode('details')
                                          }}><VisibilityIcon /></IconButton>
                                          <IconButton onClick={() => {
                                            setSelectedAnimal(animal)
                                            setViewMode('create')  
                                          }}><ModeEditIcon /></IconButton> 
                                        </TableCell>
                                       </TableRow> 
                                    ))
                                )}
                                </TableBody> 
                            </Table>
                        </TableContainer>
                        
                    </CardContent>
                </Card>
            </Box>
        </Container>

        
        
    )
        
}