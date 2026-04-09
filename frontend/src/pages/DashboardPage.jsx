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

   return(
     <Container>
        <h1>Dashboard</h1>
    {/* Data Cards */}
    {loading && <p>Loading....</p>}
    {error && <p>{error}</p>} 
        <Box>
                <Grid>
                    <Card><Typography>Ranches</Typography>
                        <CardContent>{ranches.length}
                        </CardContent>
                    </Card>
                    <Card>
                        <Typography>Herds</Typography>
                        <CardContent >{herds.length}</CardContent>
                    </Card>
                     <Card>
                        <Typography>Animals</Typography>
                        <CardContent >{animals.length}</CardContent>
                    </Card>
                </Grid>
        </Box>
     </Container>
     
   ) 
}