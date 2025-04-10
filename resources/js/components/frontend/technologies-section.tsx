import { motion } from "framer-motion";
import { FaReact } from "react-icons/fa";
import { FaNode } from "react-icons/fa";
import { FaLaravel } from "react-icons/fa";
import { FaFlutter } from "react-icons/fa6";
import { FaDocker } from "react-icons/fa";
import { FaAws } from "react-icons/fa";
import { IoLogoFirebase } from "react-icons/io5";
import { SiMysql } from "react-icons/si";

export default function TechnologiesSection() {
        // Icons Array
        const techIcons = [
            { icon: <FaReact size={55} className="text-blue-500" />, label: "React" },
            { icon: <FaNode size={55} className="text-green-600" />, label: "Node.js" },
            { icon: <FaLaravel size={55} className="text-red-500" />, label: "Laravel" },
            { icon: <FaFlutter size={55} className="text-sky-400" />, label: "Flutter" },
            { icon: <FaDocker size={55} className="text-blue-700" />, label: "Docker" },
            { icon: <FaAws size={55} className="text-orange-500" />, label: "AWS" },
            { icon: <IoLogoFirebase size={55} className="text-yellow-500" />, label: "Firebase" },
            { icon: <SiMysql size={55} className="text-blue-600" />, label: "MySQL" },
        ];
    return (
        <>
            {/* Technology Stack Section */}
            <div className="py-20 pt-10 px-6 text-center mt-5 bg-[#0B0C10] border">
                <h2 className="text-4xl font-semibold mb-10 text-white">Technologies We Work With</h2>

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-8 gap-10 justify-center items-center">
                    {techIcons.map((tech, index) => (
                        <motion.div
                            key={index}
                            className="flex flex-col items-center justify-center h-full"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            viewport={{ once: true }}
                        >
                            <div className="group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                                {tech.icon}
                            </div>
                            <span className="mt-2 text-sm font-medium text-gray-300 group-hover:text-blue-600">
                                {tech.label}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </>
    )
}
