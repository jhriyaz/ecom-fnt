import Footer from '@/components/shared/Footer'
import Header from '@/components/shared/Header/Header'
import React from 'react'

const MainLayout = ({ children }) => {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    )
}

export default MainLayout