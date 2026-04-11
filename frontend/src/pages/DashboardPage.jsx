import {useContext, useEffect, useState} from 'react';
import AuthContext from '../context/AuthContext';
import { getAnimals } from '../api/animals'
import { getHerds } from '../api/herds';
import { getRanches } from '../api/ranches';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Toolbar from '@mui/material/Toolbar';

export const DashboardPage = () => {
    const { accessToken } = useContext(AuthContext)
    /* States */
    const [ranches, setRanches]= useState([])
    const [herds, setHerds] = useState([])
    const [animals, setAnimals] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(()=>{
        async function loadDashboardData(){
            try{
               setLoading(true)
               setError('')
                const animals = await getAnimals(accessToken)
                setAnimals(animals)

                const herds = await getHerds(accessToken)
                setHerds(herds)

                const ranches = await getRanches(accessToken)
                setRanches(ranches)
               }catch(err){
                setError(err.message)
            }finally {
                setLoading(false)
            }
        }
        if (accessToken) {
            loadDashboardData()
        }
    }, [accessToken])

    if (loading) return <p>Loading....</p>
    if (error) return <p>{error}</p>

    return(
        <Container>
            <Typography variant="h4">Dashboard</Typography>
            {/* Data Cards */}
            <Box>
                <Grid container spacing={12}>
                    <Grid size={{xs:12, md:4}}>
                        <Card>
                            <CardContent>
                                <Typography variant="overline">Ranches</Typography>
                                <Typography variant="h2" color='gray'>{ranches.length}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid size={{xs:12, md:4}}>
                        <Card>
                            <CardContent >
                                <Typography variant="overline">Herds</Typography>
                                <Typography variant="h2" color='gray'>{herds.length}</Typography>
                            </CardContent>
                    </Card>
                    </Grid>
                    <Grid size={{xs:12, md:4}}>
                        <Card>
                            <CardContent >
                                <Typography variant="overline">Animals</Typography>
                                <Typography variant="h2" color='gray'>{animals.length}</Typography>
                            </CardContent>
                    </Card>
                    </Grid>
                </Grid>
                <Box></Box>
                <Box size={{ mt:3 }}>
                    <Card>
                        <CardContent>
                            <Typography variant='h5'>Recent Treatment Events</Typography>
                            <Typography>Coming soon</Typography>
                        </CardContent>
                    </Card>
                </Box>
            </Box>
        </Container>
   ) 
}