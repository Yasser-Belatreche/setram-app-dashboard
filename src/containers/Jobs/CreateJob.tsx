import React from 'react';
import { DateTimePicker } from '@mantine/dates';
import {
    IconAt,
    IconCalendar,
    IconClock,
    IconLetterCase,
    IconLocation,
    IconMoneybag,
    IconUser,
} from '@tabler/icons-react';
import { Button, MultiSelect, Switch, Textarea, TextInput } from '@mantine/core';

import { Departments } from '../../utils/Departments';

import { Layout } from '../../components/Layout/Layout';
import { PageHeaders } from '../../components/PageHeaders';

const CreateJob: React.FC = () => {
    return (
        <Layout>
            <PageHeaders title={'Ajouter Post de travail'} subTitle={'Post de travails'} />

            <form className={'bg-white p-4 h-full w-full'}>
                <div className={'flex flex-col gap-4'}>
                    <TextInput
                        placeholder="Titre"
                        label="Titre"
                        type="text"
                        className={'w-full'}
                        rightSection={<IconLetterCase className="text-gray-400" size={20} />}
                        required
                        withAsterisk
                    />
                    <div className={'flex gap-4 items-center'}>
                        <MultiSelect
                            placeholder="Departements"
                            label="Departements"
                            type="text"
                            className={'w-full'}
                            data={Departments}
                            required
                            withAsterisk
                        />
                        <Switch label="Tout" className={'mt-6'} />
                    </div>

                    <Textarea
                        placeholder="Description"
                        label="Description"
                        className={'w-full'}
                        required
                        withAsterisk
                    />

                    <TextInput
                        placeholder="Bebezzouar, Alger"
                        label="Location"
                        type="text"
                        className={'w-full'}
                        rightSection={<IconLocation className="text-gray-400" size={20} />}
                        required
                        withAsterisk
                    />

                    <TextInput
                        placeholder="60 000 DA"
                        label="Salaire"
                        type="text"
                        className={'w-full'}
                        rightSection={<IconMoneybag className="text-gray-400" size={20} />}
                        required
                        withAsterisk
                    />

                    <TextInput
                        placeholder="3 ans dans le marketing"
                        label="Experience"
                        type="text"
                        className={'w-full'}
                        rightSection={<IconCalendar className="text-gray-400" size={20} />}
                        required
                        withAsterisk
                    />

                    <TextInput
                        label="Education"
                        placeholder="Bac + 5"
                        type="text"
                        className={'w-full'}
                        rightSection={<IconUser className="text-gray-400" size={20} />}
                        required
                        withAsterisk
                    />

                    <MultiSelect
                        label="Skills"
                        placeholder="Les skills nécessaire..."
                        type="text"
                        className={'w-full'}
                        data={[]}
                        getCreateLabel={query => `Ajouter ${query}`}
                        creatable
                        searchable
                        required
                        withAsterisk
                    />

                    <MultiSelect
                        label="Avantages"
                        placeholder="Pourquoi appliquer pour ce job?"
                        type="text"
                        className={'w-full'}
                        getCreateLabel={query => `Ajouter ${query}`}
                        data={[]}
                        creatable
                        searchable
                        required
                        withAsterisk
                    />

                    <TextInput
                        label="Contact"
                        placeholder="setram@gmail.com"
                        type="text"
                        className={'w-full'}
                        rightSection={<IconAt className="text-gray-400" size={20} />}
                        required
                        withAsterisk
                    />

                    <DateTimePicker
                        placeholder="Date max d'application"
                        label="Date max d'application"
                        className={'w-full'}
                        rightSection={<IconClock className="text-gray-400" size={20} />}
                        required
                        withAsterisk
                    />

                    <Button type="submit" size="md" fullWidth loading={false}>
                        Ajouter
                    </Button>
                </div>
            </form>
        </Layout>
    );
};

export { CreateJob };
