import '../styles/globals.css';

import { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

export default function App(props: AppProps) {
    const { Component, pageProps } = props;

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
