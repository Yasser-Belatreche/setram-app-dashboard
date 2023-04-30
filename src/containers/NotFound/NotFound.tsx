import { Button, Container, createStyles, Group, rem, Text, Title } from '@mantine/core';
import Link from 'next/link';

const NotFound = () => {
    const { classes } = useStyles();

    return (
        <Container className={classes.root}>
            <div className={classes.label}>404</div>

            <Title className={classes.title}>Vous avez trouvé un endroit secret.</Title>

            <Text color="dimmed" size="lg" align="center" className={classes.description}>
                Malheureusement, ce n&apos;est qu&apos;une page 404. Vous avez peut-être mal tapé
                l&apos;adresse ou le la page a été déplacée vers une autre URL.
            </Text>

            <Group position="center">
                <Link href={'/'}>
                    <Button variant="subtle" size="md">
                        Ramenez-moi à la page d&apos;accueil
                    </Button>
                </Link>
            </Group>
        </Container>
    );
};

const useStyles = createStyles(theme => ({
    root: {
        paddingTop: rem(80),
        paddingBottom: rem(80),
    },

    label: {
        textAlign: 'center',
        fontWeight: 900,
        fontSize: rem(220),
        lineHeight: 1,
        marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],

        [theme.fn.smallerThan('sm')]: {
            fontSize: rem(120),
        },
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        textAlign: 'center',
        fontWeight: 900,
        fontSize: rem(38),

        [theme.fn.smallerThan('sm')]: {
            fontSize: rem(32),
        },
    },

    description: {
        maxWidth: rem(500),
        margin: 'auto',
        marginTop: theme.spacing.xl,
        marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    },
}));

export { NotFound };
