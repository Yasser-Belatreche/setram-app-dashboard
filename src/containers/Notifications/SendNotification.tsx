import React, { useEffect, useState } from 'react';
import { Layout } from '../../components/Layout/Layout';
import { PageHeaders } from '../../components/PageHeaders';
import { Button, MultiSelect, Switch, Textarea, TextInput } from '@mantine/core';
import { IconLetterCase } from '@tabler/icons-react';
import { Departments } from '../../utils/Departments';
import { GatewayException } from '../../core/GatewayException';
import { notifications } from '@mantine/notifications';
import { SendNotificationToEmployeesBody } from '../../core/employees/api-contract/send-notification-to-employees/SendNotificationToEmployeesBody';
import { EmployeesGateway } from '../../core/employees/EmployeesGateway';
import { GetEmployeesToNotifyQueryParams } from '../../core/employees/api-contract/get-employees-to-notify/GetEmployeesToNotifyQueryParams';
import { Employee } from '../../core/employees/api-contract/base/Employee';
import { EmployeeDevice } from '../../core/employees/api-contract/base/EmployeeDevice';

const SendNotification: React.FC = () => {
    return (
        <Layout>
            <PageHeaders title={'Envoyer Des Notifications'} subTitle={'Notification'} />

            <SendNotificationForm />
        </Layout>
    );
};

const SendNotificationForm: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const [formValues, setFormValues] = useState<SendNotificationToEmployeesBody>({
        title: '',
        body: '',
        employees: [],
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            await EmployeesGateway.SendNotification(formValues);

            setFormValues({ title: '', body: '', employees: [] });
            notifications.show({
                message: 'notifications envoyées avec succès',
                title: 'Succès',
                color: 'green',
            });
            setLoading(false);
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
            <div className={'flex flex-col gap-4'}>
                <TextInput
                    placeholder="Titre"
                    label="Titre"
                    type="text"
                    className={'w-full'}
                    rightSection={<IconLetterCase className="text-gray-400" size={20} />}
                    value={formValues.title}
                    onChange={e => setFormValues({ ...formValues, title: e.target.value })}
                    required
                    withAsterisk
                />
                <Textarea
                    placeholder="Description"
                    label="Description"
                    className={'w-full'}
                    value={formValues.body}
                    onChange={e => setFormValues({ ...formValues, body: e.target.value })}
                    required
                    withAsterisk
                />

                <EmployeesToNotify
                    value={formValues.employees}
                    onChange={employees => setFormValues({ ...formValues, employees })}
                />

                <Button type="submit" size="md" fullWidth loading={loading}>
                    Envoyer
                </Button>
            </div>
        </form>
    );
};

interface Props {
    value: string[];
    onChange: (value: string[]) => void;
}

const EmployeesToNotify: React.FC<Props> = ({ value, onChange }) => {
    const [employees, setEmployees] = useState<(Employee & { devices: EmployeeDevice[] })[]>([]);
    const [filters, setFilters] = useState<GetEmployeesToNotifyQueryParams>({
        page: 1,
        perPage: 200,
        departments: [],
    });

    useEffect(() => {
        EmployeesGateway.GetEmployeesToNotify(filters)
            .then(res => setEmployees(res.list))
            .catch(e => notifications.show({ message: e.message, title: 'Error', color: 'red' }));
    }, [filters]);

    return (
        <>
            <div className={'flex gap-4 items-center'}>
                <MultiSelect
                    placeholder="Departements"
                    label="Departements"
                    type="text"
                    className={'w-full'}
                    data={Departments}
                    value={filters.departments}
                    onChange={departments => setFilters({ ...filters, departments })}
                    searchable
                    required
                    withAsterisk
                />
                <Switch
                    label="Tout"
                    className={'mt-6'}
                    onChange={e =>
                        setFilters({
                            ...filters,
                            departments: e.currentTarget.checked ? Departments : [],
                        })
                    }
                />
            </div>

            <MultiSelect
                placeholder="Employées"
                label="Employées"
                type="text"
                className={'w-full'}
                data={employees.map(e => ({
                    value: e.id,
                    label: `${e.firstName} ${e.lastName} (${e.department})`,
                }))}
                value={value}
                onChange={onChange}
                searchable
                clearable
                required
                withAsterisk
            />
        </>
    );
};

export { SendNotification };
