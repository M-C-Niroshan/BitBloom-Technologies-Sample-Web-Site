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

            const res = await fetch('/dashboard/customize-services/main-header/getMainHeadercontent');
            const data = await res.json();
            setHeaderData(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            {/* Main-Header */}
            <h1 className="text-4xl font-extrabold mb-12 text-[#1b1b18] dark:text-[#EDEDEC]">{headerData?.mainTitle}</h1>
            <p className="text-lg mb-16 text-[#555] dark:text-[#bbb] max-w-2xl mx-auto">
                {headerData?.subTitle}
            </p>
        </>
    )
}
