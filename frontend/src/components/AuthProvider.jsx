import { useState} from 'react';
import AuthContext from '../context/AuthContext';

export const AuthProvider = ({children}) => {
    const [accessToken, setAccessTokenState] = useState(localStorage.getItem('accessToken') || '')
    const [refreshToken, setRefreshTokenState] = useState(localStorage.getItem('refreshToken') || '')

    function setAccessToken(token) {
        setAccessTokenState(token)
        localStorage.setItem('accessToken', token)
    }

    function setRefreshToken(token) {
        setRefreshTokenState(token)
        localStorage.setItem('refreshToken', token)
    }

    function logout() {
        setAccessTokenState('')
        setRefreshTokenState('')
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
    }

    const value = {
        accessToken,
        refreshToken,
        setAccessToken,
        setRefreshToken,
        logout,
        isAuthenticated: !!accessToken,
    }

    return <AuthContext.Provider value ={value}>{children}</AuthContext.Provider>
}