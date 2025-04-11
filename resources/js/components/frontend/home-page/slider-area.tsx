import { Link } from '@inertiajs/react';
import 'react-slideshow-image/dist/styles.css';
import { motion } from "framer-motion";
import { FaLocationDot } from "react-icons/fa6";
import { MdAlternateEmail } from "react-icons/md";
import Slider from './sub-component/slider';

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
                    <h1 className="text-4xl font-bold mb-4">Welcome to BitBloom Technologies</h1>

                    <p className="text-lg mb-6">
                        We provide cutting-edge software solutions to help your business thrive in the digital world.
                        From web and mobile development to cloud integration, we turn ideas into scalable, secure, and elegant systems.
                    </p>

                    {/* Company Contact Info */}
                    <div className="mb-6 text-sm text-gray-600 space-y-3">
                        <div className="flex items-start gap-2">
                            <FaLocationDot className="text-blue-600 mt-1" />
                            <div>
                                <p className="font-semibold">Headquarters:</p>
                                <p>BitBloom Technologies, 225/SK, Colombo 12, Sri Lanka</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-2">
                            <MdAlternateEmail className="text-blue-600 mt-1" />
                            <div>
                                <p className="font-semibold">Business Inquiries:</p>
                                <p>
                                    <a href="mailto:info@bitbloomtec.com" className="hover:underline">
                                        info@bitbloomtec.com
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>

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
