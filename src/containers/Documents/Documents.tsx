import React, { useEffect } from 'react';
import { useDisclosure } from '@mantine/hooks';
import DataTable, { TableColumn } from 'react-data-table-component';
import { IconPencil, IconPlus, IconTrash } from '@tabler/icons-react';
import { ActionIcon, Badge, Button, Loader, Modal, Tooltip } from '@mantine/core';

import { Layout } from '../../components/Layout/Layout';
import { PageHeaders } from '../../components/PageHeaders';
import { Document } from '../../core/documents/api-contract/base/Document';
import { useRouter } from 'next/router';
import { GatewayException } from '../../core/GatewayException';
import { notifications } from '@mantine/notifications';
import { GetDocumentsQueryParams } from '../../core/documents/api-contract/get-documents/GetDocumentsQueryParams';
import { DocumentsGateway } from '../../core/documents/DocumentsGateway';

const Documents: React.FC = () => {
    const { push } = useRouter();

    return (
        <Layout>
            <PageHeaders title={'Documents'} subTitle={'List'} />

            <div className={'flex justify-end bg-white p-4'}>
                <Button
                    size={'sm'}
                    rightIcon={<IconPlus />}
                    onClick={() => push('/documents/create')}
                >
                    Ajouter Document
                </Button>
            </div>

            <DocumentsTable />
        </Layout>
    );
};

const DocumentsTable = () => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [filters, setFilters] = React.useState<GetDocumentsQueryParams>({ page: 1, perPage: 25 });
    const [documents, setDocuments] = React.useState<{ list: Document[]; total: number }>({
        list: [],
        total: 0,
    });

    useEffect(() => {
        setLoading(true);

        DocumentsGateway.GetDocuments(filters)
            .then(({ pagination, list }) => setDocuments({ list, total: pagination.total }))
            .catch(() => {
                notifications.show({
                    message: 'Une erreur est survenue lors de la récupération des documents',
                    color: 'red',
                });
            })
            .finally(() => setLoading(false));
    }, [filters]);

    return (
        <DataTable
            columns={columns}
            data={documents.list}
            highlightOnHover
            pagination
            paginationTotalRows={documents.total}
            paginationPerPage={filters.perPage}
            paginationDefaultPage={filters.page}
            onChangePage={page => setFilters({ ...filters, page })}
            onChangeRowsPerPage={perPage => setFilters({ ...filters, perPage })}
            progressPending={loading}
            noDataComponent={
                <div className="p-10">
                    <p className="text-sm text-center">Aucun Document</p>
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

const EditButton: React.FC<{ document: Document }> = ({ document }) => {
    const { push } = useRouter();

    return (
        <Tooltip label={'Modifier'} position={'left'}>
            <ActionIcon
                size={'xs'}
                color={'green'}
                onClick={() => push(`/documents/${document.id}`)}
            >
                <IconPencil />
            </ActionIcon>
        </Tooltip>
    );
};

const DeleteButton: React.FC<{ document: Document }> = ({ document }) => {
    const [opened, { open, close }] = useDisclosure(false);
    const [loading, setLoading] = React.useState<boolean>(false);

    const { reload } = useRouter();

    const handleDelete = async () => {
        setLoading(true);

        try {
            await DocumentsGateway.DeleteDocument(document.id);

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
                title={<p className="font-medium">Supprimer le Document</p>}
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

const columns: TableColumn<Document>[] = [
    {
        name: 'Titre',
        grow: 1,
        selector: row => row.title,
    },
    {
        name: 'Date de creation',
        grow: 1,
        selector: row => new Date(row.createdAt).toLocaleDateString(),
    },
    {
        name: 'Derniere modification',
        grow: 1,
        selector: row => new Date(row.updatedAt).toLocaleDateString(),
    },
    {
        name: 'Deparetement',
        grow: 3,
        cell: row => (
            <div className={'flex gap-2 py-4 items-center flex-wrap w-full'}>
                {row.departments.map(d => (
                    <Badge>{d}</Badge>
                ))}
            </div>
        ),
    },
    {
        name: '',
        width: '40px',
        cell: row => <EditButton document={row} />,
    },
    {
        name: '',
        width: '100px',
        cell: row => <DeleteButton document={row} />,
    },
];

export { Documents };
