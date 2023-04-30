import React from 'react';
import { Button, MultiSelect, Switch, Textarea, TextInput } from '@mantine/core';
import { IconLetterCase, IconUpload } from '@tabler/icons-react';

import { Departments } from '../../utils/Departments';

import { PdfViewer } from '../../components/PdfViewer';
import { Layout } from '../../components/Layout/Layout';
import { PageHeaders } from '../../components/PageHeaders';

const EditDocument: React.FC = () => {
    return (
        <Layout>
            <PageHeaders title={'Modifier Document'} subTitle={'Documents'} />

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

                    <PdfViewer
                        link={
                            'https://firebasestorage.googleapis.com/v0/b/yalidine-documents.appspot.com/o/documents%2F1654440-Proc%C3%A9dure%20des%20ventes.pdf?alt=media&token=20ce6745-9166-4dfe-8919-a36742967b0f'
                        }
                    />

                    <Button size={'sm'} variant={'light'} leftIcon={<IconUpload />}>
                        Changer le document
                    </Button>

                    <Button type="submit" size="md" loading={false} fullWidth>
                        Confirmer
                    </Button>
                </div>
            </form>
        </Layout>
    );
};

export { EditDocument };
