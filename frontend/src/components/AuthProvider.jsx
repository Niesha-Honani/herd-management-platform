import { useState} from 'react';
import AuthContext from '../context/AuthContext';

export const AuthProvider = ({children}) => {
    const [accessToken, setAccessToken] = useState('')
    const [refreshToken, setRefreshToken] = useState('')

    const value = {
        accessToken,
        refreshToken,
        setAccessToken,
        setRefreshToken,
        isAuthenticated: !!accessToken,
    }

    return <AuthContext.Provider value ={value}>{children}</AuthContext.Provider>
}