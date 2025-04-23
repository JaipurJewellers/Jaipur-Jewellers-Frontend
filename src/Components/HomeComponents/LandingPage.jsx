import Header from '../Header'
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { BsFire } from "react-icons/bs";
import { FaArrowRightLong } from "react-icons/fa6";
import Star1 from '../../assets/Images/star1.png'
import Star2 from '../../assets/Images/star2.png'
import Star3 from '../../assets/Images/star3.png'
import { LuMoveRight } from "react-icons/lu";
import { LuMoveLeft } from "react-icons/lu";
import Marquee from 'react-fast-marquee';
import Shine from '../../assets/Images/shine.png'
import { NavLink } from 'react-router-dom';
import Main from '../../assets/image1.png'
import Pedant from '../../assets/Newpendant/1.png'
import Earring from '../../assets/Earrings/2.png'
import Bracelet from "../../assets/Newbracelets/3.png"

import { useEffect, useRef, useState } from 'react';
import diamond from '../../assets/Images/diamond.jpg'
import Gemstone from '../../assets/Images/gemstone.jpg'
import Gold from '../../assets/Images/gold.jpg';
import B1 from '../../assets/Newbracelets/5.png';
import B2 from '../../assets/Newbracelets/6.png';
import B3 from '../../assets/Newbracelets/4.png';
import R1 from '../../assets/Newring/2.png';
import R2 from '../../assets/Newring/4.png';
import R3 from '../../assets/Newring/6.png';
import ER1 from '../../assets/Earrings/4.png';
import ER2 from '../../assets/Earrings/5.png';
import ER3 from '../../assets/Earrings/6.png';
import P1 from '../../assets/Newpendant/2.png';
import P2 from '../../assets/Newpendant/3.png';
import P3 from '../../assets/Newpendant/5.png';
function LandingPage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const sliderRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % 4);
        }, 3000); // 5 seconds interval

        return () => clearInterval(interval);
    }, []);

    const carousal = [
        { id: 1, src: Main, alt: "Picture 1", title: 'Rings Collection', content: 'A Circle of Timeless Beauty', otherContent: 'Rings That Symbolize Love, Power & Tradition.',Category1:R1,Category2: R2,Category3: R3 },
        { id: 2, src: Pedant, alt: "Picture 2", title: 'Pendant Collection', content: 'Wear Your Story Close to Your Heart', otherContent: 'Discover Handcrafted Pendants That Speak to You.',Category1: P1,Category2: P2,Category3: P3},
        { id: 3, src: Earring, alt: "Picture 3", title: 'Earrings (Studs) Collection', content: 'Small in Size, Grand in Elegance', otherContent: 'Jaipur’s Finest Stud Earrings for Every Occasion.',Category1: ER1,Category2: ER2,Category3: ER3 },
        { id: 4, src: Bracelet, alt: "Picture 4", title: 'Bracelets Collection', content: 'Wrap Your Wrist in Elegance', otherContent: 'Handcrafted Bracelets That Tell a Story',Category1: B1,Category2: B2,Category3: B3 }
    ];

    useEffect(()=>{
        window.scrollTo(0, 0)
    },[])

    return (
        <>
            <div className='w-full h-10 bg-[#1A3A37] flex items-center justify-between px-5 font-marcellus relative z-50 xl:h-12'>
                <div className='flex gap-4'>
                    <NavLink to={'https://www.instagram.com/jaipur_jewellers.official'} target='_blank'><FaInstagram size={20} className='text-white' /></NavLink>
                    <NavLink to={'https://wa.link/9zk4fk'} target='_blank'><FaWhatsapp size={20} className='text-white' /></NavLink>
                </div>
                <div className='hidden md:flex md:text-white md:text-xs md:items-center lg:text-sm xl:text-base'>
                    ✨ From the Heart of Jaipur to Your Hands – Timeless Jewellery, Crafted for You. ✨
                </div>
                <div className=''>
                    {/* <select name="options" id="options" className="bg-[#1A3A37] outline-none text-white p-2">
                        <option value="" disabled selected>India (Rs)</option>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                    </select> */}
                </div>
            </div>
            <Header color={'#D7D7D7'} />
            <div className='w-full h-auto overflow-hidden relative flex justify-center items-center'>
                <div className='w-full h-auto flex scroll-smooth duration-700 ease-in-out transition-all'
                    ref={sliderRef} style={{
                        transform: `translateX(-${currentIndex * 100}%)`
                    }}
                >
                    {
                        carousal.map((item, index) => (
                            <div className='min-w-full h-auto flex flex-col bg-[#D7D7D7] relative md:flex-row font-marcellus'>
                                <div className='w-full h-[75vh] flex md:w-[70vw] md:items-center md:justify-center overflow-hidden'>
                                    <img src={item.src} alt="Picture 1" className='w-full h-full hidden md:flex md:justify-center md:items-center md:h-[300px] md:w-[300px] md:rounded-3xl xl:w-[400px] xl:h-[400px]' />
                                </div>
                                <div className='absolute top-0 w-full h-[75vh] md:relative '>
                                    <div className='flex flex-col absolute top-20 left-6 sm:left-40 md:left-20'>
                                        <span className='text-[#1A3A37] tracking-[3px]'>{item.title}</span>
                                        <div className='flex flex-col px-2 text-4xl my-3 gap-3 sm:text-5xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl lg:w-[500px]'>
                                            {
                                                item.content
                                            }
                                        </div>
                                        <div className='mt-5'>
                                            <NavLink to='/shop' className='py-2 bg-[#1A3A37] text-white rounded-xl text-lg flex justify-center items-center gap-3 w-44 cursor-pointer'>
                                                Know More <span className='w-7 h-7 bg-white flex justify-center items-center rounded-full'><FaArrowRightLong size={15} className='text-[#1A3A37]' /></span>
                                            </NavLink>
                                        </div>
                                    </div>
                                    <img src={Star1} alt="star 1" className='absolute top-10 left-16 sm:left-40 md:left-16 lg:top-7 lg:left-7 lg:w-7' />
                                    {/* <img src={Star2} alt="star 1" className='absolute bottom-20 left-16 sm:left-40 md:left-16 lg:top-20 lg:left-60 lg:w-3' /> */}
                                    <img src={Star3} alt="star 1" className='absolute top-72 right-16 sm:right-32 md:right-16 lg:top-28 lg:right-52 lg:w-5 xl:right-72 2xl:top-32' />
                                    <img src={Star3} alt="star 1" className='hidden lg:absolute lg:block lg:bottom-20 lg:right-20 lg:w-5' />
                                    <img src={Star3} alt="star 1" className='hidden lg:absolute lg:block lg:bottom-40 lg:right-72 lg:w-5 xl:bottom-48 xl:right-96' />
                                    <div className='w-40 h-auto bottom-20 absolute right-10 text-xl sm:right-32 md:right-5 lg:w-56 lg:bottom-40 xl:bottom-48 xl:right-20'>
                                        <p>{item.otherContent}</p>
                                    </div>
                                    <img src={item.Category1} alt="image" className='hidden md:block absolute w-20 h-20 bottom-10 left-56  rounded-lg lg:left-80 xl:left-96' />
                                    <img src={item.Category2} alt="image" className='hidden md:block absolute w-20 h-20 top-20 right-10  rounded-lg 2xl:top-32 2xl:right-32' />
                                    <img src={item.Category3} alt="image" className='hidden xl:block xl:absolute xl:w-20 xl:h-20 xl:top-0 xl:right-80  xl:rounded-lg 2xl:right-96' />
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className='w-full h-auto flex gap-3 font-marcellus justify-center items-center text-sm absolute bottom-10 lg:bottom-14 xl:text-base'>
                    <span onClick={() => setCurrentIndex((prevIndex) => prevIndex === 0 ? 3 : (prevIndex - 1) % 4)} className='cursor-pointer'><LuMoveLeft size={15} /></span>
                    <span>{currentIndex + 1}/4</span>
                    <span onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % 4)} className='cursor-pointer'><LuMoveRight size={15} /></span>
                </div>
            </div>
            <div className='w-full h-10 bg-[#1A3A37] py-1.5 text-white font-marcellus flex items-center lg:h-12'>
                <Marquee direction='left' speed={70} className=''>
                    <img src={Shine} alt="shine" className='w-10 mx-6' />
                    <span className='mx-6 text-2xl'>Exclusive Discounts on Jaipur’s Finest Jewellery ! Celebrate the Festivities with Extra Sparkle !</span>
                    <img src={Shine} alt="shine" className='w-10 mx-6' />
                    <span className='mx-6 text-2xl'>Exclusive Discounts on Jaipur’s Finest Jewellery ! Celebrate the Festivities with Extra Sparkle !</span>
                    <img src={Shine} alt="shine" className='w-10 mx-6' />
                    <span className='mx-6 text-2xl '>Exclusive Discounts on Jaipur’s Finest Jewellery ! Celebrate the Festivities with Extra Sparkle !</span>
                    {/* <img src={Shine} alt="shine" className='w-10' />
                    <span className='mx-6'>Upto 30% Off On First Purchase</span>
                    <img src={Shine} alt="shine" className='w-10' />
                    <span className='mx-6'>Upto 30% Off On First Purchase</span>
                    <img src={Shine} alt="shine" className='w-10' />
                    <span className='mx-6'>Upto 30% Off On First Purchase</span> */}
                </Marquee>
            </div>
        </>
    )
}

export default LandingPage