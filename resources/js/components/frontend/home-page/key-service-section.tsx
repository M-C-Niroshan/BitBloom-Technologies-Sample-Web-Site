import React, { useEffect, useState } from 'react';
import { LuSquareArrowDownRight } from "react-icons/lu";
import { motion } from "framer-motion";
import { MdFactory } from "react-icons/md";
import { FaShippingFast } from "react-icons/fa";
import { FaMobileAlt } from "react-icons/fa";
import { FaPiggyBank } from "react-icons/fa";
import { MdDevices } from "react-icons/md";
import { MdCheckCircle } from "react-icons/md";

export default function KeyServiceSection() {
    const [keyServices, setKeyServices] = useState<{ id: number; mainTitle: string; captions: { caption: string }[] }[]>([]);

    useEffect(() => {
        loadHeaderData();
    }, []);

    const loadHeaderData = async () => {
        try {
            const res = await fetch('/dashboard/customize-home/key-services/getKeyServicesinfo');
            const data = await res.json();
            setKeyServices(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            {/* Key Services */}
            <div className="text-center pt-10 pb-10 border mt-5 px-6 bg-[#0B0C10]">
                <h2 className="text-4xl font-semibold mb-6 text-white">Our Key Services</h2>
                <p className="text-blue-400 text-lg mb-16 max-w-3xl mx-auto">
                    Every great product starts with a solid process. Here's how we partner with you — from the first chat to long-term support.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-white -mt-8">
                    {keyServices.map((service: any) => (
                        <div className="flex-col h-full bg-[#1F2833] rounded-xl shadow-lg p-6 border">
                            <LuSquareArrowDownRight size={35} className='text-white mb-3' />
                            <p className="font-semibold text-2xl mb-2 -mt-10">{service.mainTitle}</p>
                            <div className='border border-blue-600 w-3/4 mx-auto mb-4'></div>
                            <ul className="text-sm space-y-2 text-left text-gray-300">
                                {service.captions.map((caption: any, idx: number) => (
                                    <li key={idx} className="flex items-start gap-2"><MdCheckCircle className="text-blue-500" /> <p className='-mt-1'>{caption.caption}</p></li>
                                ))}
                            </ul>
                        </div>
                    ))}
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
