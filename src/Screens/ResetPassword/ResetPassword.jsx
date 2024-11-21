import { useNavigate, useParams } from 'react-router-dom'
import useForm from '../../Hooks/useForm'
import useMessages from '../../Hooks/useMessages'
import { PUT } from '../../fetching/http.fetching'


const ResetPassword = () => {
    const { reset_token } = useParams()
    const navigate = useNavigate()

    const { form_values_state, handleChangeInputValue, clearForm } = useForm({ password: '' })
    const { formErrors, setFormErrors, successMessage, setSuccessMessage, generalError, setGeneralError, clearMessages } = useMessages()

    const handleSubmitResetPasswordForm = async (event) => {
        event.preventDefault()
        clearMessages()

        if (!form_values_state.password || form_values_state.password.length < 8) {
            setFormErrors({ password: 'La contraseña debe tener al menos 8 caracteres' })
            return;
        }

        try {
            const response = await PUT(
                `http://localhost:3000/api/auth/reset-password/${reset_token}`, 
                { password: form_values_state.password } 
            )

            if (response) {
                setSuccessMessage(response.payload?.detail || 'Contraseña restablecida correctamente')
                setTimeout(() => {
                    navigate('/login')
                }, 2000)
            }
        } catch (error) {
            setGeneralError('Hubo un problema al restablecer la contraseña')
        }
    };

    return (
        <div>
            <h1>Restablecer contraseña</h1>
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            {generalError && <p style={{ color: 'red' }}>{generalError}</p>}

            <form onSubmit={handleSubmitResetPasswordForm}>
                <div>
                    <label htmlFor="password">Nueva contraseña:</label>
                    <input
                        name="password"
                        id="password"
                        type="password"
                        placeholder="Ingrese nueva contraseña"
                        value={form_values_state.password}
                        onChange={handleChangeInputValue}
                    />
                    {formErrors.password && <p style={{ color: 'red' }}>{formErrors.password}</p>}
                </div>
                <button type="submit">Restablecer contraseña</button>
            </form>

            <span>¿Recuerdas tu contraseña? <a href="/login">Iniciar sesión</a></span>
        </div>
    )
}

export default ResetPassword
