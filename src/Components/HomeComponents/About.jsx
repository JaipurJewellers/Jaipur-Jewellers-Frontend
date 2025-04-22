import React, { useState } from 'react';
import Info from '../Utils/Info';
import { NavLink } from 'react-router-dom';
import SignImg from '../../assets/sign.png';
import Pedant from '../../assets/about1.png';
import Perls from '../../assets/about2.png';
import Bracelet from "../../assets/about3.png";
import Rings from "../../assets/about4.png";
import Stone from "../../assets/Images/Stone.webp";

function About() {
    const [hoverNo, setHoverNo] = useState(null);
    
    const products = [
        { image:Pedant, name: "Earrings" ,description:"Earrings are stylish accessories worn on the earlobes, enhancing facial features and personal style.They come in various designs, from subtle studs to bold, eye-catching danglers for every occasion.They also hold cultural and personal significance, often symbolizing tradition or self-expression."},
        { image: Perls, name: "Ring" , description:" A ring is a circular band, typically made of metal, worn on the finger as a symbol of love, commitment, status, or fashion. Rings can feature gemstones, engravings, or intricate designs, making them timeless pieces of personal expression and adornment.."},
        { image: Bracelet, name: "Bracelet", description:"A Bracelet is a decorative accessory worn around the wrist, made from materials like metal, leather, or beads. It can feature charms, gemstones, or intricate designs, adding style and elegance." },
        { image: Rings, name: "Necklace", description:"A necklace is an ornamental piece worn around the neck, often made from metals, beads, or gemstones. It enhances beauty, complements outfits, and can carry deep personal or cultural meaning. From delicate chains to bold statement pieces, necklaces suit every style and occasion." },
    ];
    
    return (
        <div className='w-full h-auto flex flex-col py-5 bg-[#F4EFEF] pt-20'>
            <h1 className='font-marcellus tracking-[3px] text-center text-sm'>ABOUT OUR JAIPUR JWELLERS</h1>
            <div className='w-full h-auto flex flex-col relative'>
                <div className='w-full h-auto flex flex-col justify-center items-center font-marcellus text-xs mt-5 mb-10 md:mt-10 md:mb-20 md:text-xl md:gap-4 xl:text-2xl xl:gap-6 2xl:text-3xl'>
                    <p className='text-center flex items-center uppercase'>For three generations, we’ve woven Jaipur’s rich heritage</p>
                    <p className='text-center flex items-center uppercase'>into every exquisite piece of jewellery. Now, our legacy of timeless</p>
                    <p className='text-center flex items-center uppercase'>craftsmanship is just a click away—experience luxury, redefined.</p>
                </div>
                <div className='w-full h-auto flex flex-col items-center justify-center gap-2 font-marcellus'>
                    <img src={SignImg} alt="sign logo" className='w-40 h-14' />
                    <span>Abdul Mehraj</span>
                </div>
            </div>
            <div className='product-slider my-10 h-auto w-full overflow-x-scroll flex font-marcellus lg:overflow-x-hidden'>
                {products.map((product, index) => (
                    <NavLink
                        key={index}
                        to={'/shop'}
                        state={{category: product.name}}
                        onMouseEnter={() => setHoverNo(index)}
                        onMouseLeave={() => setHoverNo(null)}
                        className='min-w-full h-auto relative sm:min-w-[25vw] cursor-pointer'
                    >
                        <div className='relative'>
                            <img 
                                src={product.image} 
                                alt={product.name} 
                                className={`w-full h-[70vh] lg:h-[90vh] object-contain rounded-2xl transition-opacity duration-300 ${hoverNo === index ? 'opacity-100' : 'opacity-50'}`}
                            />
                            <div className={`absolute rounded-xl bottom-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-50 text-white text-lg font-semibold transition-opacity duration-300 ${hoverNo === index ? 'opacity-100' : 'opacity-0'}`}> 
                                <div className='absolute bottom-20'>
                                <div className='text-3xl font-bold text-center'>{product.name}</div> 
                                <div className='text-center m-3'>{product.description}</div> 
                                </div>
                            </div>
                        </div>
                    </NavLink>
                ))}
            </div>
            <Info />
        </div>
    );
}

export default About;
