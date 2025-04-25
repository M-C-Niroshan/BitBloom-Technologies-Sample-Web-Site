import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function MeetOurTeam() {

    interface TeamMember {
        fullName: string;
        role: string;
        profilePicture: string;
    }

    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
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
        <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            {teamMembers.slice(0, teamMembers.length - 2).map((member, index) => (
                <motion.div
                    key={index}
                    className="text-center p-6 bg-[#1F2833] text-white rounded-xl shadow-lg"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <img src={member.profilePicture} alt={member.fullName} className="w-24 h-24 mx-auto rounded-full mb-4 object-cover" />
                    <h3 className="text-xl font-semibold mb-2">{member.fullName}</h3>
                    <p className="text-sm">{member.role}</p>
                </motion.div>
            ))}

            {/* Last two members */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex justify-center gap-8">
                {teamMembers.slice(teamMembers.length - 2).map((member, index) => (
                    <motion.div
                        key={index}
                        className="text-center p-6 bg-[#1F2833] text-white rounded-xl shadow-lg w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.33%-0.5rem)]"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <img src={member.profilePicture} alt={member.fullName} className="w-24 h-24 mx-auto rounded-full mb-4 object-cover" />
                        <h3 className="text-xl font-semibold mb-2">{member.fullName}</h3>
                        <p className="text-sm">{member.role}</p>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}
