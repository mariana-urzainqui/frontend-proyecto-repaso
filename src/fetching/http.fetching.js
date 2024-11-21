export const POST = async (URL_API, { body, headers }) => {
    try {
        const response = await fetch(URL_API, {
            method: 'POST',
            headers: headers, 
            body: JSON.stringify(body), 
        })
        
        if (!response.ok) {
            throw new Error('Error en la solicitud')
        }

        return response.json()
    } catch (error) {
        console.error('Error en la solicitud POST:', error)
        throw error
    }
}


export const PUT = async (URL_API, body) => {
    try {
        const response = await fetch(URL_API, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json', 
                'x-api-key': '7b19762c-615a-4003-a1aa-ac4f67a6a385' 
            },
            body: JSON.stringify(body) 
        })

        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }

        return await response.json(); 
    } catch (error) {
        console.error('Error al hacer la solicitud PUT:', error);
        throw error
    }
}

export const GET = async (URL_API, params) => {
    try{
        const response = await fetch(URL_API,{
            method: 'GET',
            ...params
        })
        return response.json()
    }
    catch(error){
        console.log(error)
        throw error
    }
}

const getUnauthenticatedHeaders = () => {
    const unauthenticatedHeaders = new Headers()
    unauthenticatedHeaders.set('Content-Type', 'application/json')
    unauthenticatedHeaders.set('x-api-key', '7b19762c-615a-4003-a1aa-ac4f67a6a385')
    return unauthenticatedHeaders
}


const getAuthenticatedHeaders = () => {
    const authenticatedHeaders = new Headers()
    authenticatedHeaders.set('Content-Type', 'application/json')
    authenticatedHeaders.set('x-api-key', '7b19762c-615a-4003-a1aa-ac4f67a6a385')
    authenticatedHeaders.set('Authorization', 'Bearer ' + sessionStorage.getItem('access_token'))
    return authenticatedHeaders
}



export { getAuthenticatedHeaders, getUnauthenticatedHeaders }


