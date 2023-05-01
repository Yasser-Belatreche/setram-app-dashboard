import React from 'react';
import { useRouter } from 'next/router';
import { DatePickerInput } from '@mantine/dates';
import { notifications } from '@mantine/notifications';
import { Button, PasswordInput, Select, TextInput } from '@mantine/core';
import { IconCalendar, IconLetterCase, IconMail, IconPhone } from '@tabler/icons-react';

import { Layout } from '../../components/Layout/Layout';
import { PageHeaders } from '../../components/PageHeaders';

import { Departments } from '../../utils/Departments';
import { GatewayException } from '../../core/GatewayException';
import { EmployeesGateway } from '../../core/employees/EmployeesGateway';
import { CreateEmployeeBody } from '../../core/employees/api-contract/create-employee/CreateEmployeeBody';
import { Genders } from '../../utils/Genders';

const CreateEmployee: React.FC = () => {
    return (
        <Layout>
            <PageHeaders title={'Ajouter Employee'} subTitle={'Employees'} />

            <CreateEmployeeForm />
        </Layout>
    );
};

const CreateEmployeeForm = () => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [formValues, setFormValues] = React.useState<CreateEmployeeBody>({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        birthDate: new Date(),
        startingDate: new Date(),
        gender: '',
        department: '',
        email: '',
        password: '',
    });

    const { push } = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            await EmployeesGateway.CreateEmployee(formValues);
            await push('/employees');
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
        <form className={'bg-white p-4 h-full w-full'} onSubmit={handleSubmit}>
            <div className={'grid gap-6 sm:grid-cols-2'}>
                <TextInput
                    placeholder="Belatreche"
                    label="Nom"
                    type="text"
                    className={'w-full'}
                    rightSection={<IconLetterCase className="text-gray-400" size={20} />}
                    value={formValues.firstName}
                    onChange={e =>
                        setFormValues({ ...formValues, firstName: e.currentTarget.value })
                    }
                    required
                    withAsterisk
                />
                <TextInput
                    placeholder="Yasser"
                    label="Prenom"
                    type="text"
                    rightSection={<IconLetterCase className="text-gray-400" size={20} />}
                    value={formValues.lastName}
                    onChange={e =>
                        setFormValues({ ...formValues, lastName: e.currentTarget.value })
                    }
                    required
                    withAsterisk
                />

                <DatePickerInput
                    placeholder="18/11/2002"
                    label="Date de naissance"
                    valueFormat={'DD/MM/YYYY'}
                    rightSection={<IconCalendar className="text-gray-400" size={20} />}
                    value={formValues.birthDate}
                    onChange={date =>
                        setFormValues({ ...formValues, birthDate: date ?? new Date() })
                    }
                    required
                    withAsterisk
                />

                <DatePickerInput
                    placeholder="18/11/2022"
                    label="Date de début"
                    valueFormat={'DD/MM/YYYY'}
                    rightSection={<IconCalendar className="text-gray-400" size={20} />}
                    value={formValues.startingDate}
                    onChange={date =>
                        setFormValues({ ...formValues, startingDate: date ?? new Date() })
                    }
                    required
                    withAsterisk
                />

                <Select
                    label="Sexe"
                    placeholder="Male"
                    data={Genders}
                    value={formValues.gender}
                    onChange={gender => setFormValues({ ...formValues, gender: gender ?? '' })}
                />
                <Select
                    label="Département"
                    placeholder="Département"
                    data={Departments}
                    value={formValues.department}
                    onChange={department =>
                        setFormValues({ ...formValues, department: department ?? '' })
                    }
                />
            </div>

            <div className={'flex flex-col gap-4 my-4'}>
                <TextInput
                    placeholder="0798980975"
                    label="Numéro de téléphone"
                    type="tel"
                    rightSection={<IconPhone className="text-gray-400" size={20} />}
                    value={formValues.phoneNumber}
                    onChange={e =>
                        setFormValues({ ...formValues, phoneNumber: e.currentTarget.value })
                    }
                    required
                    withAsterisk
                />
                <TextInput
                    placeholder="example@email.com"
                    label="Email"
                    type="email"
                    rightSection={<IconMail className="text-gray-400" size={20} />}
                    value={formValues.email}
                    onChange={e => setFormValues({ ...formValues, email: e.currentTarget.value })}
                    required
                    withAsterisk
                />
                <PasswordInput
                    placeholder="mot de passe"
                    label="Mot de passe"
                    value={formValues.password}
                    onChange={e =>
                        setFormValues({ ...formValues, password: e.currentTarget.value })
                    }
                    required
                    withAsterisk
                />
            </div>

            <Button type="submit" size="md" fullWidth loading={loading}>
                Ajouter
            </Button>
        </form>
    );
};

export { CreateEmployee };
