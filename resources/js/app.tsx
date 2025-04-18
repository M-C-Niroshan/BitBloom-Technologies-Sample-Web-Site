import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';

import { AdminProvider } from '@/context/admin/Admin-context';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
console.log(appName);

createInertiaApp({
    title: (title) => `${title}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        const isAdminPage = props.initialPage.url.startsWith('/dashboard');
        root.render(
            isAdminPage ? (
                <AdminProvider>
                    <App {...props} />
                </AdminProvider>
            ) : (
                <App {...props} />
            )
        );
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
