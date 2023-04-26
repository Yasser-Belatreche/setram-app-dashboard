import React from 'react';

import DataTable, { TableColumn } from 'react-data-table-component';
import { Layout } from '../../components/Layout/Layout';
import { Loader } from '@mantine/core';
import { PageHeaders } from '../../components/PageHeaders';

const columns: TableColumn<(typeof data)[number]>[] = [
    {
        name: 'Title',
        selector: row => row.title,
    },
    {
        name: 'Year',
        selector: row => row.year,
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

const Employees: React.FC = () => {
    return (
        <Layout>
            <PageHeaders title={'Employees'} subTitle={'List'} />

            <DataTable
                columns={columns}
                data={data}
                highlightOnHover
                pagination
                progressPending={false}
                noDataComponent={
                    <div className="p-4">
                        <p className="text-sm text-center">Aucun Employee</p>
                    </div>
                }
                progressComponent={
                    <div className="flex w-full justify-center">
                        <Loader />
                    </div>
                }
            />
        </Layout>
    );
};

export { Employees };
