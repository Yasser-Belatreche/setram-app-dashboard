import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import DataTable, { TableColumn } from 'react-data-table-component';
import { IconPencil, IconPlus, IconTrash } from '@tabler/icons-react';
import { ActionIcon, Badge, Button, Loader, Modal, Tooltip } from '@mantine/core';

import { Layout } from '../../components/Layout/Layout';
import { PageHeaders } from '../../components/PageHeaders';

import { GatewayException } from '../../core/GatewayException';
import { EventsGateway } from '../../core/events/EventsGateway';
import { Event } from '../../core/events/api-contract/base/Event';
import { GetEventsQueryParams } from '../../core/events/api-contract/get-events/GetEventsQueryParams';

const Events: React.FC = () => {
    const { push } = useRouter();

    return (
        <Layout>
            <PageHeaders title={'Evenements'} subTitle={'List'} />

            <div className={'flex justify-end bg-white p-4'}>
                <Button rightIcon={<IconPlus />} size={'sm'} onClick={() => push('/events/create')}>
                    Ajouter Evenement
                </Button>
            </div>

            <EventsTable />
        </Layout>
    );
};

const EventsTable = () => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [filters, setFilters] = React.useState<GetEventsQueryParams>({
        page: 1,
        perPage: 25,
    });
    const [events, setEvents] = React.useState<{
        list: Event[];
        total: number;
    }>({ list: [], total: 0 });

    useEffect(() => {
        setLoading(true);

        EventsGateway.GetEvents(filters)
            .then(({ pagination, list }) => setEvents({ list, total: pagination.total }))
            .catch(() => {
                notifications.show({
                    message: 'Une erreur est survenue lors de la récupération des events',
                    color: 'red',
                });
            })
            .finally(() => setLoading(false));
    }, [filters]);

    return (
        <DataTable
            columns={columns}
            data={events.list}
            highlightOnHover
            pagination
            paginationTotalRows={events.total}
            paginationPerPage={filters.perPage}
            paginationDefaultPage={filters.page}
            onChangePage={page => setFilters({ ...filters, page })}
            onChangeRowsPerPage={perPage => setFilters({ ...filters, perPage })}
            progressPending={loading}
            noDataComponent={
                <div className="p-10">
                    <p className="text-sm text-center">Aucun Event</p>
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

const EditButton: React.FC<{ event: Event }> = ({ event }) => {
    const { push } = useRouter();

    return (
        <Tooltip label={'Modifier'} position={'left'}>
            <ActionIcon size={'xs'} color={'green'} onClick={() => push(`/events/${event.id}`)}>
                <IconPencil />
            </ActionIcon>
        </Tooltip>
    );
};

const DeleteButton: React.FC<{ event: Event }> = ({ event }) => {
    const [opened, { open, close }] = useDisclosure(false);
    const [loading, setLoading] = React.useState<boolean>(false);

    const { reload } = useRouter();

    const handleDelete = async () => {
        setLoading(true);

        try {
            await EventsGateway.DeleteEvent(event.id);

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
                title={<p className="font-medium">Supprimer l&apos;Evenement</p>}
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

const columns: TableColumn<Event>[] = [
    {
        name: 'Titre',
        grow: 2,
        selector: row => row.title,
    },
    {
        name: "Date de l'evenement",
        grow: 1,
        selector: row => new Date(row.eventDate).toLocaleDateString(),
    },
    {
        name: 'Date de debut',
        grow: 1,
        selector: row => new Date(row.startDate).toLocaleDateString(),
    },
    {
        name: 'Date de fin',
        grow: 1,
        selector: row => new Date(row.endDate).toLocaleDateString(),
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
        cell: row => <EditButton event={row} />,
    },
    {
        name: '',
        width: '100px',
        cell: row => <DeleteButton event={row} />,
    },
];

export { Events };
