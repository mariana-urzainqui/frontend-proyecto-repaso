import React from 'react'
import { Link, useParams } from 'react-router-dom'
import useProductDetail from '../../Hooks/useProductDetail'


const DetailProduct = () => {
    const { product_id } = useParams()
    const { product, isLoading, error } = useProductDetail(product_id)

    if (isLoading) return <p>Cargando detalles del producto...</p>
    if (error) return <p>Error al cargar el producto: {error}</p>

    return (
        <div>
            <h2>Detalle del Producto</h2>
            {product ? (
                <div>
                    <h3>{product.title}</h3>
                    <img src={product.image_base_64} alt={product.title} width={300} />
                    <p>Precio: ${product.price}</p>
                    <p>Stock: {product.stock}</p>
                    <p>Descripción: {product.description}</p>
                </div>
            ) : (
                <p>No se encontró el producto.</p>
            )}
            <Link to="/home">Volver a home</Link>
        </div>
    )
}

export default DetailProduct
