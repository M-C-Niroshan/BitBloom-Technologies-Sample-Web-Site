import { Head } from '@inertiajs/react';
import { Header } from '@/components/main-header';
import { MainFooter } from '@/components/main-footer';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Contact() {
    return (
        <>
            <div className="flex min-h-screen flex-col bg-[#FDFDFC] text-[#1b1b18] dark:bg-[#0a0a0a] dark:text-[#EDEDEC]">
                {/* Navbar */}
                <Header />

                {/* Content */}
                <Head title="Contact Us" />
                <div className="flex-1 max-w-6xl mx-auto bg-[#FDFDFC] dark:bg-[#0a0a0a] px-6 py-12 text-[#1b1b18] dark:text-[#EDEDEC]">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Left Side: Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7 }}
                        >
                            <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
                            <p className="mb-6 text-lg dark:text-[#bbb]">
                                We’d love to hear from you! Reach out with questions, ideas, or just to say hello. Here’s how you can get in touch with us:
                            </p>

                            <div className="space-y-6 text-md pt-3">
                                <div className="flex items-center gap-4 ">
                                    <FaEnvelope className="text-blue-600" />
                                    <div>
                                        <p className="font-semibold">Email:</p>
                                        <a href="mailto:contact@bitbloom.tech" className="text-blue-600 hover:underline">contact@bitbloom.tech</a>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-4">
                                    <FaPhoneAlt className="text-blue-600" />
                                    <div>
                                        <p className="font-semibold">Phone:</p>
                                        <p>+94 (112) 223-344</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <FaMapMarkerAlt className="text-blue-600" />
                                    <div>
                                        <p className="font-semibold">Address:</p>
                                        <p>BitBloom Technologies, 225/SK, Colombo 12, Sri Lanka</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Side: Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7 }}
                            className="bg-[#F5F7FA] p-6 rounded-xl shadow-lg text-black"
                        >
                            <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
                            <p className="mb-6 text-sm">Fill out the form below and we will get back to you shortly.</p>
                            
                            <form className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium">Full Name</label>
                                    <input type="text" id="name" name="name" placeholder="Enter your full name" className="w-full p-3 mt-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all" />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium">Email Address</label>
                                    <input type="email" id="email" name="email" placeholder="Enter your email address" className="w-full p-3 mt-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all" />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium">Message</label>
                                    <textarea id="message" name="message" rows={5} placeholder="Write your message..." className="w-full p-3 mt-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"></textarea>
                                </div>

                                <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition transform hover:scale-105 duration-200">Send Message</button>
                            </form>
                        </motion.div>
                    </div>
                </div>

                {/* Footer */}
                <MainFooter />
            </div>
        </>
    );
}
