import React from 'react';
import { DatePickerInput } from '@mantine/dates';
import { Button, PasswordInput, Select, TextInput } from '@mantine/core';
import { IconCalendar, IconLetterCase, IconMail, IconPhone } from '@tabler/icons-react';

import { Layout } from '../../components/Layout/Layout';
import { PageHeaders } from '../../components/PageHeaders';

import { DEPARTMENTS } from '../../utils/DEPARTMENTS';

const EditEmployee: React.FC = () => {
    return (
        <Layout>
            <PageHeaders title={'Editer Employee'} subTitle={'Employees'} />

            <form className={'bg-white p-4 h-full w-full'}>
                <div className={'grid gap-6 sm:grid-cols-2'}>
                    <TextInput
                        placeholder="Belatreche"
                        label="Nom"
                        type="text"
                        className={'w-full'}
                        rightSection={<IconLetterCase className="text-gray-400" size={20} />}
                        required
                        withAsterisk
                    />
                    <TextInput
                        placeholder="Yasser"
                        label="Prenom"
                        type="text"
                        rightSection={<IconLetterCase className="text-gray-400" size={20} />}
                        required
                        withAsterisk
                    />

                    <DatePickerInput
                        placeholder="18/11/2002"
                        label="Date de naissance"
                        valueFormat={'DD/MM/YYYY'}
                        rightSection={<IconCalendar className="text-gray-400" size={20} />}
                        required
                        withAsterisk
                    />

                    <DatePickerInput
                        placeholder="18/11/2022"
                        label="Date de début"
                        valueFormat={'DD/MM/YYYY'}
                        rightSection={<IconCalendar className="text-gray-400" size={20} />}
                        required
                        withAsterisk
                    />

                    <Select label="Sexe" placeholder="Male" data={['Male', 'Female']} />
                    <Select label="Département" placeholder="Département" data={DEPARTMENTS} />
                </div>

                <div className={'flex flex-col gap-4 my-4'}>
                    <TextInput
                        placeholder="0798980975"
                        label="Numéro de téléphone"
                        type="tel"
                        rightSection={<IconPhone className="text-gray-400" size={20} />}
                        required
                        withAsterisk
                    />
                    <TextInput
                        placeholder="example@email.com"
                        label="Email"
                        type="email"
                        rightSection={<IconMail className="text-gray-400" size={20} />}
                        required
                        withAsterisk
                    />
                    <PasswordInput
                        placeholder="mot de passe"
                        label="Nouveau Mot de passe"
                        required
                        withAsterisk
                    />
                </div>

                <Button type="submit" size="md" fullWidth loading={false}>
                    Confirmer
                </Button>
            </form>
        </Layout>
    );
};

export { EditEmployee };
