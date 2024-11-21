import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getUnauthenticatedHeaders, POST } from '../../fetching/http.fetching'
import useForm from '../../Hooks/useForm'
import useMessages from '../../Hooks/useMessages'

const Login = () => {
    const navigate = useNavigate()
    const {
        formErrors,
        setFormErrors,
        successMessage,
        generalError,
        setGeneralError,
        clearMessages
    } = useMessages()

    const { form_values_state, handleChangeInputValue, clearForm } = useForm({
        email: '',
        password: ''
    })

    const handleSubmitLoginForm = async (event) => {
        event.preventDefault()
        clearMessages()
        try {
            const response = await POST('http://localhost:3000/api/auth/login', {
                body: form_values_state,  
                headers: getUnauthenticatedHeaders() 
            })
            if (response.ok) {
                const access_token = response.payload.token
                sessionStorage.setItem('access_token', access_token)
                sessionStorage.setItem('user_info', JSON.stringify(response.payload.user))
                navigate('/home')
            }
            else {
                const backendErrors = response.payload?.errors || {}
                setFormErrors(backendErrors)
            }
        }
        catch (error) {
            console.error('Error durante el inicio de sesion:', error)
            setGeneralError('Hubo un problema al conectar con el servidor')
        }
    }
    return (
        <div>
            <h1>Inicia sesión en nuestra web</h1>
            {successMessage && <p>{successMessage}</p>}
            {generalError && <p>{generalError}</p>}
            <form onSubmit={handleSubmitLoginForm}>
                <div>
                    <label htmlFor='email'>Ingrese su email:</label>
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

                <div>
                    <label htmlFor='password'>Ingrese su contraseña:</label>
                    <input
                        name='password'
                        id='password'
                        type='password'
                        placeholder='***********'
                        value={form_values_state.password}
                        onChange={handleChangeInputValue}
                    />
                    {formErrors.password && <p>{formErrors.password}</p>}
                </div>
                <button type='submit'>Iniciar sesión</button>
            </form>
            <span>Si has olvidado tu contraseña, puedes <Link to='/forgot-password'>restablecerla aqui</Link></span>
            <br />
            <span>Si aun no tienes cuenta, puedes <Link to='/register'>registrarte</Link></span>
        </div>
    )
}

export default Login
