import FrontEndLayout from '@/layouts/frontend/frontend-layout';
import { MdCode, MdDesignServices, MdCloud, MdBusiness, MdCheckCircle } from 'react-icons/md'; // Example icons
import { motion } from 'framer-motion'; // Importing motion from framer-motion

interface ServiceProps {
    admin_mode?: boolean;
    title?: string;
}

export default function Services({ admin_mode, title }: ServiceProps) {
    return (
        <>
            <FrontEndLayout admin_mode={admin_mode} title={title}>

                <div className="flex min-h-screen flex-col bg-[#FDFDFC] text-[#1b1b18] dark:bg-[#0a0a0a] dark:text-[#EDEDEC]">

                    <div className="flex-1 max-w-6xl mx-auto text-center px-6 py-12 bg-[#FDFDFC] dark:bg-[#0a0a0a]">
                        <h1 className="text-4xl font-extrabold mb-12 text-[#1b1b18] dark:text-[#EDEDEC]">Our Professional Services</h1>
                        <p className="text-lg mb-16 text-[#555] dark:text-[#bbb] max-w-2xl mx-auto">
                            We offer a range of solutions designed to help your business grow. Each of our services is built with a focus on efficiency, performance, and user experience.
                        </p>

                        {/* Services Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                            {/* Service Card with Animation */}
                            <motion.div
                                className="bg-[#1F2833] text-white rounded-lg shadow-lg p-8 hover:scale-105 transition-transform duration-300"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: 'easeOut' }}
                            >
                                <div className="mb-4 text-blue-500">
                                    <MdCode size={40} />
                                </div>
                                <h2 className="text-2xl font-semibold mb-4">Custom Software Development</h2>
                                <p className="text-sm mb-4">Tailor-made web and mobile applications built for performance, usability, and scale. Our solutions ensure that your business processes are streamlined and efficient.</p>
                                <ul className="text-sm space-y-2 text-left text-gray-300">
                                    <li className="flex items-start gap-2"><MdCheckCircle className="text-blue-500" /> Performance-driven development</li>
                                    <li className="flex items-start gap-2"><MdCheckCircle className="text-blue-500" /> Scalable architecture</li>
                                    <li className="flex items-start gap-2"><MdCheckCircle className="text-blue-500" /> Cross-platform compatibility</li>
                                </ul>
                            </motion.div>

                            <motion.div
                                className="bg-[#1F2833] text-white rounded-lg shadow-lg p-8 hover:scale-105 transition-transform duration-300"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
                            >
                                <div className="mb-4 text-blue-500">
                                    <MdDesignServices size={40} />
                                </div>
                                <h2 className="text-2xl font-semibold mb-4">UI/UX Design</h2>
                                <p className="text-sm mb-4">We create visually engaging and user-centered designs that focus on delivering an intuitive user experience across all devices.</p>
                                <ul className="text-sm space-y-2 text-left text-gray-300">
                                    <li className="flex items-start gap-2"><MdCheckCircle className="text-blue-500" /> User-centered design</li>
                                    <li className="flex items-start gap-2"><MdCheckCircle className="text-blue-500" /> Responsive designs</li>
                                    <li className="flex items-start gap-2"><MdCheckCircle className="text-blue-500" /> Interactive prototypes</li>
                                </ul>
                            </motion.div>

                            <motion.div
                                className="bg-[#1F2833] text-white rounded-lg shadow-lg p-8 hover:scale-105 transition-transform duration-300"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                            >
                                <div className="mb-4 text-blue-500">
                                    <MdCloud size={40} />
                                </div>
                                <h2 className="text-2xl font-semibold mb-4">Cloud & DevOps</h2>
                                <p className="text-sm mb-4">We help businesses modernize their infrastructure with cloud solutions that drive scalability and efficiency. We also offer DevOps practices that ensure seamless development cycles.</p>
                                <ul className="text-sm space-y-2 text-left text-gray-300">
                                    <li className="flex items-start gap-2"><MdCheckCircle className="text-blue-500" /> Scalable cloud infrastructure</li>
                                    <li className="flex items-start gap-2"><MdCheckCircle className="text-blue-500" /> Continuous Integration & Deployment</li>
                                    <li className="flex items-start gap-2"><MdCheckCircle className="text-blue-500" /> Automation for efficiency</li>
                                </ul>
                            </motion.div>

                            <motion.div
                                className="bg-[#1F2833] text-white rounded-lg shadow-lg p-8 hover:scale-105 transition-transform duration-300"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                            >
                                <div className="mb-4 text-blue-500">
                                    <MdBusiness size={40} />
                                </div>
                                <h2 className="text-2xl font-semibold mb-4">Consulting & Strategy</h2>
                                <p className="text-sm mb-4">We provide business and technology consulting to help you align your technology strategy with your organizational goals.</p>
                                <ul className="text-sm space-y-2 text-left text-gray-300">
                                    <li className="flex items-start gap-2"><MdCheckCircle className="text-blue-500" /> Business technology alignment</li>
                                    <li className="flex items-start gap-2"><MdCheckCircle className="text-blue-500" /> Maximizing ROI</li>
                                    <li className="flex items-start gap-2"><MdCheckCircle className="text-blue-500" /> Risk minimization strategies</li>
                                </ul>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </FrontEndLayout>
        </>
    );
}
