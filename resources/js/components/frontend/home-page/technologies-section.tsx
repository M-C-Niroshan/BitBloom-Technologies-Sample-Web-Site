import { useEffect, useState } from 'react';
import { motion } from "framer-motion";

export default function TechnologiesSection() {
    const [technologies, setTechnologies] = useState<any[]>([]);

    useEffect(() => {
        loadTechData();
    }, []);

    const loadTechData = async () => {
        try {
            const res = await fetch('/dashboard/customize-home/solution-area/getTechnologiesinfo');
            const data = await res.json();
            setTechnologies(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            {/* Technology Stack Section */}
            <div className="py-20 pt-10 px-6 text-center mt-5 bg-[#0B0C10] border">
                <h2 className="text-4xl font-semibold mb-10 text-white">Technologies We Work With</h2>

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-8 gap-10 justify-center items-center">
                    {technologies.map((tech, index) => (
                        <motion.div
                            key={index}
                            className="flex flex-col items-center justify-center h-full"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            viewport={{ once: true }}
                        >
                            <div className="group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                            <img src={tech.src} className="w-16 h-16 object-contain" />
                            </div>
                            <span className="mt-2 text-sm font-medium text-gray-300 group-hover:text-blue-600">
                                {tech.caption}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </>
    )
}
