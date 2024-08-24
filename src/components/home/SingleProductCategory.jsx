import axiosInstance from '@/lib/axios'
import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'

const SingleProductCategory = ({ category, index }) => {

    const [products, setProducts] = useState([])
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        if (category) {
            setLoading(true)
            axiosInstance.get(`/product/productbycat/${category.slug}`)
                .then(res => {
                    setProducts(res.data.products)
                    setLoading(false)
                })
                .catch(err => {
                    setLoading(false)
                })
        }

    }, [category])

    console.log(index)

    return (
        <>
            {
                products.length !== 0 && <div className={`${"main_container"}`}>
                    <h3 className="home_section_title text-start">{category?.name}</h3>
                    <div className='product_container'>
                        {
                            products.map(product => <ProductCard key={product._id} product={product} />)
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default SingleProductCategory