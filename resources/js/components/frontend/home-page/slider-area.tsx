import { Link } from '@inertiajs/react';
import 'react-slideshow-image/dist/styles.css';
import { motion } from "framer-motion";
import Slider from './sub-component/slider';
import MainHeader from './sub-component/mainHeader'

interface SliderArea {
    admin_mode?: boolean;
}
export default function SliderArea({ admin_mode }: SliderArea) {
    
    return (
        <>
            {/* Slideshow and description side by side */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-10 mb-12">
                
                {/* Slideshow Left Side */}
                <Slider/>


                {/* Description Right Side of the slide-show*/}
                <motion.div
                    className="w-full md:w-1/2 text-center md:text-left"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                   <MainHeader/>

                    {/* Buttons */}
                    <div className={`space-x-4 ${admin_mode ? 'pointer-events-none' : ''}`}>
                        <Link
                            href="/services"
                            className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-2 rounded-lg inline-block"
                        >
                            Explore Our Services
                        </Link>
                        <Link
                            href="/contact"
                            className="bg-gray-600 hover:bg-gray-700 transition text-white px-6 py-2 rounded-lg inline-block"
                        >
                            Contact Us
                        </Link>
                    </div>
                </motion.div>
            </div>
        </>
    )
}
