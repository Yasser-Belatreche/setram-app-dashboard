import React from 'react';

import DataTable, { TableColumn } from 'react-data-table-component';
import { Layout } from '../../components/Layout/Layout';
import { ActionIcon, Badge, Button, Loader, Modal, Tooltip } from '@mantine/core';
import { PageHeaders } from '../../components/PageHeaders';
import { IconPencil, IconPlus, IconTrash } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

const columns: TableColumn<(typeof data)[number]>[] = [
    {
        name: 'Titre',
        grow: 2,
        selector: row => row.title,
    },
    {
        name: 'Date de creation',
        grow: 1,
        selector: row => row.title,
    },
    {
        name: 'Derniere modification',
        grow: 1,
        selector: row => row.title,
    },
    {
        name: 'Deparetement',
        grow: 3,
        cell: row => (
            <div className={'flex gap-2 py-4 items-center flex-wrap w-full'}>
                <Badge>row.year</Badge>
                <Badge>row.year</Badge>
            </div>
        ),
    },
    {
        name: '',
        width: '40px',
        cell: row => (
            <Tooltip label={'Modifier'} position={'left'}>
                <ActionIcon size={'xs'} color={'green'}>
                    <IconPencil />
                </ActionIcon>
            </Tooltip>
        ),
    },
    {
        name: '',
        width: '100px',
        selector: row => row.year,
        cell: row => (
            <Tooltip label={'Supprimer'} position={'left'}>
                <ActionIcon size={'xs'} color={'red'}>
                    <IconTrash />
                </ActionIcon>
            </Tooltip>
        ),
    },
];

const data = [
    {
        id: 1,
        title: 'Beetlejuice',
        year: '1988',
    },
    {
        id: 2,
        title: 'Ghostbusters',
        year: '1984',
    },
];

const Documents: React.FC = () => {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <Layout>
            <PageHeaders title={'Documents'} subTitle={'List'} />

            <div className={'flex justify-end bg-white p-4'}>
                <Button onClick={open} rightIcon={<IconPlus />} size={'sm'}>
                    Ajouter Document
                </Button>
            </div>

            <Modal
                centered
                opened={opened}
                onClose={close}
                title={<p className="font-medium">Supprimer le Document</p>}
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

            <DataTable
                columns={columns}
                data={data}
                highlightOnHover
                pagination
                progressPending={false}
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
        </Layout>
    );
};

export { Documents };
