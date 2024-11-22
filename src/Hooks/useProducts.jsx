import { useEffect, useState } from "react"
import { GET, getAuthenticatedHeaders } from "../fetching/http.fetching"
import ENVIRONMENT from "../environment"

const useProducts = () => {
    const [products, setProducts] = useState([])
    const [isLoadingProducts, setIsLoadingProducts] = useState(true)
    const getProducts = async () => {
        const response = await GET(`${ENVIRONMENT.URL_BACKEND}/api/products`, {
            headers: getAuthenticatedHeaders()
        })
        console.log({response})
        if(response.ok){
            setProducts(response.payload.products)
            setIsLoadingProducts(false)
        }
    }
    useEffect(
        () => {
            getProducts()
        },
        []
    )
    return {products, isLoadingProducts}
}

export default useProducts