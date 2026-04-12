import { LockOutlined } from "@mui/icons-material"
import {
    Container,
    Box,
    Paper,
    Alert,
    Avatar,
    Typography,
    TextField,
    Button,
    Stack
} from "@mui/material"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export const LoginPage = () => {
    const navigate=useNavigate()

    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")

    const  [error, setError] = useState("")
    const [success, setSuccess]=useState("")

    async function handleLogin(event){
        event.preventDefault()
        setError("")
        setSuccess("")

        try {
            const response = await fetch("http://127.0.0.1:8000/api/token/", {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
               },
               body: JSON.stringify({
                    username,
                    password,
               }) 
            })

            const data= await response.json()

            if(!response.ok){
                if(data.detail) {
                    setError(data.detail)
                } else{
                    setError("Login failed.")
                }
                return
            }

            //clear localStorage of old tokens 
            localStorage.removeItem("accessToken")
            localStorage.removeItem("refreshToken")

            localStorage.setItem("accessToken", data.access)
            localStorage.setItem("refreshToken", data.refresh)

            setSuccess("Login successful")

            setTimeout(() => {
                navigate("/dashboard")
            }, 800)
        }catch(err) {
            setError(err.message || "Something went wrong during login.")
        }
    }

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8 }}>
                <Paper elevation={3}
                    sx={{ p:4 }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            mb: 2,
                        }}
                    >
                        <Avatar
                            sx={{ mb: 1}}
                        >
                            <LockOutlined />
                        </Avatar>
                         <Typography
                            variant="h4"
                            component="h1"
                            gutterBottom
                            color="#1976d2"
                        >Bonanza</Typography>
                    </Box>
                   
                    {error && (
                        <Alert
                            severity="error" sx={{ mb: 2 }}>{error}</Alert>
                    )}
                    {success && (
                        <Alert
                            severity="success"
                            sx={{ mb: 2 }}
                        >{success}</Alert>
                    )}

                    <Box
                        component="form"
                        onSubmit={handleLogin}
                    >
                        <TextField
                            label="Username"
                            fullWidth
                            margin="normal"
                            value={username}
                            onChange={(event)=>setUserName(event.target.value)}
                        />

                        <TextField
                            label="Password"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={(event) => setPassword(event.target.value) } 
                        />

                        <Stack
                            spacing={1} sx={{ mt: 2 }}
                        >
                            <Button type="submit" variant="contained" fullWidth>
                                Login
                            </Button>

                            <Button
                                component={Link}
                                to="/signup"
                                variant="text"
                                fullWidth
                            >
                                Need an account? Sign Up
                            </Button>
                        </Stack>
                    </Box>
                </Paper>
            </Box>
        </Container>
    )
}