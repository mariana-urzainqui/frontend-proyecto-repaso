import React from 'react'
import { Link } from 'react-router-dom'
import useForm from '../../Hooks/useForm'
import useMessages from '../../Hooks/useMessages'
import { getUnauthenticatedHeaders, POST } from '../../fetching/http.fetching'
import ENVIRONMENT from '../../environment'

const ForgotPassword = () => {
    const { form_values_state, handleChangeInputValue } = useForm({email: ''})
    const {
        formErrors,
        setFormErrors,
        successMessage,
        setSuccessMessage,
        generalError,
        setGeneralError,
        clearMessages
    } = useMessages()

    const handleSubmitForgotPasswordForm = async (event) => {
        event.preventDefault()
        clearMessages()
        try {
            const response = await POST(`${ENVIRONMENT.URL_BACKEND}/api/auth/forgot-password`, {
                body: form_values_state, 
                headers: getUnauthenticatedHeaders()
            })
            if (response.ok) {
                setSuccessMessage('Se ha enviado un correo electrónico con las instrucciones para restablecer tu contraseña.')
            }
            else {
                const backendErrors = response.payload?.errors || {}
                setFormErrors(backendErrors)
            }
        }
        catch(error){
            console.error('Error al procesar la solicitud de restablecimiento de contraseña:', error)
            setGeneralError('Hubo un problema al conectar con el servidor. Por favor, intenta nuevamente más tarde.')
        }  
    }
    return (
            <div>
                <h1>¿Olvidaste tu contraseña?</h1>
                <p>Introduce tu correo electrónico para enviarte las instrucciones de restablecimiento de contraseña.</p>
                {successMessage && <p>{successMessage}</p>}
                {generalError && <p>{generalError}</p>}
                <form onSubmit={handleSubmitForgotPasswordForm}>
                    <div>
                        <label htmlFor='email'>Ingrese su correo electrónico:</label>
                        <input 
                        name='email' 
                        id='email' 
                        type='email' 
                        placeholder='pepe@gmail.com'
                        value={form_values_state.email}
                        onChange={handleChangeInputValue} 
                        />
                        {formErrors.email && <p>{formErrors.email}</p>}
                    </div>
                    <button type='submit'>Enviar instrucciones</button>
                </form>
                <span>Si tienes cuenta, puedes <Link to='/login'>iniciar sesión aqui</Link></span>
                <br />
                <span>Si aun no tienes cuenta, puedes <Link to='/register'>registrarte aqui</Link></span>
            </div>
        )
}

    export default ForgotPassword
