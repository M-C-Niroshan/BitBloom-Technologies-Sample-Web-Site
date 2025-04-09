import { ReactNode } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Header } from '@/components/main-header';
import { MainFooter } from '@/components/main-footer';

interface FrontEndLayoutProps {
    children: ReactNode;
    admin_mode?: boolean;
    title?: string;
}

export default function FrontEndLayout({ children, admin_mode, title }: FrontEndLayoutProps) {

    return (
        <>
            <Head>
                <title>{admin_mode && title ? title : 'BitBloom Technologies'}</title>
            </Head>
            <div className="flex min-h-screen flex-col bg-[#FDFDFC] text-[#1b1b18] dark:bg-[#0a0a0a] dark:text-[#EDEDEC]">
                <Header admin_mode={admin_mode} />
                <main className="flex-1 p-6 overflow-y-auto overflow-x-hidden">{children}</main>
                <MainFooter admin_mode={admin_mode} />
            </div>

        </>
    );
}
