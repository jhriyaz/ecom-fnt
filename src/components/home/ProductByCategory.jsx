import React, { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { useSelector } from 'react-redux'
import SingleProductCategory from './SingleProductCategory'
import { Oval } from 'react-loader-spinner'

const ProductByCategory = () => {

    const { categories: { categoriesData } } = useSelector(s => s.general)
    const [hasMore, setHasmore] = useState(true)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [sortedCategories, setSortedCategories] = useState([])

    const loadMoreCategories = () => {
        if (categoriesData.length === 0) {
            return
        }
        if (categoriesData.length === currentIndex + 1) {
            setHasmore(false)
        }
        setSortedCategories(prev => [...prev, categoriesData[currentIndex]])
        setCurrentIndex(prev => prev + 1)
    }

    console.log(sortedCategories)

    return (

        <InfiniteScroll
            pageStart={0}
            loadMore={loadMoreCategories}
            hasMore={hasMore}
            loader={<div className="loader main_container d-flex justify-content-center" key={0}>
                <Oval
                    visible={true}
                    height="80"
                    width="80"
                    color="#4fa94d"
                    ariaLabel="oval-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            </div>}
            useWindow={false}
        >
            {
                sortedCategories.length !== 0 && sortedCategories.map((category, index) => <SingleProductCategory key={category._id} index={index} category={category} />)
            }
        </InfiniteScroll>

    )
}

export default ProductByCategory