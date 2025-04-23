import FrontEndLayout from '@/layouts/frontend/frontend-layout';
import { MdCode, MdDesignServices, MdCloud, MdBusiness, MdCheckCircle } from 'react-icons/md'; // Example icons
import { motion } from 'framer-motion'; // Importing motion from framer-motion
import MainHeader from '../../components/frontend/service-page/main-header';
import ServiceCards from '../../components/frontend/service-page/service-cards';

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
                        {/* Main-Header */}
                        <MainHeader />
                        {/* Services Grid */}
                        <ServiceCards />
                    </div>
                </div>
            </FrontEndLayout>
        </>
    );
}
