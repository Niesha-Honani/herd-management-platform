import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    Paper, Alert, Stack
} from "@mui/material"

export const SignUpPage = () => {
    const navigate = useNavigate()
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [isRancher, setIsRancher] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    async function handleSubmit(event){
        event.preventDefault()
        setError('')
        setSuccess('')

        try{
            const response = await fetch("http://127.0.0.1:8000/api/users/register/",{
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                    password_confirm: passwordConfirm,
                    is_rancher: isRancher,
                }),
            })
            const data = await response.json()

            if(!response.ok){
                if (data.username){
                    setError(data.username[0])
                } else if (data.password){
                    setError(data.password[0])
                }else{
                    setError("Unable to create account.")
                }
                return
            }

            setSuccess("Account created successfully.")

            setUserName("")
            setPassword("")
            setPasswordConfirm("")
            setIsRancher(false)

            setTimeout(() => {
                navigate("/login")
            }, 1000)
        }catch(err){
            setError(err.message || "Something went wrong.")
        }
    }

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8 }}>
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Typography variant="h4" component="h1" color='#1976d2' gutterBottom>Join Bonanza</Typography>
                    {error && (
                    <Alert severity="error" sx={{ smb: 2 }}>{error}</Alert>
                )}
                    {success && (
                        <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>
                    )}
                    <Box component="form" onSubmit={handleSubmit}>
                        <TextField
                            label="Username"
                            fullWidth
                            margin="normal"
                            value={username}
                            onChange={(event) => setUserName(event.target.value)}
                        />

                        <TextField
                            label="Password"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)} 
                        />

                        <TextField
                            label="Confirm Password"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={passwordConfirm}
                            onChange={(event) => setPasswordConfirm(event.target.value)}
                        />

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={isRancher}
                                    onChange={(event) => setIsRancher(event.target.checked)}
                                /> 
                            }
                            label="Register as rancher"
                        />

                        <Stack spacing={1} sx={{ mt:2 }}>
                            <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{ mt: 2 }}
                            >Create Account</Button>
                            <Button
                                type="button"
                                variant="outline"
                                fullWidth
                                onClick={() => navigate("/login")}
                            >
                                Cancel
                            </Button>
                        </Stack>

                        
                    </Box>
                </Paper>
            </Box>
        </Container>
    ) 
}