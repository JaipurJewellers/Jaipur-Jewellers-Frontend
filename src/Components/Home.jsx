import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import LandingPage from './HomeComponents/LandingPage'
import About from './HomeComponents/About'
import Products from './HomeComponents/Products'
import Collections from './HomeComponents/Collections'
import Testimonial from './HomeComponents/Testimonial'
import axios from 'axios'

const backend = import.meta.env.VITE_BACKEND_URL

function Home({ scrollTo }) {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const location = useLocation()

    async function fetchProducts() {
        try {
            setLoading(true)
            const response = await axios.get(`${backend}/api/v1/products/get-all-products?page=${1}&limit=${6}`)
            if (response.status === 200) {
                setProducts(response.data.products)
                setLoading(false)
            }
        } catch (error) {
            console.log("error while fetching products", error)
            setLoading(true)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    useEffect(() => {
        if (scrollTo) {
            const timer = setTimeout(() => {
                const element = document.getElementById(scrollTo)
                if (element) {
                    element.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    })
                    
                    // Update URL without triggering navigation
                    window.history.replaceState({}, '', '/collections')
                }
            }, 300) // Slightly longer delay to ensure components are rendered
            
            return () => clearTimeout(timer)
        }
    }, [scrollTo, location, products]) // Added products to dependencies

    return (
        <>
            <LandingPage />
            <About data={products} />
            <Products data={products} />
            <div id="collections">
                <Collections data={products} />
            </div>
            <Testimonial />
        </>
    )
}

export default Home