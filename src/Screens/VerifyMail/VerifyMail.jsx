import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GET, getUnauthenticatedHeaders } from '../../fetching/http.fetching'

const VerifyEmail = () => {
    const { verificationToken } = useParams()
    const [status, setStatus] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const verifyEmail = async () => {
            if (!verificationToken) {
                setError('No se proporcionó un token de verificación.')
                return
            }

            try {
                const response = await GET(`https://backend-proyecto-repaso.vercel.app/api/auth/verify/${verificationToken}`, {
                    headers: getUnauthenticatedHeaders(),
                })
                if (response.ok) {
                    setStatus('¡Correo verificado con éxito!');
                } 
                else {
                    setError(response.payload?.detail || 'Error al verificar el correo.')
                }
            } 
            catch (error) {
                console.error('Error al verificar el correo:', error)
                setError('Error de conexión con el servidor.')
            }
        }

        verifyEmail()
    }, [verificationToken])

    return (
        <div>
            <h1>Verificación de Correo Electrónico</h1>
            {status && <p>{status}</p>}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        </div>
    )
}

export default VerifyEmail
