import FrontEndLayout from '@/layouts/frontend/frontend-layout';
import { motion } from 'framer-motion';
import MainHeader from '../../components/frontend/about-page/main-header';
import MiddleHeader from '../../components/frontend/about-page/middle-header';
import BottomHeader from '../../components/frontend/about-page/bottom-header';
import MissionVission from '../../components/frontend/about-page/mission-vission';
import MeetOurTeam from '../../components/frontend/about-page/meet-our-team';

interface AboutProps {
    admin_mode?: boolean;
    title?: string;
}

export default function About({ admin_mode, title }: AboutProps) {
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
                        {/* Main Header Content */}
                        <MainHeader />

                        {/* Mission/Vision Content */}
                        <MissionVission />

                        {/* Middle Header Content */}
                        <MiddleHeader />

                        {/* Meet Our Team Content */}
                        <MeetOurTeam />

                        {/* Bottom Header Content */}
                        <BottomHeader />

                    </motion.div>
                </div>
            </FrontEndLayout>
        </>
    );
}
