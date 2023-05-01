import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import DataTable, { TableColumn } from 'react-data-table-component';
import { ActionIcon, Badge, Button, Loader, Modal, Tooltip } from '@mantine/core';
import { IconCalendar, IconPencil, IconPlus, IconTrash } from '@tabler/icons-react';

import { Layout } from '../../components/Layout/Layout';
import { PageHeaders } from '../../components/PageHeaders';

import { EmployeesGateway } from '../../core/employees/EmployeesGateway';
import { Employee } from '../../core/employees/api-contract/base/Employee';
import { GetEmployeesQueryParams } from '../../core/employees/api-contract/get-employees/GetEmployeesQueryParams';
import { GatewayException } from '../../core/GatewayException';

const Employees: React.FC = () => {
    const [opened, { open, close }] = useDisclosure(false);

    const { push } = useRouter();

    return (
        <Layout>
            <PageHeaders title={'Employees'} subTitle={'List'} />

            <div className={'flex justify-end bg-white p-4'}>
                <Button
                    size={'sm'}
                    rightIcon={<IconPlus />}
                    onClick={() => push('/employees/create')}
                >
                    Ajouter Employee
                </Button>
            </div>

            <Modal
                centered
                opened={opened}
                onClose={close}
                title={<p className="font-medium">Supprimer l&apos;Employee</p>}
            >
                <form className="flex items-center gap-x-2">
                    <Button fullWidth type="submit" color={'red'} loading={false}>
                        Supprimer
                    </Button>
                    <Button fullWidth color={'gray'} onClick={close}>
                        Annuler
                    </Button>
                </form>
            </Modal>

            <EmployeesTable />
        </Layout>
    );
};

const EmployeesTable = () => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [filters, setFilters] = React.useState<GetEmployeesQueryParams>({ page: 1, perPage: 25 });
    const [employees, setEmployees] = React.useState<{ list: Employee[]; total: number }>({
        list: [],
        total: 0,
    });

    useEffect(() => {
        setLoading(true);

        EmployeesGateway.GetEmployees(filters)
            .then(({ pagination, list }) => setEmployees({ list, total: pagination.total }))
            .catch(() => {
                notifications.show({
                    message: 'Une erreur est survenue lors de la récupération des employees',
                    color: 'red',
                });
            })
            .finally(() => setLoading(false));
    }, [filters]);

    return (
        <DataTable
            columns={columns}
            data={employees.list}
            highlightOnHover
            pagination
            paginationTotalRows={employees.total}
            paginationPerPage={filters.perPage}
            paginationDefaultPage={filters.page}
            onChangePage={page => setFilters({ ...filters, page })}
            onChangeRowsPerPage={perPage => setFilters({ ...filters, perPage })}
            progressPending={loading}
            noDataComponent={
                <div className="p-10">
                    <p className="text-sm text-center">Aucun Employee</p>
                </div>
            }
            progressComponent={
                <div className="flex w-full justify-center py-10">
                    <Loader />
                </div>
            }
        />
    );
};

const SeeCalendarButton: React.FC<{ employee: Employee }> = ({ employee }) => {
    const { push } = useRouter();

    return (
        <Tooltip label={'Voir Calendrier'} position={'left'}>
            <ActionIcon
                size={'xs'}
                color={'blue'}
                onClick={() => push(`/employees/${employee.id}/planning`)}
            >
                <IconCalendar />
            </ActionIcon>
        </Tooltip>
    );
};

const EditButton: React.FC<{ employee: Employee }> = ({ employee }) => {
    const { push } = useRouter();

    return (
        <Tooltip label={'Modifier'} position={'left'}>
            <ActionIcon
                size={'xs'}
                color={'green'}
                onClick={() => push(`/employees/${employee.id}`)}
            >
                <IconPencil />
            </ActionIcon>
        </Tooltip>
    );
};

const DeleteButton: React.FC<{ employee: Employee }> = ({ employee }) => {
    const [opened, { open, close }] = useDisclosure(false);
    const [loading, setLoading] = React.useState<boolean>(false);

    const { reload } = useRouter();

    const handleDelete = async () => {
        setLoading(true);

        try {
            await EmployeesGateway.DeleteEmployee(employee.id);

            await reload();
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
        <>
            <Tooltip label={'Supprimer'} position={'left'}>
                <ActionIcon size={'xs'} color={'red'} onClick={open}>
                    <IconTrash />
                </ActionIcon>
            </Tooltip>

            <Modal
                centered
                opened={opened}
                onClose={close}
                title={<p className="font-medium">Supprimer l&apos;Employee</p>}
            >
                <div className="flex items-center gap-x-2">
                    <Button
                        fullWidth
                        type="submit"
                        color={'red'}
                        loading={loading}
                        onClick={handleDelete}
                    >
                        Supprimer
                    </Button>
                    <Button fullWidth color={'gray'} onClick={close}>
                        Annuler
                    </Button>
                </div>
            </Modal>
        </>
    );
};

const columns: TableColumn<Employee>[] = [
    {
        name: 'Nom',
        selector: row => row.firstName,
    },
    {
        name: 'Prenom',
        selector: row => row.lastName,
    },
    {
        name: 'Email',
        selector: row => row.email,
    },
    {
        name: 'Telephone',
        selector: row => row.phoneNumber,
    },
    {
        name: 'Date de debut',
        selector: row => new Date(row.startingDate).toLocaleDateString(),
    },
    {
        name: 'Deparetement',
        cell: row => <Badge>{row.department}</Badge>,
    },
    {
        name: '',
        width: '40px',
        cell: row => <SeeCalendarButton employee={row} />,
    },
    {
        name: '',
        width: '40px',
        cell: row => <EditButton employee={row} />,
    },
    {
        name: '',
        width: '100px',
        cell: row => <DeleteButton employee={row} />,
    },
];

export { Employees };
