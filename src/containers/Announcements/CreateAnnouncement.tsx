import React from 'react';
import { Button, MultiSelect, Switch, Textarea, TextInput } from '@mantine/core';
import { IconClock, IconLetterCase } from '@tabler/icons-react';

import { DEPARTMENTS } from '../../utils/DEPARTMENTS';

import { Layout } from '../../components/Layout/Layout';
import { PageHeaders } from '../../components/PageHeaders';
import { DateTimePicker } from '@mantine/dates';

const CreateAnnouncement: React.FC = () => {
    return (
        <Layout>
            <PageHeaders title={'Ajouter Annonce'} subTitle={'Annonces'} />

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
                            data={DEPARTMENTS}
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

                    <div className={'sm:flex gap-4 items-center'}>
                        <DateTimePicker
                            placeholder="Date de debut"
                            label="Date de debut"
                            className={'w-full'}
                            rightSection={<IconClock className="text-gray-400" size={20} />}
                            required
                            withAsterisk
                        />
                        <DateTimePicker
                            placeholder="Date de fin"
                            label="Date de fin"
                            className={'w-full'}
                            rightSection={<IconClock className="text-gray-400" size={20} />}
                            required
                            withAsterisk
                        />
                    </div>

                    <Button type="submit" size="md" fullWidth loading={false}>
                        Ajouter
                    </Button>
                </div>
            </form>
        </Layout>
    );
};

export { CreateAnnouncement };
