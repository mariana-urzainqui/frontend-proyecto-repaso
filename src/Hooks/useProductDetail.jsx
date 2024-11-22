import { useState, useEffect } from 'react'
import { GET, getAuthenticatedHeaders } from '../fetching/http.fetching'
import ENVIRONMENT from '../environment'

const useProductDetail = (product_id) => {
    const [product, setProduct] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!product_id) {
            setError('El ID del producto no es válido.')
            setIsLoading(false)
            return;
        }

        const fetchProduct = async () => {
            try {
                const response = await GET(`${ENVIRONMENT.URL_BACKEND}/api/products/${product_id}`, {
                    headers: getAuthenticatedHeaders(),
                })

                if (response.ok) {
                    setProduct(response.payload?.product)
                } else {
                    setError(response.payload?.message || 'No se pudo obtener el producto.')
                }
            } catch (err) {
                setError(err.message || 'Error al obtener los detalles del producto.')
            } finally {
                setIsLoading(false)
            }
        }

        fetchProduct()
    }, [product_id])

    return { product, isLoading, error }
}

export default useProductDetail 

