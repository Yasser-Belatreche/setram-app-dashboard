import React from 'react';

import { Button, Container, PasswordInput, TextInput, Title, useMantineTheme } from '@mantine/core';
import { IconMail } from '@tabler/icons-react';

const Login: React.FC = () => {
    const theme = useMantineTheme();

    return (
        <div className={'min-h-screen'} style={{ background: theme.colors.gray[0] }}>
            <Container maw={400}>
                <Title className={'text-center mb-8 pt-20'}>Login</Title>

                <TextInput
                    placeholder="example@email.com"
                    label="Email"
                    type="email"
                    className={'mb-6'}
                    size={'md'}
                    rightSection={<IconMail className="text-gray-400" size={20} />}
                    required
                    withAsterisk
                />

                <PasswordInput
                    placeholder="mot de passe"
                    label="Mot de passe"
                    className={'mb-10'}
                    size={'md'}
                    required
                    withAsterisk
                />

                <Button type="submit" size="md" fullWidth loading={false}>
                    Se Connecter
                </Button>
            </Container>
        </div>
    );
};

export { Login };
