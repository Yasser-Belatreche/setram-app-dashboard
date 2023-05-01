import React, { useEffect, useRef, useState } from 'react';
import { TimeInput } from '@mantine/dates';
import { ActionIcon, Button, Loader, TextInput } from '@mantine/core';
import {
    IconCheck,
    IconClock,
    IconLetterCase,
    IconPencil,
    IconPlus,
    IconTrash,
    IconX,
} from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { notifications } from '@mantine/notifications';

import { Separator } from '../../components/Separator';
import { Layout } from '../../components/Layout/Layout';
import { PageHeaders } from '../../components/PageHeaders';

import { GatewayException } from '../../core/GatewayException';
import { EmployeesGateway } from '../../core/employees/EmployeesGateway';
import {
    DayTiming,
    EmployeePlanning,
    Time,
} from '../../core/employees/api-contract/base/EmployeePlanning';

const EditEmployeePlanning: React.FC = () => {
    const { query } = useRouter();

    const [loading, setLoading] = useState(true);
    const planningRef = useRef<EmployeePlanning>();

    useEffect(() => {
        if (!query['id']) return;

        EmployeesGateway.GetEmployeePlanning(query['id'] as string)
            .then(planning => {
                setLoading(false);
                planningRef.current = planning;
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
            <PageHeaders title={"Modifier l'horaire de l'employéee"} subTitle={'Employees'} />

            <div className={'bg-white p-4 h-full w-full'}>
                {loading && (
                    <div className="flex w-full justify-center py-10">
                        <Loader />
                    </div>
                )}

                {planningRef.current && (
                    <PlanningForm
                        employeeId={query['id'] as string}
                        planning={planningRef.current}
                    />
                )}
            </div>
        </Layout>
    );
};

const PlanningForm: React.FC<{ employeeId: string; planning: EmployeePlanning }> = ({
    employeeId,
    planning,
}) => {
    const { push } = useRouter();

    const [loading, setLoading] = useState<boolean>(false);
    const [formValues, setFromValues] = useState<EmployeePlanning>(planning);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const thereAreEmptyFields = Object.values(formValues).some((timings: DayTiming[]) =>
            timings.some(timing => !timing.label),
        );

        if (thereAreEmptyFields) return alert('vous devez remplir tous les champs');

        setLoading(true);

        try {
            await EmployeesGateway.EditEmployeePlanning(employeeId, formValues);
            await push('/employees');
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
            <DayTimingForm
                title={'Dimanche'}
                timings={formValues.sunday}
                onChange={sunday => setFromValues({ ...formValues, sunday })}
            />

            <Separator />

            <DayTimingForm
                title={'Lundi'}
                timings={formValues.monday}
                onChange={monday => setFromValues({ ...formValues, monday })}
            />

            <Separator />

            <DayTimingForm
                title={'Mardi'}
                timings={formValues.tuesday}
                onChange={tuesday => setFromValues({ ...formValues, tuesday })}
            />

            <Separator />

            <DayTimingForm
                title={'Mercredi'}
                timings={formValues.wednesday}
                onChange={wednesday => setFromValues({ ...formValues, wednesday })}
            />

            <Separator />

            <DayTimingForm
                title={'Jeudi'}
                timings={formValues.thursday}
                onChange={thursday => setFromValues({ ...formValues, thursday })}
            />

            <Separator />

            <DayTimingForm
                title={'Venderedi'}
                timings={formValues.friday}
                onChange={friday => setFromValues({ ...formValues, friday })}
            />

            <Separator />

            <DayTimingForm
                title={'Samedi'}
                timings={formValues.saturday}
                onChange={saturday => setFromValues({ ...formValues, saturday })}
            />

            <Separator />

            <Button type="submit" size="md" fullWidth loading={loading}>
                Confirmer
            </Button>
        </form>
    );
};

const DayTimingForm: React.FC<{
    title: string;
    timings: DayTiming[];
    onChange: (timing: DayTiming[]) => void;
}> = props => {
    const { timings, title, onChange } = props;

    const handleTimeSlotChange = (index: number, slot: DayTiming | null) => {
        if (slot) {
            const temp = [...timings];

            temp[index] = slot;

            onChange(temp);
        } else {
            const temp = [...timings];

            temp.splice(index, 1);

            onChange(temp);
        }
    };

    const handleAddTimeSlotClick = () => {
        onChange([
            ...timings,
            { label: '', start: { hour: 0, minute: 0 }, end: { hour: 0, minute: 0 } },
        ]);
    };

    return (
        <div>
            <h3>{title}</h3>

            {timings.map((slot, index) => (
                <TimeSlot
                    key={index}
                    slot={slot}
                    onChange={slot => handleTimeSlotChange(index, slot)}
                />
            ))}

            <Button
                variant={'light'}
                size="sm"
                className={'mt-4'}
                leftIcon={<IconPlus />}
                onClick={handleAddTimeSlotClick}
                fullWidth
            >
                Ajouter une plage horaire
            </Button>
        </div>
    );
};

const TimeSlot: React.FC<{
    slot: DayTiming;
    onChange: (slot: DayTiming | null) => void;
}> = props => {
    const [slot, setSlot] = useState(props.slot);
    const [isEditing, setIsEditing] = useState(!slot.label);

    const handleConfirmEdit = () => {
        if (!isEditing) return;

        props.onChange(slot);
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        if (!isEditing) return;

        setSlot(props.slot);
        setIsEditing(false);
    };

    const handleDelete = () => {
        if (isEditing) return;

        props.onChange(null);
    };

    return (
        <div className={'sm:flex gap-4 mb-4 align-center'}>
            <TextInput
                placeholder="Descriptin de l'Activité"
                label="Activité"
                type="text"
                disabled={!isEditing}
                className={'w-full'}
                rightSection={<IconLetterCase className="text-gray-400" size={20} />}
                value={slot.label}
                onChange={e => setSlot({ ...slot, label: e.target.value })}
                required
                withAsterisk
            />
            <TimePickerInput
                label={'Heure de Debut'}
                value={slot.start}
                onChange={start => setSlot({ ...slot, start })}
                disabled={!isEditing}
            />
            <TimePickerInput
                label={'Heure de Fin'}
                value={slot.end}
                onChange={end => setSlot({ ...slot, end })}
                disabled={!isEditing}
            />

            <div className={'flex gap-2 items-center justify-center mt-4 sm:mt-0'}>
                {isEditing ? (
                    <>
                        <ActionIcon color={'blue'} variant="outline" onClick={handleConfirmEdit}>
                            <IconCheck />
                        </ActionIcon>
                        <ActionIcon color={'red'} variant="outline" onClick={handleCancelEdit}>
                            <IconX />
                        </ActionIcon>
                    </>
                ) : (
                    <>
                        <ActionIcon
                            color={'green'}
                            variant="outline"
                            onClick={() => setIsEditing(true)}
                        >
                            <IconPencil />
                        </ActionIcon>
                        <ActionIcon color={'red'} variant="outline" onClick={handleDelete}>
                            <IconTrash />
                        </ActionIcon>
                    </>
                )}
            </div>
        </div>
    );
};

const TimePickerInput: React.FC<{
    label: string;
    disabled?: boolean;
    value: Time;
    onChange: (value: Time) => void;
}> = props => {
    const { label, disabled, onChange, value } = props;
    const ref = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const [hour, minute] = value.split(':');

        onChange({ hour: parseInt(hour), minute: parseInt(minute) });
    };

    return (
        <TimeInput
            label={label}
            ref={ref}
            disabled={disabled}
            onClick={() => ref.current?.showPicker()}
            value={`${value.hour.toString().padStart(2, '0')}:${value.minute
                .toString()
                .padStart(2, '0')}`}
            onChange={handleChange}
            rightSection={
                <ActionIcon onClick={() => !disabled && ref.current?.showPicker()}>
                    <IconClock className="text-gray-400" size={20} />
                </ActionIcon>
            }
            className={'w-full'}
        />
    );
};

export { EditEmployeePlanning };
