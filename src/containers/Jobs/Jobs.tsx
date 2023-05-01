import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDisclosure } from '@mantine/hooks';
import DataTable, { TableColumn } from 'react-data-table-component';
import { IconPencil, IconPlus, IconTrash } from '@tabler/icons-react';
import { ActionIcon, Badge, Button, Loader, Modal, Tooltip } from '@mantine/core';

import { Layout } from '../../components/Layout/Layout';
import { PageHeaders } from '../../components/PageHeaders';
import { GetJobsQueryParams } from '../../core/jobs/api-contract/get-jobs/GetJobsQueryParams';
import { Job } from '../../core/jobs/api-contract/base/Job';
import { JobsGateway } from '../../core/jobs/JobsGateway';
import { notifications } from '@mantine/notifications';
import { GatewayException } from '../../core/GatewayException';

const Jobs: React.FC = () => {
    const { push } = useRouter();

    return (
        <Layout>
            <PageHeaders title={'Post de travails'} subTitle={'List'} />

            <div className={'flex justify-end bg-white p-4'}>
                <Button rightIcon={<IconPlus />} size={'sm'} onClick={() => push('/jobs/create')}>
                    Ajouter Post de travail
                </Button>
            </div>

            <JobsTable />
        </Layout>
    );
};

const JobsTable = () => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [filters, setFilters] = React.useState<GetJobsQueryParams>({
        page: 1,
        perPage: 25,
    });
    const [jobs, setJobs] = React.useState<{
        list: Job[];
        total: number;
    }>({ list: [], total: 0 });

    useEffect(() => {
        setLoading(true);

        JobsGateway.GetJobs(filters)
            .then(({ pagination, list }) => setJobs({ list, total: pagination.total }))
            .catch(() => {
                notifications.show({
                    message: 'Une erreur est survenue lors de la récupération des jobs',
                    color: 'red',
                });
            })
            .finally(() => setLoading(false));
    }, [filters]);

    return (
        <DataTable
            columns={columns}
            data={jobs.list}
            highlightOnHover
            pagination
            paginationTotalRows={jobs.total}
            paginationPerPage={filters.perPage}
            paginationDefaultPage={filters.page}
            onChangePage={page => setFilters({ ...filters, page })}
            onChangeRowsPerPage={perPage => setFilters({ ...filters, perPage })}
            progressPending={loading}
            noDataComponent={
                <div className="p-10">
                    <p className="text-sm text-center">Aucun Post de travail</p>
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

const EditButton: React.FC<{ job: Job }> = ({ job }) => {
    const { push } = useRouter();

    return (
        <Tooltip label={'Modifier'} position={'left'}>
            <ActionIcon size={'xs'} color={'green'} onClick={() => push(`/jobs/${job.id}`)}>
                <IconPencil />
            </ActionIcon>
        </Tooltip>
    );
};

const DeleteButton: React.FC<{ job: Job }> = ({ job }) => {
    const [opened, { open, close }] = useDisclosure(false);
    const [loading, setLoading] = React.useState<boolean>(false);

    const { reload } = useRouter();

    const handleDelete = async () => {
        setLoading(true);

        try {
            await JobsGateway.DeleteJob(job.id);

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
                title={<p className="font-medium">Supprimer le Post de travail</p>}
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

const columns: TableColumn<Job>[] = [
    {
        name: 'Titre',
        grow: 2,
        selector: row => row.title,
    },
    {
        name: "date limite d'application",
        grow: 1,
        selector: row => new Date(row.applicationDeadline).toLocaleDateString(),
    },
    {
        name: 'Active',
        grow: 1,
        cell: row => (
            <div>
                <Badge>{row.isActive ? 'Oui' : 'Non'}</Badge>
            </div>
        ),
    },
    {
        name: 'Deparetement concerne',
        grow: 3,
        cell: row => (
            <div className={'flex gap-2 py-4 items-center flex-wrap w-full'}>
                {row.departments.map(d => (
                    <Badge key={d}>{d}</Badge>
                ))}
            </div>
        ),
    },
    {
        name: '',
        width: '40px',
        cell: row => <EditButton job={row} />,
    },
    {
        name: '',
        width: '100px',
        cell: row => <DeleteButton job={row} />,
    },
];

export { Jobs };
