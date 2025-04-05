import React from 'react'
import { FaPhoneAlt, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { MdAlternateEmail } from 'react-icons/md';
import { FaLocationDot } from 'react-icons/fa6';

export function MainFooter() {
    return (
        <div>
            <footer className="bg-[#0B0C10] text-white py-10 w-full">
                <div className="container mx-auto pl-6 pr-6 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 justify-between items-center w-full">
                        {/* Company Info Section */}
                        <div className='flex flex-col'>
                            <h3 className="text-2xl font-semibold mb-4">BitBloom Technologies</h3>
                            <p className="text-sm mb-6">
                                We provide cutting-edge software solutions to help your business thrive in the digital world.
                                From web and mobile development to cloud integration, we turn ideas into scalable, secure, and elegant systems.
                            </p>
                        </div>

                        {/* Quick Links Section */}
                        <div className='flex flex-col'>
                            <h3 className="text-2xl font-semibold mb-4">Quick Links</h3>
                            <ul className="space-y-3 text-sm text-gray-300">
                                <li>
                                    <a href="/services" className="hover:underline">
                                        Our Services
                                    </a>
                                </li>
                                <li>
                                    <a href="/about" className="hover:underline">
                                        About Us
                                    </a>
                                </li>
                                <li>
                                    <a href="/contact" className="hover:underline">
                                        Contact Us
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">
                                        Privacy Policy
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">
                                        Terms & Conditions
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Social Media Section */}
                        <div className='flex flex-col'>
                            <h3 className="text-2xl font-semibold mb-4">Follow Us</h3>
                            <div className="flex space-x-6 text-blue-600">
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                    <FaFacebook size={30} />
                                </a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                    <FaTwitter size={30} />
                                </a>
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                                    <FaLinkedin size={30} />
                                </a>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                    <FaInstagram size={30} />
                                </a>
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            {/* Contact Info */}
                            <div className="text-sm text-gray-300 space-y-3">
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

                                <div className="flex items-start gap-2">
                                    <FaPhoneAlt className="text-blue-600 mt-1" />
                                    <div>
                                        <p className="font-semibold">Contact Number:</p>
                                        <p>
                                            <a href="tel:+94112223344" className="hover:underline">
                                                +94 112 223 344
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Bottom */}
                    <div className="text-center mt-5 text-gray-400 text-sm border-t border-gray-700 pt-6 -mb-4">
                        <p>&copy; 2025 BitBloom Technologies. All Rights Reserved.</p>
                    </div>
                </div>
            </footer>

        </div>
    )
}
