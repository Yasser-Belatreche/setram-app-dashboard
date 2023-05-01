import React from 'react';
import { useRouter } from 'next/router';
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
import { notifications } from '@mantine/notifications';
import { Button, MultiSelect, Switch, Textarea, TextInput } from '@mantine/core';

import { Departments } from '../../utils/Departments';

import { Layout } from '../../components/Layout/Layout';
import { PageHeaders } from '../../components/PageHeaders';

import { JobsGateway } from '../../core/jobs/JobsGateway';
import { GatewayException } from '../../core/GatewayException';
import { CreateJobBody } from '../../core/jobs/api-contract/create-job/CreateJobBody';

const CreateJob: React.FC = () => {
    return (
        <Layout>
            <PageHeaders title={'Ajouter Post de travail'} subTitle={'Post de travails'} />

            <CreateJobForm />
        </Layout>
    );
};

const CreateJobForm = () => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [formValues, setFormValues] = React.useState<CreateJobBody>({
        title: '',
        description: '',
        contact: '',
        education: '',
        experience: '',
        location: '',
        salary: '',
        departments: [],
        benefits: [],
        skills: [],
        applicationDeadline: new Date(),
    });

    const { push } = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            await JobsGateway.CreateJob(formValues);
            await push('/jobs');
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
        <form className={'bg-white p-4 h-full w-full'} onSubmit={handleSubmit}>
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

                <TextInput
                    placeholder="Bebezzouar, Alger"
                    label="Location"
                    type="text"
                    className={'w-full'}
                    rightSection={<IconLocation className="text-gray-400" size={20} />}
                    value={formValues.location}
                    onChange={e => setFormValues({ ...formValues, location: e.target.value })}
                    required
                    withAsterisk
                />

                <TextInput
                    placeholder="60 000 DA"
                    label="Salaire"
                    type="text"
                    className={'w-full'}
                    rightSection={<IconMoneybag className="text-gray-400" size={20} />}
                    value={formValues.salary}
                    onChange={e => setFormValues({ ...formValues, salary: e.target.value })}
                    required
                    withAsterisk
                />

                <TextInput
                    placeholder="3 ans dans le marketing"
                    label="Experience"
                    type="text"
                    className={'w-full'}
                    rightSection={<IconCalendar className="text-gray-400" size={20} />}
                    value={formValues.experience}
                    onChange={e => setFormValues({ ...formValues, experience: e.target.value })}
                    required
                    withAsterisk
                />

                <TextInput
                    label="Education"
                    placeholder="Bac + 5"
                    type="text"
                    className={'w-full'}
                    rightSection={<IconUser className="text-gray-400" size={20} />}
                    value={formValues.education}
                    onChange={e => setFormValues({ ...formValues, education: e.target.value })}
                    required
                    withAsterisk
                />

                <MultiSelect
                    label="Skills"
                    placeholder="Les skills nécessaire..."
                    type="text"
                    className={'w-full'}
                    getCreateLabel={query => `Ajouter ${query}`}
                    data={formValues.skills}
                    value={formValues.skills}
                    onChange={skills => setFormValues({ ...formValues, skills })}
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
                    data={formValues.benefits}
                    value={formValues.benefits}
                    onChange={benefits => setFormValues({ ...formValues, benefits })}
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
                    value={formValues.contact}
                    onChange={e => setFormValues({ ...formValues, contact: e.target.value })}
                    required
                    withAsterisk
                />

                <DateTimePicker
                    placeholder="Date max d'application"
                    label="Date max d'application"
                    className={'w-full'}
                    rightSection={<IconClock className="text-gray-400" size={20} />}
                    value={formValues.applicationDeadline}
                    onChange={date =>
                        setFormValues({
                            ...formValues,
                            applicationDeadline: date ?? formValues.applicationDeadline,
                        })
                    }
                    required
                    withAsterisk
                />

                <Button type="submit" size="md" fullWidth loading={loading}>
                    Ajouter
                </Button>
            </div>
        </form>
    );
};

export { CreateJob };
