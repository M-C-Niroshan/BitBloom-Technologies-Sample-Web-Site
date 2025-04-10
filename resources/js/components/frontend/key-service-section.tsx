import { LuSquareArrowDownRight } from "react-icons/lu";
import { motion } from "framer-motion";
import { MdFactory } from "react-icons/md";
import { FaShippingFast } from "react-icons/fa";
import { FaMobileAlt } from "react-icons/fa";
import { FaPiggyBank } from "react-icons/fa";
import { MdDevices } from "react-icons/md";
import { MdCheckCircle } from "react-icons/md";
import { FaArrowUp } from 'react-icons/fa';

export default function KeyServiceSection() {
    return (
        <>
            {/* Key Services */}
            <div className="text-center pt-10 pb-10 border mt-5 px-6 bg-[#0B0C10]">
                <h2 className="text-4xl font-semibold mb-6 text-white">Our Key Services</h2>
                <p className="text-blue-400 text-lg mb-16 max-w-3xl mx-auto">
                    Every great product starts with a solid process. Here's how we partner with you — from the first chat to long-term support.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-white -mt-8">
                    {/* Web Development */}
                    <motion.div
                        className="flex-col h-full p-2 shadow-md rounded-lg"
                        initial={{ opacity: 0, x: +200 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex-col h-full bg-[#1F2833] rounded-xl shadow-lg p-6 ">
                            <LuSquareArrowDownRight size={35} className='text-white mb-3' />
                            <p className="font-semibold text-2xl mb-2 -mt-10">Web Development</p>
                            <div className='border border-blue-600 w-3/4 mx-auto mb-4 '></div>
                            <ul className="text-sm space-y-2 text-left text-gray-300">
                                <li className="flex items-start gap-2"><MdCheckCircle className="text-blue-500" /> Responsive & SEO-optimized sites</li>
                                <li className="flex items-start gap-2"><MdCheckCircle className="text-blue-500" /> Custom CMS & admin panels</li>
                                <li className="flex items-start gap-2"><MdCheckCircle className="text-blue-500" /> E-commerce & payment integration</li>
                                <li className="flex items-start gap-2"><MdCheckCircle className="text-blue-500" /> RESTful APIs & third-party integration</li>
                                <li className="flex items-start gap-2"><MdCheckCircle className="text-blue-500" /> Fast loading & high-performance builds</li>
                                <li className="flex items-start gap-2"><MdCheckCircle className="text-blue-500" /> Cross-browser & device compatibility</li>
                                <li className="flex items-start gap-2"><MdCheckCircle className="text-blue-500" /> Ongoing support & feature enhancements</li>
                            </ul>
                        </div>
                    </motion.div>

                    {/* Mobile App Development */}
                    <motion.div
                        className="flex-col h-full p-2 shadow-md rounded-lg"
                        initial={{ opacity: 0, y: 0 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex-col h-full bg-[#1F2833] rounded-xl shadow-lg p-6 border">
                            <LuSquareArrowDownRight size={35} className='text-white mb-3' />
                            <p className="font-semibold text-2xl mb-2 -mt-10">Mobile App Development</p>
                            <div className='border border-blue-600 w-3/4 mx-auto mb-4'></div>
                            <ul className="text-sm space-y-2 text-left text-gray-300">
                                <li className="flex items-start gap-2"><MdCheckCircle className="text-blue-500" /> Scalable infrastructure on AWS & GCP</li>
                                <li className="flex items-start gap-2"><MdCheckCircle className="text-blue-500" /> Dockerized deployment pipelines</li>
                                <li className="flex items-start gap-2"><MdCheckCircle className="text-blue-500" /> CI/CD setup for rapid delivery</li>
                                <li className="flex items-start gap-2"><MdCheckCircle className="text-blue-500" /> Automated backups & monitoring</li>
                                <li className="flex items-start gap-2"><MdCheckCircle className="text-blue-500" /> High availability & disaster recovery</li>
                                <li className="flex items-start gap-2"><MdCheckCircle className="text-blue-500" /> API management & microservices support</li>
                                <li className="flex items-start gap-2"><MdCheckCircle className="text-blue-500" /> Security best practices & compliance</li>
                            </ul>
                        </div>
                    </motion.div>

                    {/* Cloud Solutions */}
                    <motion.div
                        className="flex-col h-full p-2 shadow-md rounded-lg"
                        initial={{ opacity: 0, x: -200 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex-col h-full bg-[#1F2833] rounded-xl shadow-lg p-6 border">
                            <LuSquareArrowDownRight size={35} className='text-white mb-3' />
                            <p className="font-semibold text-2xl mb-2 -mt-10">Cloud Solutions</p>
                            <div className='border border-blue-600 w-3/4 mx-auto mb-4'></div>
                            <ul className="text-sm space-y-2 text-left text-gray-300">
                                <li className="flex items-start gap-2"><MdCheckCircle className="text-blue-500" /> Scalable infrastructure on AWS & GCP</li>
                                <li className="flex items-start gap-2"><MdCheckCircle className="text-blue-500" /> Dockerized deployment pipelines</li>
                                <li className="flex items-start gap-2"><MdCheckCircle className="text-blue-500" /> CI/CD setup for rapid delivery</li>
                                <li className="flex items-start gap-2"><MdCheckCircle className="text-blue-500" /> Automated backups & monitoring</li>
                                <li className="flex items-start gap-2"><MdCheckCircle className="text-blue-500" /> High availability & disaster recovery</li>
                                <li className="flex items-start gap-2"><MdCheckCircle className="text-blue-500" /> API management & microservices support</li>
                                <li className="flex items-start gap-2"><MdCheckCircle className="text-blue-500" /> Security best practices & compliance</li>
                            </ul>
                        </div>
                    </motion.div>
                </div>
                {/* Solution Areas */}
                <motion.div
                    className="flex-col h-full p-2 shadow-md rounded-lg"
                    initial={{ opacity: 0, x: 0 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    viewport={{ once: true }}
                >
                    <div className="flex-col h-full border rounded-xl shadow-lg p-6 bg-[#1F2833]">
                        <div className="text-center mb-6">
                            <h4 className="text-4xl font-semibold mb-6 text-white">Solution Areas</h4>
                        </div>

                        {/* Solution Area Icons */}
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                            {/* Manufacturing */}
                            <div className="flex-col p-4">
                                <MdFactory size={40} className="text-blue-500 mb-4 mx-auto" />
                                <p className="text-white text-lg">Manufacturing</p>
                            </div>

                            {/* Logistics */}
                            <div className="flex-col p-4">
                                <FaShippingFast size={40} className="text-blue-500 mb-4 mx-auto" />
                                <p className="text-white text-lg">Logistics</p>
                            </div>

                            {/* Digital and Telecommunications */}
                            <div className="flex-col p-4">
                                <FaMobileAlt size={40} className="text-blue-500 mb-4 mx-auto" />
                                <p className="text-white text-lg">Digital & Telecommunications</p>
                            </div>

                            {/* Finance and Banking */}
                            <div className="flex-col p-4">
                                <FaPiggyBank size={40} className="text-blue-500 mb-4 mx-auto" />
                                <p className="text-white text-lg">Finance & Banking</p>
                            </div>

                            {/* IOT */}
                            <div className="flex-col p-4">
                                <MdDevices size={40} className="text-blue-500 mb-4 mx-auto" />
                                <p className="text-white text-lg">IoT</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </>
    )
}
