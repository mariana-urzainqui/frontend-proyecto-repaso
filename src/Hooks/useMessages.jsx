import { useState } from 'react'

const useMessages = () => {
    const [formErrors, setFormErrors] = useState({})
    const [successMessage, setSuccessMessage] = useState('')
    const [generalError, setGeneralError] = useState('')

    const clearMessages = () => {
        setFormErrors({});
        setSuccessMessage('');
        setGeneralError('');
    }

    return {
        formErrors,
        setFormErrors,
        successMessage,
        setSuccessMessage,
        generalError,
        setGeneralError,
        clearMessages
    }
}

export default useMessages
