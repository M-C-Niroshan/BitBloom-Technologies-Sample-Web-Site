import { useEffect, useState } from 'react';

interface HeaderData {
    id?: string;
    mainTitle?: string;
    subTitle?: string;
    notExists?: boolean;
}

export default function MainHeader() {
    const [headerData, setHeaderData] = useState<HeaderData | null>(null);
    
    useEffect(() => {
        getHeaderContent();
    }, []);

    const getHeaderContent = async () => {
        try {
            const res = await fetch('/dashboard/customize-about/main-header/getAboutUsMainHeaderinfo');
            const data = await res.json();
            setHeaderData(data);
        } catch (error) {

            console.error(error);
        }
    };

    return (
        <div className="mb-12 text-center">
            <h1 className="mb-6 text-4xl font-semibold">{headerData?.mainTitle || 'About BitBloom Technologies'}</h1>
            <p className="mx-auto max-w-3xl text-lg text-gray-600 dark:text-[#bbb]">
                {headerData?.subTitle || 'We provide innovative software solutions to help businesses thrive in a rapidly evolving digital world. Our team specializes in custom web, mobile, and cloud-based applications that are scalable, secure, and user-centered.'}
            </p>
        </div>
    );
}
