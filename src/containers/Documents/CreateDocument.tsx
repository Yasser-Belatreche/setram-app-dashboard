import React from 'react';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { Button, MultiSelect, Switch, Textarea, TextInput } from '@mantine/core';
import { IconLetterCase } from '@tabler/icons-react';

import { DEPARTEMENTS } from '../../utils/Departements';

import { Layout } from '../../components/Layout/Layout';
import { PageHeaders } from '../../components/PageHeaders';

const CreateDocument: React.FC = () => {
    return (
        <Layout>
            <PageHeaders title={'Ajouter Document'} subTitle={'Documents'} />

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
                            data={DEPARTEMENTS}
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

                    <Dropzone onDrop={() => {}} accept={[MIME_TYPES.pdf]} multiple={false}>
                        <div className="h-40 flex items-center justify-center">
                            <p className="text-gray-500 text-center">Ajouter votre fichier .PDF</p>
                        </div>
                    </Dropzone>

                    <Button type="submit" size="md" fullWidth loading={false}>
                        Ajouter
                    </Button>
                </div>
            </form>
        </Layout>
    );
};

export { CreateDocument };
