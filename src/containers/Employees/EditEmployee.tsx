import React, { useEffect, useRef } from 'react';
import { DatePickerInput } from '@mantine/dates';
import { Button, Loader, PasswordInput, Select, TextInput } from '@mantine/core';
import { IconCalendar, IconLetterCase, IconMail, IconPhone } from '@tabler/icons-react';

import { Layout } from '../../components/Layout/Layout';
import { PageHeaders } from '../../components/PageHeaders';

import { Departments } from '../../utils/Departments';
import { Genders } from '../../utils/Genders';
import { useRouter } from 'next/router';
import { EmployeesGateway } from '../../core/employees/EmployeesGateway';
import { GatewayException } from '../../core/GatewayException';
import { notifications } from '@mantine/notifications';
import { EditEmployeeBody } from '../../core/employees/api-contract/edit-employee/EditEmployeeBody';
import { Employee } from '../../core/employees/api-contract/base/Employee';

const EditEmployee: React.FC = () => {
    const { query } = useRouter();

    const [loading, setLoading] = React.useState(true);
    const employeeRef = useRef<Employee>();

    useEffect(() => {
        if (!query['id']) return;

        EmployeesGateway.GetById(query['id'] as string)
            .then(employee => {
                setLoading(false);
                employeeRef.current = employee;
            })
            .catch(e => {
                setLoading(false);

                if (e instanceof GatewayException)
                    return notifications.show({ message: e.message, title: 'Error', color: 'red' });
                if (e instanceof Error)
                    return notifications.show({ message: e.message, title: 'Error', color: 'red' });

                return notifications.show({ message: 'Something went wrong', color: 'red' });
            });
    }, [query]);

    return (
        <Layout>
            <PageHeaders title={'Editer Employee'} subTitle={'Employees'} />

            <div className={'bg-white p-4 h-full w-full'}>
                {loading && (
                    <div className="flex w-full justify-center py-10">
                        <Loader />
                    </div>
                )}

                {employeeRef.current && <EditEmployeeForm employee={employeeRef.current!} />}
            </div>
        </Layout>
    );
};

const EditEmployeeForm: React.FC<{ employee: Employee }> = ({ employee }) => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [formValues, setFormValues] = React.useState<EditEmployeeBody>({
        ...employee,
        newPassword: undefined,
    });

    const { push } = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            await EmployeesGateway.EditEmployee(employee.id, formValues);
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
        <form onSubmit={handleSubmit}>
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
                    value={new Date(formValues.birthDate)}
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
                    value={new Date(formValues.startingDate)}
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
                    placeholder="Nouveau mot de passe"
                    label="Nouveau mot de passe"
                    value={formValues.newPassword}
                    onChange={e =>
                        setFormValues({ ...formValues, newPassword: e.currentTarget.value })
                    }
                    required={false}
                    withAsterisk
                />
            </div>

            <Button type="submit" size="md" fullWidth loading={loading}>
                Confirmer
            </Button>
        </form>
    );
};

export { EditEmployee };
