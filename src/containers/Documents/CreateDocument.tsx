import React from 'react';
import { useRouter } from 'next/router';
import { IconLetterCase } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { Button, MultiSelect, Switch, Textarea, TextInput } from '@mantine/core';

import { Departments } from '../../utils/Departments';

import { Layout } from '../../components/Layout/Layout';
import { PageHeaders } from '../../components/PageHeaders';

import { GatewayException } from '../../core/GatewayException';
import { DocumentsGateway } from '../../core/documents/DocumentsGateway';
import { CreateDocumentBody } from '../../core/documents/api-contract/create-document/CreateDocumentBody';
import { Documents } from './Documents';

const CreateDocument: React.FC = () => {
    return (
        <Layout>
            <PageHeaders title={'Ajouter Document'} subTitle={'Documents'} />

            <CreateDocumentForm />
        </Layout>
    );
};

const CreateDocumentForm = () => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [formValues, setFormValues] = React.useState<CreateDocumentBody>({
        title: '',
        description: '',
        departments: [],
        document: null!,
    });

    const { push } = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            await DocumentsGateway.CreateDocument(formValues);
            await push('/documents');
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
        <form onSubmit={handleSubmit} className={'bg-white p-4 h-full w-full'}>
            <div className={'flex flex-col gap-4'}>
                <TextInput
                    placeholder="Titre"
                    label="Titre"
                    type="text"
                    className={'w-full'}
                    rightSection={<IconLetterCase className="text-gray-400" size={20} />}
                    value={formValues.title}
                    onChange={e => setFormValues({ ...formValues, title: e.target.value })}
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
                        value={formValues.departments}
                        onChange={departments => setFormValues({ ...formValues, departments })}
                        required
                        withAsterisk
                    />
                    <Switch
                        label="Tout"
                        className={'mt-6'}
                        onChange={e =>
                            setFormValues({
                                ...formValues,
                                departments: e.currentTarget.checked ? Departments : [],
                            })
                        }
                    />
                </div>

                <Textarea
                    placeholder="Description"
                    label="Description"
                    className={'w-full'}
                    value={formValues.description}
                    onChange={e => setFormValues({ ...formValues, description: e.target.value })}
                    required
                    withAsterisk
                />

                <Dropzone
                    multiple={false}
                    accept={[MIME_TYPES.pdf]}
                    onDrop={files => setFormValues({ ...formValues, document: files[0] })}
                >
                    <div className="h-40 flex items-center justify-center">
                        <p className="text-gray-500 text-center">
                            {formValues.document?.name ?? 'Ajouter votre fichier .PDF'}
                        </p>
                    </div>
                </Dropzone>

                <Button type="submit" size="md" fullWidth loading={loading}>
                    Ajouter
                </Button>
            </div>
        </form>
    );
};

export { CreateDocument };
