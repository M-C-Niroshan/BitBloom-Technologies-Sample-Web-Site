import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';

interface HeaderProps {
    admin_mode?: boolean;
}

export function Header({ admin_mode = false }: HeaderProps) {
    const { auth } = usePage<SharedData>().props; // Get the current route from usePage
    const [isMenuOpen, setIsMenuOpen] = useState(false); // To control the mobile menu toggle

    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const userMenuRef = useRef<HTMLDivElement>(null);

    // Helper function to check if the current route matches the given link
    const isActive = (href: string) => window.location.pathname === href ? 'text-blue-500 font-bold' : ' dark:hover:bg-gray-200 hover:text-black transition-colors duration-300 ease-in-out rounded-md';

    // Close user menu on outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setIsUserMenuOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    return (
        <>
            {/* Navbar */}
            <header className="w-full border-b border-gray-200 dark:border-gray-700 px-6 py-2 flex justify-between items-center">
                {/* Logo Section */}
                <div className="flex items-center space-x-3 justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="70" height="70" >
                        <g>
                            <circle cx="50" cy="30" r="15" fill="#E74C3C" />
                            <circle cx="65" cy="40" r="15" fill="#F39C12" />
                            <circle cx="35" cy="40" r="15" fill="#1ABC9C" />
                            <circle cx="50" cy="50" r="15" fill="#9B59B6" />
                        </g>
                    </svg>

                    <div className="text-lg font-bold">BitBloom Technologies</div>
                </div>

                {/* Desktop Navigation */}
                <nav className="space-x-4 text-sm hidden lg:flex">
                    {admin_mode ? (<></>) : (<><Link href="/" className={`${isActive('/')} px-3 py-1.5`}>Home</Link>
                        <Link href="/services" className={`${isActive('/services')} px-3 py-1.5`}>Services</Link>
                        <Link href="/about" className={`${isActive('/about')} px-3 py-1.5`}>About</Link>
                        <Link href="/contact" className={`${isActive('/contact')} px-3 py-1.5`}>Contact</Link></>)}
                
                    {auth.user ? (
                        <div className="relative ml-auto" ref={userMenuRef}>
                            {admin_mode ? (
                                <button
                                    className="flex items-center gap-2 rounded-full border px-3 py-1.5"
                                >
                                    <span className="hidden lg:inline text-red-500">
                                        {admin_mode ? 'Admin' : auth.user.name}
                                    </span>
                                </button>
                            ) : (
                                <button
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className="flex items-center gap-2 rounded-full border px-3 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-800"
                                >
                                    <span className="hidden lg:inline">
                                        {auth.user.name}
                                    </span>
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            )}

                            {isUserMenuOpen && (
                                <div className="absolute right-0 mt-2 w-24 bg-white dark:bg-[#1a1a1a] border rounded shadow-md z-50">
                                    <Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                        className="flex justify-center items-center w-full py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                                    >
                                        Logout
                                    </Link>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="ml-auto rounded-md bg-[#1b1b18] px-7 py-1.5 text-white hover:bg-[#2d2d29] dark:bg-[#EDEDEC] dark:text-[#0a0a0a] dark:hover:bg-[#d4d4d4] transition"
                            >
                                Login
                            </Link>
                            <Link
                                href={route('register')}
                                className="rounded-md border border-[#1b1b18] px-4 py-1.5 text-[#1b1b18] hover:bg-[#1b1b18] hover:text-white dark:border-[#EDEDEC] dark:text-[#EDEDEC] dark:hover:bg-[#EDEDEC] dark:hover:text-[#0a0a0a] transition"
                            >
                                Register
                            </Link>
                        </>
                    )}

                </nav>

                {/* Mobile Hamburger Menu */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="lg:hidden flex items-center justify-center text-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </header >

            {/* Mobile Navigation (Dropdown) */}
            < div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-white dark:bg-[#0a0a0a]`
            }>
                <nav className="space-y-4 px-6 py-4">
                    <Link href="/" className={`${isActive('/')} block px-3 py-1.5`}>Home</Link>
                    <Link href="/services" className={`${isActive('/services')} block px-3 py-1.5`}>Services</Link>
                    <Link href="/about" className={`${isActive('/about')} block px-3 py-1.5`}>About</Link>
                    <Link href="/contact" className={`${isActive('/contact')} block px-3 py-1.5`}>Contact</Link>
                    {auth.user ? (
                        <Link href={route('dashboard')} className="block font-medium underline">Dashboard</Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="block ml-auto rounded-md bg-[#1b1b18] px-7 py-1.5 text-white hover:bg-[#2d2d29] dark:bg-[#EDEDEC] dark:text-[#0a0a0a] dark:hover:bg-[#d4d4d4] transition"
                            >
                                Login
                            </Link>
                            <Link
                                href={route('register')}
                                className="block rounded-md border border-[#1b1b18] px-4 py-1.5 text-[#1b1b18] hover:bg-[#1b1b18] hover:text-white dark:border-[#EDEDEC] dark:text-[#EDEDEC] dark:hover:bg-[#EDEDEC] dark:hover:text-[#0a0a0a] transition"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </nav>
            </div >
        </>
    );
}
