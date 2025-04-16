import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './App.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import About from './Components/About.jsx'
import Home from './Components/Home.jsx'
import ContactUs from './Components/ContactUs.jsx'
import MyCart from './Components/MyCart.jsx'
import Checkout from './Components/Checkout.jsx'
import { AuthProvider } from './Components/AuthContext.jsx'
import SingleProduct from './Components/SingleProduct.jsx'
import { CartProvider } from './Components/CartContext.jsx'
import Shop from './Components/Shop.jsx'
import AdminLogin from './Components/AdminLogin.jsx'
import Dashboard from './Components/AdminComponents/Dashboard.jsx'
import AllOrders from './Components/AdminComponents/AllOrders.jsx'
import ViewProfile from './Components/ViewProfile.jsx'
import Login from './Components/Login.jsx'
import SignUp from './Components/SignUp.jsx'
import ForgotPassword from './Components/ForgotPassword.jsx'
import BlogPage from './Components/BlogPage.jsx'
import Blogs from './Components/AdminComponents/Blogs.jsx'
import CreateBlog from './Components/AdminComponents/CreateBlog.jsx'
import FavoritesPage from './Components/FavoritesPage.jsx'
import Terms from './Components/Terms.jsx'
import Privacy from './Components/Privacy.jsx'
import Refund from './Components/Refund.jsx'
import Shipping from './Components/Shipping.jsx'
import { FavoritesProvider } from './Components/FavoritesContext.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<App />}>
        <Route path='/' element={<Home />} />
        <Route path='/collections' element={<Home scrollTo="collections" />} />
        <Route path='/about' element={<About />} />
        <Route path='/blog/:id?' element={<BlogPage />} />
        <Route path='/contact-us' element={<ContactUs />} />
        <Route path='/my-cart' element={<MyCart />} />
        <Route path='/my-cart/checkout' element={<Checkout />} />
        <Route path='/single-product/:id' element={<SingleProduct />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/termsandconditions' element={<Terms />} />
        <Route path='/privacy-policy' element={<Privacy />} />
        <Route path='/refund-policy' element={<Refund />} />
        <Route path='/shipping-policy' element={<Shipping />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup-page' element={<SignUp />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Route>
      <Route path='/admin' element={<AdminLogin />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/admin/blogs' element={<Blogs />} />
      <Route path='/admin/create-blog' element={<CreateBlog />} />
      <Route path='/view-orders' element={<AllOrders />} />
      <Route path='/view-profile' element={<ViewProfile />} />
    </>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FavoritesProvider>
    <CartProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </CartProvider>
    </FavoritesProvider>
  </StrictMode>,
)