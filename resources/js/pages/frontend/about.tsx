import FrontEndLayout from '@/layouts/frontend/frontend-layout';
import { motion } from 'framer-motion';

interface AboutProps {
    admin_mode?: boolean;
    title?: string;
}

export default function About({ admin_mode, title }: AboutProps) {
    const company_team = [
        {
            name: "Nirushan Perera",
            role: "Co-Founder & CTO",
            img: "/images/team/nirushan.jpeg",
        },
        {
            name: "Sajith Ranasinghe",
            role: "Lead Frontend Engineer",
            img: "/images/team/sajith.jpg",
        },
        {
            name: "Tharushi Weerasinghe",
            role: "UI/UX Designer",
            img: "/images/team/tharushi.jpg",
        },
        {
            name: "Roshan Silva",
            role: "Backend Developer",
            img: "/images/team/roshan.jpg",
        },
        {
            name: "Nimali Jayasinghe",
            role: "UI/UX Designer",
            img: "/images/team/Nimali.jpg",
        },
        {
            name: "Bankuka Silva",
            role: "Backend Developer",
            img: "/images/team/Bankuka.jpg",
        },
        {
            name: "Shehara Senevirathna",
            role: "UI/UX Designer",
            img: "/images/team/Shehara.jpg",
        },
        {
            name: "Niroshan Preapa",
            role: "Backend Developer",
            img: "/images/team/Niroshan.jpg",
        },
    ];

    return (
        <>
            <FrontEndLayout admin_mode={admin_mode} title={title}>
                <div className="flex min-h-screen flex-col bg-[#FDFDFC] text-[#1b1b18] dark:bg-[#0a0a0a] dark:text-[#EDEDEC]">

                    {/* Content */}
                    <motion.div
                        className="flex-1 max-w-6xl mx-auto bg-[#FDFDFC] dark:bg-[#0a0a0a] px-6 py-12 text-[#1b1b18] dark:text-[#EDEDEC]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="text-center mb-12">
                            <h1 className="text-4xl font-semibold mb-6">About BitBloom Technologies</h1>
                            <p className="text-lg text-gray-600 dark:text-[#bbb] max-w-3xl mx-auto">
                                We provide innovative software solutions to help businesses thrive in a rapidly evolving digital world. Our team specializes in custom web, mobile, and cloud-based applications that are scalable, secure, and user-centered.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                            {/* Our Mission */}
                            <motion.div
                                className="bg-[#1F2833] text-white p-8 rounded-xl shadow-lg"
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 1 }}
                            >
                                <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
                                <p className="text-lg">
                                    To empower businesses by delivering high-quality, scalable, and innovative software solutions that exceed expectations and foster long-term growth.
                                </p>
                            </motion.div>

                            {/* Our Vision */}
                            <motion.div
                                className="bg-[#1F2833] text-white p-8 rounded-xl shadow-lg"
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 1 }}
                            >
                                <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
                                <p className="text-lg align-center ">
                                    To be the global leader in software development, driving transformation through cutting-edge technologies and sustainable solutions.
                                </p>
                            </motion.div>

                            {/* Our Values */}
                            <motion.div
                                className="bg-[#1F2833] text-white p-8 rounded-xl shadow-lg"
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 1 }}
                            >
                                <h3 className="text-2xl font-semibold mb-4">Our Values</h3>
                                <ul className="list-disc pl-5 text-lg">
                                    <li>Innovation - Continuously pushing the boundaries of technology</li>
                                    <li>Integrity - Delivering results with transparency and honesty</li>
                                    <li>Collaboration - Building strong partnerships with clients and teams</li>
                                    <li>Customer-Centricity - Putting our clients’ needs at the core of everything we do</li>
                                </ul>
                            </motion.div>
                        </div>

                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-semibold mb-6">Meet Our Team</h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                                Our team is made up of skilled developers, designers, and strategists who are committed to delivering excellence. With a passion for innovation and a focus on results, we work collaboratively to solve the most challenging problems for our clients.
                            </p>
                        </div>

                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                        >
                            {company_team.slice(0, company_team.length - 2).map((member, index) => (
                                <motion.div
                                    key={index}
                                    className="text-center p-6 bg-[#1F2833] text-white rounded-xl shadow-lg"
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 1 }}
                                >
                                    <img src={member.img} alt={member.name} className="w-24 h-24 mx-auto rounded-full mb-4 object-cover" />
                                    <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                                    <p className="text-sm">{member.role}</p>
                                </motion.div>
                            ))}

                            {/* Last two members */}
                            <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex justify-center gap-8">
                                {company_team.slice(company_team.length - 2).map((member, index) => (
                                    <motion.div
                                        key={index}
                                        className="text-center p-6 bg-[#1F2833] text-white rounded-xl shadow-lg w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.33%-0.5rem)]"
                                        initial={{ y: 50, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 1 }}
                                    >
                                        <img src={member.img} alt={member.name} className="w-24 h-24 mx-auto rounded-full mb-4 object-cover" />
                                        <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                                        <p className="text-sm">{member.role}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            className="mt-16 text-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                        >
                            <h2 className="text-4xl font-semibold mb-6">Why Choose Us?</h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                                With over 10 years of experience, we combine technical expertise with a customer-centric approach to deliver cutting-edge solutions that drive success. Our team is dedicated to excellence, and we are here to help you transform your business through technology.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </FrontEndLayout>
        </>
    );
}
