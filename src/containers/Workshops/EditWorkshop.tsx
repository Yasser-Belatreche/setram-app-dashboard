import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import { DateTimePicker } from '@mantine/dates';
import { notifications } from '@mantine/notifications';
import { IconClock, IconLetterCase } from '@tabler/icons-react';
import { Button, Loader, MultiSelect, Switch, Textarea, TextInput } from '@mantine/core';

import { Departments } from '../../utils/Departments';

import { Layout } from '../../components/Layout/Layout';
import { PageHeaders } from '../../components/PageHeaders';

import { GatewayException } from '../../core/GatewayException';
import { WorkshopsGateway } from '../../core/workshops/WorkshopsGateway';
import { Workshop } from '../../core/workshops/api-contract/base/Workshop';
import { EditWorkshopBody } from '../../core/workshops/api-contract/edit-workshop/EditWorkshopBody';

const EditWorkshop: React.FC = () => {
    const { query } = useRouter();

    const workshopRef = useRef<Workshop>();
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        if (!query['id']) return;

        WorkshopsGateway.GetWorkshop(query['id'] as string)
            .then(workshop => {
                setLoading(false);
                workshopRef.current = workshop;
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
            <PageHeaders title={'Modifier Atelier'} subTitle={'Ateliers'} />

            <div className={'bg-white p-4 h-full w-full'}>
                {loading && (
                    <div className="flex w-full justify-center py-10">
                        <Loader />
                    </div>
                )}

                {workshopRef.current && <EditWorkshopForm workshop={workshopRef.current!} />}
            </div>
        </Layout>
    );
};

const EditWorkshopForm: React.FC<{ workshop: Workshop }> = ({ workshop }) => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [formValues, setFormValues] = React.useState<EditWorkshopBody>(workshop);

    const { push } = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            await WorkshopsGateway.EditWorkshop(workshop.id, formValues);
            await push('/workshops');
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

                <DateTimePicker
                    placeholder="Date de l'evenement"
                    label="Date de l'evenement"
                    className={'w-full'}
                    rightSection={<IconClock className="text-gray-400" size={20} />}
                    value={new Date(formValues.workshopDate)}
                    onChange={workshopDate =>
                        setFormValues({
                            ...formValues,
                            workshopDate: workshopDate ?? formValues.workshopDate,
                        })
                    }
                    required
                    withAsterisk
                />

                <div className={'sm:flex gap-4 items-center'}>
                    <DateTimePicker
                        placeholder="Date de debut"
                        label="Date de debut"
                        className={'w-full'}
                        rightSection={<IconClock className="text-gray-400" size={20} />}
                        value={new Date(formValues.startDate)}
                        onChange={startDate =>
                            setFormValues({
                                ...formValues,
                                startDate: startDate ?? formValues.startDate,
                            })
                        }
                        required
                        withAsterisk
                    />
                    <DateTimePicker
                        placeholder="Date de fin"
                        label="Date de fin"
                        className={'w-full'}
                        rightSection={<IconClock className="text-gray-400" size={20} />}
                        value={new Date(formValues.endDate)}
                        onChange={endDate =>
                            setFormValues({ ...formValues, endDate: endDate ?? formValues.endDate })
                        }
                        required
                        withAsterisk
                    />
                </div>

                <Button type="submit" size="md" fullWidth loading={loading}>
                    Confirmer
                </Button>
            </div>
        </form>
    );
};
export { EditWorkshop };
