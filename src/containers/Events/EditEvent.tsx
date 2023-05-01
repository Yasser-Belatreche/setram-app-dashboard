import { useRouter } from 'next/router';
import { DateTimePicker } from '@mantine/dates';
import React, { useEffect, useRef } from 'react';
import { notifications } from '@mantine/notifications';
import { Button, Loader, MultiSelect, Switch, Textarea, TextInput } from '@mantine/core';
import { IconClock, IconLetterCase } from '@tabler/icons-react';

import { Departments } from '../../utils/Departments';

import { Layout } from '../../components/Layout/Layout';
import { PageHeaders } from '../../components/PageHeaders';

import { Event } from '../../core/events/api-contract/base/Event';
import { GatewayException } from '../../core/GatewayException';
import { EventsGateway } from '../../core/events/EventsGateway';
import { EditEventBody } from '../../core/events/api-contract/edit-event/EditEventBody';

const EditEvent: React.FC = () => {
    const { query } = useRouter();

    const eventRef = useRef<Event>();
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        if (!query['id']) return;

        EventsGateway.GetEvent(query['id'] as string)
            .then(event => {
                setLoading(false);
                eventRef.current = event;
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
            <PageHeaders title={'Modifier Evenement'} subTitle={'Evenements'} />

            <div className={'bg-white p-4 h-full w-full'}>
                {loading && (
                    <div className="flex w-full justify-center py-10">
                        <Loader />
                    </div>
                )}

                {eventRef.current && <EditEventForm event={eventRef.current!} />}
            </div>
        </Layout>
    );
};

const EditEventForm: React.FC<{ event: Event }> = ({ event }) => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [formValues, setFormValues] = React.useState<EditEventBody>(event);

    const { push } = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            await EventsGateway.EditEvent(event.id, formValues);
            await push('/events');
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
                    value={new Date(formValues.eventDate)}
                    onChange={eventDate =>
                        setFormValues({
                            ...formValues,
                            eventDate: eventDate ?? formValues.eventDate,
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

export { EditEvent };
