import '../styles/globals.css';

import { useEffect } from 'react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

import { AuthGateway } from '../core/auth/AuthGateway';

export default function App(props: AppProps) {
    const { Component, pageProps } = props;

    const router = useRouter();

    useEffect(() => {
        if (!AuthGateway.IsLoggedIn() && router.pathname !== '/login') {
            router.push('/login').finally(() => {});
        }
    }, []);

    return (
        <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{ colorScheme: 'light', fontFamily: "'Poppins', sans-serif" }}
        >
            <Notifications />
            <Component {...pageProps} />
        </MantineProvider>
    );
}
