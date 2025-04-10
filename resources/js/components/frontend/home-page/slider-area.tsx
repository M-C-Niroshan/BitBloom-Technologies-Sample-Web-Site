import { Link } from '@inertiajs/react';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { motion } from "framer-motion";
import { FaLocationDot } from "react-icons/fa6";
import { MdAlternateEmail } from "react-icons/md";

interface SliderArea {
    admin_mode?: boolean;
}
export default function SliderArea({ admin_mode }: SliderArea) {
    const slides = [
        {
            src: '/images/slide_show/slide_show_1.jpeg',
            caption: 'Innovating Together — Tailored Tech for Your Vision',
        },
        {
            src: '/images/slide_show/slide_show_2.webp',
            caption: 'Empowering Ideas Through Seamless Solutions',
        },
        {
            src: '/images/slide_show/slide_show_3.webp',
            caption: 'Where Technology Meets Simplicity and Style',
        },
        {
            src: '/images/slide_show/slide_show_4.webp',
            caption: 'A Team That Cares. A Process That Works.',
        },
        {
            src: '/images/slide_show/slide_show_6.jpg',
            caption: 'Creating Mobile Experiences People Love',
        },
        {
            src: '/images/slide_show/slide_show_7.jpg',
            caption: 'Smart Cloud Solutions Built for Scalability',
        },
        {
            src: '/images/slide_show/slide_show_8.jpg',
            caption: 'Driven by Purpose. Powered by Innovation.',
        },
    ]
    return (
        <>
            {/* Slideshow and description side by side */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-10 mb-12">
                {/* Slideshow Left Side */}
                <div className="w-full md:w-1/2 max-w-xl rounded overflow-hidden shadow-lg relative">
                    <Fade
                        duration={2000}
                        transitionDuration={500}
                        arrows={false}
                        autoplay={true}
                        infinite={true}
                        indicators={false}
                    >
                        {slides.map((slide, index) => (
                            <div key={index} className="each-slide-effect relative">
                                <div className="absolute bottom-0 left-0 w-full bg-black/50 text-white text-sx px-4 py-8 z-10">
                                    {slide.caption}
                                </div>
                                <img
                                    src={slide.src}
                                    alt={`Slide ${index + 1}`}
                                    className="w-full h-[350px] "
                                />
                            </div>
                        ))}
                    </Fade>
                </div>


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
