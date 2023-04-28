import React from 'react';
import { createStyles, rem } from '@mantine/core';

interface Props {}

const Separator: React.FC<Props> = () => {
    const { classes, cx } = useStyles();

    return <div className={cx(classes.separator)}></div>;
};

const useStyles = createStyles(theme => ({
    separator: {
        marginBottom: theme.spacing.md,
        marginTop: theme.spacing.md,
        borderTop: `${rem(1)} solid ${theme.colors.gray[2]}`,
    },
}));

export { Separator };
