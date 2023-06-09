import React from 'react';
import { createStyles, getStylesRef, Navbar, rem } from '@mantine/core';
import {
    IconBellRinging,
    IconBrowserCheck,
    IconFileDescription,
    IconHome,
    IconLogout,
    IconNews,
    IconTools,
    IconUsers,
    IconUserSearch,
} from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AuthGateway } from '../../core/auth/AuthGateway';

const Sidebar: React.FC = () => {
    const { asPath } = useRouter();

    const { classes, cx } = useStyles();

    const { push } = useRouter();

    const handleLogout = async () => {
        AuthGateway.Logout();

        await push('/login');
    };

    const links = SIDE_BAR_LINKS.map(item => (
        <Link
            className={cx(classes.link, {
                [classes.linkActive]: item.activePathMatch.test(asPath),
            })}
            href={item.link}
            key={item.label}
        >
            <item.icon className={classes.linkIcon} stroke={1.5} />

            <span>{item.label}</span>
        </Link>
    ));

    return (
        <>
            <Navbar.Section className={'pt-10'} grow>
                {links}
            </Navbar.Section>

            <Navbar.Section className={classes.footer}>
                <a href="#" className={classes.link} onClick={handleLogout}>
                    <IconLogout className={classes.linkIcon} stroke={1.5} />
                    <span>Logout</span>
                </a>
            </Navbar.Section>
        </>
    );
};

const useStyles = createStyles(theme => ({
    footer: {
        paddingTop: theme.spacing.md,
        marginTop: theme.spacing.md,
        borderTop: `${rem(1)} solid ${theme.colors.gray[2]}`,
    },

    link: {
        ...theme.fn.focusStyles(),
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        fontSize: theme.fontSizes.sm,
        color: theme.colors.gray[7],
        padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
        margin: `${theme.spacing.xs} 0`,
        borderRadius: theme.radius.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colors.gray[0],

            [`& .${getStylesRef('icon')}`]: {
                color: theme.black,
            },
        },
    },

    linkIcon: {
        ref: getStylesRef('icon'),
        color: theme.colors.gray[6],
        marginRight: theme.spacing.sm,
    },

    linkActive: {
        '&, &:hover': {
            backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
                .background,
            color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
            [`& .${getStylesRef('icon')}`]: {
                color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
            },
        },
    },
}));

const SIDE_BAR_LINKS = [
    { link: '/', activePathMatch: /^\/$/, label: 'Accueil', icon: IconHome },
    { link: '/employees', activePathMatch: /^\/employees.*/, label: 'Employées', icon: IconUsers },
    {
        link: '/notifications/send',
        activePathMatch: /^\/notifications.*/,
        label: 'Envoyer des notifications',
        icon: IconBellRinging,
    },
    {
        link: '/documents',
        activePathMatch: /^\/documents.*/,
        label: 'Documents',
        icon: IconFileDescription,
    },
    {
        link: '/announcements',
        activePathMatch: /^\/announcements.*/,
        label: 'Annonces',
        icon: IconNews,
    },
    { link: '/events', activePathMatch: /^\/events.*/, label: 'Evenement', icon: IconBrowserCheck },
    {
        link: '/jobs',
        activePathMatch: /^\/jobs.*/,
        label: 'Poste de travail',
        icon: IconUserSearch,
    },
    { link: '/workshops', activePathMatch: /^\/workshops.*/, label: 'Ateliers', icon: IconTools },
];

export { Sidebar };
