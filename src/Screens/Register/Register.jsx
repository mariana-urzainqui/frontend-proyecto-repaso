import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useForm from '../../Hooks/useForm'
import { getUnauthenticatedHeaders, POST } from '../../fetching/http.fetching'
import useMessages from '../../Hooks/useMessages'
import ENVIRONMENT from '../../environment'


const Register = () => {
    const navigate = useNavigate()
    const {
        formErrors,
        setFormErrors,
        successMessage,
        setSuccessMessage,
        generalError,
        setGeneralError,
        clearMessages
    } = useMessages()

    const { form_values_state, handleChangeInputValue, clearForm } = useForm({
        'name': '',
        'email': '',
        'password': ''
    })

    const handleSubmitRegisterForm = async (event) => {
        event.preventDefault()
        clearMessages()
        try {
            const response = await POST(`${ENVIRONMENT.URL_BACKEND}/api/auth/register`, {
                body: form_values_state,  
                headers: getUnauthenticatedHeaders()
            })
            if(response.ok){
                setSuccessMessage('¡Registro exitoso! Por favor, verifica tu correo.')
                clearForm()
                setTimeout(() => navigate('/login'), 5000)
            }
            else{
                const backendErrors = response.payload?.errors || {}
                setFormErrors(backendErrors)
            }
        }
        catch (error) {
            console.error('Error al registrar:', error)
            setGeneralError('Hubo un problema al conectar con el servidor')
        }
    }
    return (
        <div>
            <h1>Registrate en nuestra web</h1>
            {successMessage && <p>{successMessage}</p>}
            {generalError && <p>{generalError}</p>}
            <form onSubmit={handleSubmitRegisterForm}>
                <div>
                    <label htmlFor='name'>Ingrese su nombre:</label>
                    <input
                        name='name'
                        id='name'
                        placeholder='Pepe Suarez'
                        value={form_values_state.name}
                        onChange={handleChangeInputValue}
                    />
                    {formErrors.name && <p>{formErrors.name}</p>}
                </div>
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
                <button type='submit'>Registrar</button>
            </form>
            <span>Si ya tienes cuenta, puedes ir a <Link to='/login'>Login</Link></span>
        </div>
    )
}

export default Register
