import { useEffect, useState } from 'react';
import { motion } from "framer-motion";

export default function TestimonialsSection() {
    const [feedbacks, setFeedbacks] = useState<Array<{
        id: number;
        fullName: string;
        role: string;
        companyName: string;
        caption: string;
        isShow: boolean;
        src: string;
    }>>([]);

    useEffect(() => {
        getFeedbacks();
    }, []);

    const getFeedbacks = async () => {
        try {

            const res = await fetch('/dashboard/customize-home/feedbacks/getFeedbacksinfo');
            const data = await res.json();
            setFeedbacks(data);
        }
        catch (error) {

            console.error(error);
        }

    };
    return (
        <>
            {/* Testimonials Section */}
            <div className="mt-10 px-6 py-10 bg-[#0B0C10] text-white text-center border">
                <h3 className="text-4xl font-bold mb-10">What Our Clients Say</h3>
                <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
                    {feedbacks.map((client, index) => (
                        <motion.div
                            key={index}
                            className="bg-[#1F2833] p-6 rounded-xl shadow-md text-left"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <img src={client.src} alt={client.fullName} className="w-12 h-12 rounded-full object-cover" />
                                <div>
                                    <p className="font-semibold">{client.fullName}</p>
                                    <p className="text-sm text-gray-400">{client.role}</p>
                                </div>
                            </div>
                            <p className="text-gray-300 italic">“{client.caption}”</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </>
    )
}
