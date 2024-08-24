import axiosInstance from '@/lib/axios'
import { Rate } from 'antd'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const LatestProducts = () => {

    const [LatestProducts, setLatestProducts] = useState([])

    const fetchLatestProduct = () => {
        axiosInstance.get('/product/getProducts')
            .then(res => {
                if (res.data.success) {
                    setLatestProducts(res.data.products)

                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        fetchLatestProduct()
    }, [])

    console.log(LatestProducts)

    return (
        <div className='latest_products'>
            {
                LatestProducts.length !== 0 ?
                    <div className='main_container'>
                        <div className='d-flex justify-content-between align-items-center'>
                            <h3 className='home_section_title'>Latest products</h3>
                            <button className='primary_btn'>View More</button>
                        </div>

                        <div className='products-container'>
                            {
                                LatestProducts.map(p => <div key={p._id} className='product'>
                                    <Image src={p.thumbnail} height={500} width={500} alt='product image' />

                                    <div className='details'>

                                        <div>
                                            <button className='favourite'>
                                                <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.77007 2.98074C6.39524 1.37854 4.10264 0.947548 2.38008 2.41468C0.657521 3.88182 0.415009 6.3348 1.76774 8.06998C2.89245 9.51268 6.29621 12.5554 7.41177 13.5402C7.53658 13.6504 7.59899 13.7055 7.67178 13.7272C7.73531 13.7461 7.80483 13.7461 7.86836 13.7272C7.94115 13.7055 8.00355 13.6504 8.12836 13.5402C9.24393 12.5554 12.6477 9.51268 13.7724 8.06998C15.1251 6.3348 14.9122 3.86639 13.1601 2.41468C11.4079 0.962981 9.14489 1.37854 7.77007 2.98074Z" stroke="#3C4242" stroke-width="1.26066" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </button>
                                            <h4 className='title'>{p.name}</h4>

                                            <div className="rating">
                                                <Rate
                                                    style={{ fontSize: "16px" }}
                                                    disabled
                                                    defaultValue={p?.ratingCount}
                                                />
                                            </div>

                                            {
                                                p?.discount?.value !== 0 && <div className='discount'>
                                                    {
                                                        p.discount.discountType === 'percent' ? <span>upto {p?.discount?.value}% off</span> :
                                                            <span>flat {p?.discount?.value}$ off</span>
                                                    }
                                                </div>
                                            }
                                        </div>

                                        <div className='bottom'>
                                            <Image src={'/svgs/home/downArrow.png'} height={28} width={23} className='arrow' alt='arrow down icon' />
                                            <button>shop now</button>
                                        </div>

                                    </div>
                                </div>)
                            }
                        </div>
                    </div>

                    :

                    <span></span>
            }
        </div>
    )
}

export default LatestProducts