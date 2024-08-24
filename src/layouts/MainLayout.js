import Header from '@/components/shared/Header/Header'
import { Footer } from 'antd/es/layout/layout'
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