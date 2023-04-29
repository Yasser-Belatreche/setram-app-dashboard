import React, { useRef } from 'react';
import { TimeInput } from '@mantine/dates';
import { ActionIcon, Button, Group, TextInput } from '@mantine/core';

import { Layout } from '../../components/Layout/Layout';
import { PageHeaders } from '../../components/PageHeaders';
import {
    IconCheck,
    IconClock,
    IconLetterCase,
    IconPencil,
    IconPlus,
    IconTrash,
    IconX,
} from '@tabler/icons-react';
import { Separator } from '../../components/Separator';

const EditEmployeePlanning: React.FC = () => {
    return (
        <Layout>
            <PageHeaders title={"Modifier l'horaire de l'employéee"} subTitle={'Employees'} />

            <form className={'bg-white p-4 h-full w-full'}>
                <div>
                    <h3>Dimanche</h3>

                    <div className={'sm:flex gap-4 mb-4 align-center'}>
                        <TextInput
                            placeholder="Descriptin de l'Activité"
                            label="Activité"
                            type="text"
                            disabled
                            className={'w-full'}
                            rightSection={<IconLetterCase className="text-gray-400" size={20} />}
                            required
                            withAsterisk
                        />
                        <TimePickerInput label={'Heure de Debut'} disabled />
                        <TimePickerInput label={'Heure de Fin'} disabled />

                        <div className={'flex gap-2 items-center justify-center mt-4 sm:mt-0'}>
                            <ActionIcon color={'green'} variant="outline">
                                <IconPencil />
                            </ActionIcon>
                            <ActionIcon color={'red'} variant="outline">
                                <IconTrash />
                            </ActionIcon>
                        </div>
                    </div>

                    <div className={'sm:flex gap-4 mb-4 align-center'}>
                        <TextInput
                            placeholder="Descriptin de l'Activité"
                            label="Activité"
                            type="text"
                            className={'w-full'}
                            rightSection={<IconLetterCase className="text-gray-400" size={20} />}
                            required
                            withAsterisk
                        />
                        <TimePickerInput label={'Heure de Debut'} />
                        <TimePickerInput label={'Heure de Fin'} />

                        <div className={'flex gap-2 items-center justify-center mt-4 sm:mt-0'}>
                            <ActionIcon color={'blue'} variant="outline">
                                <IconCheck />
                            </ActionIcon>
                            <ActionIcon color={'red'} variant="outline">
                                <IconX />
                            </ActionIcon>
                        </div>
                    </div>
                    <Button
                        variant={'light'}
                        size="sm"
                        leftIcon={<IconPlus />}
                        fullWidth
                        loading={false}
                    >
                        Ajouter une plage horaire
                    </Button>
                </div>

                <Separator />

                <Group spacing={'md'}>
                    <h3>Lundi</h3>
                </Group>

                <Separator />

                <Group spacing={'md'}>
                    <h3>Mardi</h3>
                </Group>

                <Separator />

                <Group spacing={'md'}>
                    <h3>Mercredi</h3>
                </Group>

                <Separator />

                <Group spacing={'md'}>
                    <h3>Jeudi</h3>
                </Group>

                <Separator />

                <Group spacing={'md'}>
                    <h3>Venderedi</h3>
                </Group>

                <Separator />

                <Group spacing={'md'}>
                    <h3>Samedi</h3>
                </Group>

                <Separator />

                <Button type="submit" size="md" fullWidth loading={false}>
                    Confirmer
                </Button>
            </form>
        </Layout>
    );
};

interface Props {
    label: string;
    disabled?: boolean;
}

const TimePickerInput: React.FC<Props> = ({ label, disabled }) => {
    const ref = useRef<HTMLInputElement>(null);

    return (
        <TimeInput
            label={label}
            ref={ref}
            disabled={disabled}
            onClick={() => ref.current?.showPicker()}
            onChange={event => console.log(event.target.value)}
            rightSection={
                <ActionIcon onClick={() => ref.current?.showPicker()}>
                    <IconClock className="text-gray-400" size={20} />
                </ActionIcon>
            }
            className={'w-full'}
        />
    );
};

export { EditEmployeePlanning };
