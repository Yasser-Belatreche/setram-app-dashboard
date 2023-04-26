import React from 'react';
import { createStyles, getStylesRef, Navbar, rem } from '@mantine/core';
import {
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

const Sidebar: React.FC = () => {
    const { asPath } = useRouter();

    const { classes, cx } = useStyles();

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
                <a href="#" className={classes.link} onClick={event => event.preventDefault()}>
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
        borderTop: `${rem(1)} solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
        }`,
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
