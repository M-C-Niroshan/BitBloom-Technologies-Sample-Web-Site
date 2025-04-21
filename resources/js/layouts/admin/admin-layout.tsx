import { type SharedData } from '@/types';
import { ReactNode, useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { useAdminContext } from '@/context/admin/Admin-context';
import { Toaster } from 'react-hot-toast';
import LoadingSpinner from '@/components/LoadingSpinner';

import {
    LayoutDashboard,
    Home,
    Briefcase,
    Info,
    Phone,
    ChevronDown,
    ChevronUp
} from 'lucide-react';

import { GrUserAdmin } from "react-icons/gr";

interface AdminLayoutProps {
    children: ReactNode;
    title?: string;
    setActiveSection?: (section: string) => void;
    activeSection?: string;
    isloading?: boolean;
}

export default function AdminLayout({ children, title, activeSection, setActiveSection, isloading }: AdminLayoutProps) {
    const { openMenus, toggleMenu, activetab, toggleTab } = useAdminContext();

    const isActive = (href: string) =>
        window.location.pathname === href
            ? 'flex items-center space-x-2 bg-gray-900 p-2 rounded border border-gray-500'
            : 'flex items-center space-x-2 hover:bg-gray-700 p-2 rounded border border-gray-500';

    const { auth } = usePage<SharedData>().props; // Get the current route from usePage

    const handleSetActiveSection = setActiveSection || (() => { });

    const handleLinkClick = (tab: string, href: string) => {
        toggleTab(tab);  // Set the active tab
        window.location.href = href;  // Redirect to the specified link
    };

    return (
        <>
            <Head title="BitBloom Technologies - Admin" />
            <div className="flex h-screen bg-background text-foreground">
                {/* Sidebar */}
                <aside className="w-64 bg-[#1f2937] text-white flex flex-col ">
                    <div className="text-2xl font-bold p-6 border-b border-gray-700 py-4">
                        <div className="flex items-center space-x-3 justify-center pr-3 ">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="32" height="32" >
                                <g>
                                    <circle cx="50" cy="30" r="15" fill="#E74C3C" />
                                    <circle cx="65" cy="40" r="15" fill="#F39C12" />
                                    <circle cx="35" cy="40" r="15" fill="#1ABC9C" />
                                    <circle cx="50" cy="50" r="15" fill="#9B59B6" />
                                </g>
                            </svg>
                            <div className="text-xs font-bold">BitBloom Technologies</div>
                        </div>
                    </div>
                    <nav className="flex-1 px-4 py-6 space-y-2 custom-scrollbar overflow-auto">
                        {/* Dashboard Link */}
                        <Link
                            href="/dashboard"
                            onClick={(e) => {
                                e.preventDefault();  // Prevent default link behavior
                                handleLinkClick('dashboard', '/dashboard');  // Set active tab and redirect
                            }}
                            className={`flex items-center space-x-2 p-2 rounded  ${activetab === 'dashboard' ? 'bg-gray-900 border border-gray-500' : 'hover:bg-gray-700'}`}
                        >
                            <LayoutDashboard size={20} />
                            <span>Preview</span>
                        </Link>

                        {/* Home Page */}
                        <div>
                            <button
                                onClick={() => {
                                    toggleMenu('home');
                                    toggleTab('home');
                                }}
                                className={`w-full flex items-center justify-between p-2 rounded ${activetab === 'home' ? 'bg-gray-900 border border-gray-500' : 'hover:bg-gray-700'}`}
                            >
                                <div className="flex items-center space-x-2">
                                    <Home size={20} />
                                    <span>Home Page</span>
                                </div>
                                {openMenus.home ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </button>

                            {openMenus.home && (
                                <div className="ml-6 mt-2 space-y-2 text-sm ">
                                    <Link href="/dashboard/customize-home/slider" className={isActive('/dashboard/customize-home/slider')}>
                                        <span>Slider</span>
                                    </Link>
                                    <Link href="/dashboard/customize-home/main-header" className={isActive('/dashboard/customize-home/main-header')}>
                                        <span>Main Header </span>
                                    </Link>
                                    <Link href="/dashboard/customize-home/team-members" className={isActive('/dashboard/customize-home/team-members')}>
                                        <span>Team Members</span>
                                    </Link>
                                    <Link href="/dashboard/customize-home/key-services" className={isActive('/dashboard/customize-home/key-services')}>
                                        <span>Key Services</span>
                                    </Link>
                                    <Link href="/dashboard/customize-home/solution-area" className={isActive('/dashboard/customize-home/solution-area')}>
                                        <span>Solution Areas</span>
                                    </Link>
                                    <Link href="/dashboard/customize-home/technologies" className={isActive('/dashboard/customize-home/technologies')}>
                                        <span>Technologies</span>
                                    </Link>
                                    <Link href="/dashboard/customize-home/feedbacks" className={isActive('/dashboard/customize-home/feedbacks')}>
                                        <span>Feedbacks</span>
                                    </Link>
                                    <Link href="/dashboard/customize-home/footer-content" className={isActive('/dashboard/customize-home/footer-content')}>
                                        <span>Footer Content</span>
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Services Page */}
                        <div>
                            <button
                                onClick={() => {
                                    toggleMenu('services');
                                    toggleTab('services'); // Set active tab to "services"
                                }}
                                className={`w-full flex items-center justify-between p-2 rounded ${activetab === 'services' ? 'bg-gray-900 border border-gray-500' : 'hover:bg-gray-700'}`}
                            >
                                <div className="flex items-center space-x-2">
                                    <Briefcase size={20} />
                                    <span>Services Page</span>
                                </div>
                                {openMenus.services ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </button>

                            {openMenus.services && (
                                <div className="ml-6 mt-2 space-y-2 text-sm ">
                                    <Link href="/dashboard/customize-services/main-header" className={isActive('/dashboard/customize-services/main-header')}>
                                        <span>Main Header</span>
                                    </Link>
                                    <Link href="/dashboard/customize-services/service-card" className={isActive('/dashboard/customize-services/service-card')}>
                                        <span>Service card</span>
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* About Us Page */}
                        <div>
                            <button
                                onClick={() => {
                                    toggleMenu('about');
                                    toggleTab('about'); // Set active tab to "about"
                                }}
                                className={`w-full flex items-center justify-between p-2 rounded ${activetab === 'about' ? 'bg-gray-900 border border-gray-500' : 'hover:bg-gray-700'}`}
                            >
                                <div className="flex items-center space-x-2">
                                    <Info size={20} />
                                    <span>About Us Page</span>
                                </div>
                                {openMenus.about ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </button>
                            {openMenus.about && (
                                <div className="ml-6 mt-2 space-y-2 text-sm ">
                                    <Link href="/dashboard/customize-about/main-header" className={isActive('/dashboard/customize-about/main-header')}>
                                        <span>Main Header</span>
                                    </Link>
                                    <Link href="/dashboard/customize-about/mission-vision" className={isActive('/dashboard/customize-about/mission-vision')}>
                                        <span>Mission And Vision</span>
                                    </Link>
                                    <Link href="/dashboard/customize-about/middle-header" className={isActive('/dashboard/customize-about/middle-header')}>
                                        <span>middle Header</span>
                                    </Link>
                                    <Link href="/dashboard/customize-about/bottom-header" className={isActive('/dashboard/customize-about/bottom-header')}>
                                        <span>Bottom Header</span>
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Contact Us Page */}
                        <div>
                            <button
                                onClick={() => {
                                    toggleMenu('contact');
                                    toggleTab('contact'); // Set active tab to "contact"
                                }}
                                className={`w-full flex items-center justify-between p-2 rounded ${activetab === 'contact' ? 'bg-gray-900 border border-gray-500' : 'hover:bg-gray-700'}`}
                            >
                                <div className="flex items-center space-x-2">
                                    <Phone size={20} />
                                    <span>Contact Us Page</span>
                                </div>
                                {openMenus.contact ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </button>
                            {openMenus.contact && (
                                <div className="ml-6 mt-2 space-y-2 text-sm ">
                                    <Link href="/dashboard/customize-contact-us/main-content" className={isActive('/dashboard/customize-contact-us/main-content')}>
                                        <span>View Messages</span>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </nav>
                    <div className="p-4 border-t border-gray-700 text-sm">
                        © 2025 BitBloom Technologies
                    </div>
                </aside>

                {/* Main Section */}
                <div className="flex-1 flex flex-col">
                    <header className="flex items-center justify-between px-6 py-4 border-b dark:border-gray-800 bg-white dark:bg-[#111827] ">
                        <div className="relative w-96 -mt-10">
                            <Toaster
                                position="top-left"
                                containerStyle={{ position: 'static' }}
                                toastOptions={{
                                    duration: 3000,
                                    style: {
                                        background: '#fff',
                                        border: '1px solid #e2e8f0',
                                        padding: '0px', // Start with no padding to avoid height jump
                                        color: '#111',
                                        borderRadius: '0.5rem',
                                        width: '0px',
                                        height: '40px', // Fixed height to avoid wrapping
                                        overflow: 'hidden',
                                        animation: 'growToast 0.4s ease-out forwards',
                                        whiteSpace: 'nowrap', // Prevent wrapping of toast text
                                    },
                                }}
                            />
                        </div>
                        {title ? (<h1 className="text-xl font-semibold">{title}</h1>) : (<></>)}
                        <div className="flex gap-4">
                            {window.location.pathname === '/dashboard' && (
                                <nav className="space-x-4 text-sm hidden lg:flex">
                                    <button
                                        onClick={() => handleSetActiveSection('home')}
                                        className={`px-3 py-1.5 rounded ${activeSection === 'home' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                                    >
                                        Home
                                    </button>
                                    <button
                                        onClick={() => handleSetActiveSection('services')}
                                        className={`px-3 py-1.5 rounded ${activeSection === 'services' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                                    >
                                        Services
                                    </button>
                                    <button
                                        onClick={() => handleSetActiveSection('about')}
                                        className={`px-3 py-1.5 rounded ${activeSection === 'about' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                                    >
                                        About Us
                                    </button>
                                    <button
                                        onClick={() => handleSetActiveSection('contact')}
                                        className={`px-3 py-1.5 rounded ${activeSection === 'contact' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                                    >
                                        Contact
                                    </button>

                                </nav>
                            )}
                        </div>

                        {/* User info and logout link on the right */}
                        <div className="flex mr-3 items-center gap-4">
                            <span className="flex items-center gap-2 text-sm font-medium text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 px-4 py-1.5 rounded-full">
                                <GrUserAdmin className="text-lg" />
                                {auth.user.name}
                            </span>
                            <Link
                                href="/logout"
                                method="post"
                                as="button"
                                className="text-sm text-white bg-red-700 hover:bg-red-800 transition-colors px-4 py-1.5 rounded-full"
                            >
                                Logout
                            </Link>
                        </div>

                    </header>

                    <main className="flex-1 p-6 overflow-y-auto overflow-x-hidden">{(isloading ? (<LoadingSpinner />) : (<>{children}</>))}</main>
                </div>

            </div >
        </>
    );
}
