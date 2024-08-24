import React from 'react'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

const ShopByCategory = () => {

    const { categories } = useSelector(state => state.general)

    const { categoriesData, isLoading, isError } = categories

    const Router = useRouter()

    return (
        <div className="main_container shop-by-category">

            <div className='d-flex justify-content-between align-items-center'>
                <h3 className='home_section_title'>Shop By Category</h3>
                <button className='primary_btn'>View More</button>
            </div>
            <div className="categories-container">
                {
                    categoriesData.length !== 0 && categoriesData.slice(0, 11).map((item, index) => {
                        return (
                            <div key={index} >
                                <div onClick={() => Router.push(`/search?category=${item.slug}`)} className="category-card">
                                    <Image src={item.categoryImage ? item.categoryImage : "https://via.placeholder.com/200"} height={200} width={200} />
                                    <p className='name'>{item.name}</p>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default ShopByCategory