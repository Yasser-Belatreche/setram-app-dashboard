import React from 'react';
import { useRouter } from 'next/router';
import { IconMail } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { Button, Container, PasswordInput, TextInput, Title, useMantineTheme } from '@mantine/core';

import { AuthGateway } from '../../core/auth/AuthGateway';
import { GatewayException } from '../../core/GatewayException';
import { LoginBody } from '../../core/auth/api-contract/login/LoginBody';

const Login: React.FC = () => {
    const theme = useMantineTheme();

    const { push } = useRouter();

    const [loading, setLoading] = React.useState<boolean>(false);
    const [loginBody, setLoginBody] = React.useState<LoginBody>({
        email: '',
        password: '',
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            await AuthGateway.Login(loginBody);
            await push('/');
        } catch (e) {
            setLoading(false);

            if (e instanceof GatewayException)
                return notifications.show({ message: e.message, title: 'Error', color: 'red' });
            if (e instanceof Error)
                return notifications.show({ message: e.message, title: 'Error', color: 'red' });

            return notifications.show({ message: 'Something went wrong', color: 'red' });
        }
    };

    return (
        <div className={'min-h-screen'} style={{ background: theme.colors.gray[0] }}>
            <Container maw={400}>
                <Title className={'text-center mb-8 pt-20'}>Login</Title>

                <form onSubmit={handleSubmit}>
                    <TextInput
                        placeholder="example@email.com"
                        label="Email"
                        type="email"
                        className={'mb-6'}
                        size={'md'}
                        rightSection={<IconMail className="text-gray-400" size={20} />}
                        value={loginBody.email}
                        onChange={e => setLoginBody({ ...loginBody, email: e.currentTarget.value })}
                        required
                        withAsterisk
                    />

                    <PasswordInput
                        placeholder="mot de passe"
                        label="Mot de passe"
                        className={'mb-10'}
                        size={'md'}
                        value={loginBody.password}
                        onChange={e =>
                            setLoginBody({ ...loginBody, password: e.currentTarget.value })
                        }
                        required
                        withAsterisk
                    />

                    <Button type="submit" size="md" fullWidth loading={loading}>
                        Se Connecter
                    </Button>
                </form>
            </Container>
        </div>
    );
};

export { Login };
