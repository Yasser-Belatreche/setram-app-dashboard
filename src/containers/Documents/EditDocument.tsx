import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { notifications } from '@mantine/notifications';
import { IconLetterCase, IconUpload } from '@tabler/icons-react';
import { Button, Loader, MultiSelect, Switch, Textarea, TextInput } from '@mantine/core';

import { Departments } from '../../utils/Departments';

import { PdfViewer } from '../../components/PdfViewer';
import { Layout } from '../../components/Layout/Layout';
import { PageHeaders } from '../../components/PageHeaders';

import { GatewayException } from '../../core/GatewayException';
import { DocumentsGateway } from '../../core/documents/DocumentsGateway';
import { Document } from '../../core/documents/api-contract/base/Document';
import { EditDocumentBody } from '../../core/documents/api-contract/edit-document/EditDocumentBody';

const EditDocument: React.FC = () => {
    const { query } = useRouter();

    const [loading, setLoading] = React.useState(true);
    const documentRef = useRef<Document>();

    useEffect(() => {
        if (!query['id']) return;

        DocumentsGateway.GetDocument(query['id'] as string)
            .then(document => {
                setLoading(false);
                documentRef.current = document;
            })
            .catch(e => {
                setLoading(false);

                if (e instanceof GatewayException)
                    return notifications.show({ message: e.message, title: 'Error', color: 'red' });
                if (e instanceof Error)
                    return notifications.show({ message: e.message, title: 'Error', color: 'red' });

                return notifications.show({ message: 'Something went wrong', color: 'red' });
            });
    }, [query]);

    return (
        <Layout>
            <PageHeaders title={'Modifier Document'} subTitle={'Documents'} />

            <div className={'bg-white p-4 h-full w-full'}>
                {loading && (
                    <div className="flex w-full justify-center py-10">
                        <Loader />
                    </div>
                )}

                {documentRef.current && <EditDocumentForm document={documentRef.current!} />}
            </div>
        </Layout>
    );
};

const EditDocumentForm: React.FC<{ document: Document }> = ({ document }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [formValues, setFormValues] = React.useState<EditDocumentBody>({
        ...document,
        document: undefined,
    });

    const { push } = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            await DocumentsGateway.EditDocument(document.id, formValues);
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
        <form onSubmit={handleSubmit}>
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

                <PdfViewer
                    link={
                        formValues.document
                            ? URL.createObjectURL(formValues.document)
                            : DocumentsGateway.GetDocumentFileLink(document.id)
                    }
                />

                <Button
                    size={'sm'}
                    variant={'light'}
                    leftIcon={<IconUpload />}
                    onClick={() => inputRef.current?.showPicker()}
                >
                    Changer le document
                </Button>
                <input
                    ref={inputRef}
                    type={'file'}
                    accept={'application/pdf'}
                    onChange={e => setFormValues({ ...formValues, document: e.target.files?.[0] })}
                    multiple={false}
                    hidden
                />

                <Button type="submit" size="md" loading={loading} fullWidth>
                    Confirmer
                </Button>
            </div>
        </form>
    );
};
export { EditDocument };
