import { useEffect, useState } from 'react';
import { motion } from "framer-motion";

export default function OurTeamSection() {

    const [teamMembers, setTeamMembers] = useState([]);
    useEffect(() => {
        loadHeaderData();
    }, []);

    const loadHeaderData = async () => {
        try {
            fetch('/dashboard/customize-home/team-members/getTeamMembers')
                .then((res) => res.json())
                .then((data) => setTeamMembers(data));
        } catch (error) {
            console.error(error);
        }
    };


    return (

        <>
            {/* Our Team Section */}
            <div className="pt-20 pb-10 px-6 text-center bg-[#0B0C10] border-b border-gray-800 border">
                <h2 className="text-4xl font-extrabold text-white mb-4">Meet Our Team</h2>
                <p className="text-blue-400 text-lg mb-16 max-w-3xl mx-auto">
                    Our dedicated professionals bring passion, expertise, and innovation to every project.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
                    {teamMembers.map((member: any, index: number) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center bg-[#1F2833] rounded-xl p-6 shadow-lg hover:shadow-blue-600/30 transition-shadow duration-300"
                        >
                            <img
                                src={member.profilePicture}
                                alt={member.fullName}
                                className="w-24 h-24 object-cover rounded-full border-4 border-blue-600 mb-4"
                            />
                            <h4 className="text-white text-lg font-semibold">{member.fullName}</h4>
                            <p className="text-sm text-gray-400">{member.role}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </>
    )
}
