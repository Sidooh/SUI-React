import DataTable from '../components/DataTable';
import { storiesOf } from '@storybook/react';
import React from 'react';
import './css/theme.min.css';
import './css/user.min.css';
import { faker } from '@faker-js/faker';
import { Card } from 'react-bootstrap';

const stories = storiesOf('DataTable', module);

stories.add('App', () => {
    const data = Array.from({length: 25}, (a) => ({name: faker.name.firstName(), age: faker.datatype.number(70)}));
    data.push({name: 'Tasha', age: 21});

    return (
        <Card>
            <Card.Body>
                <DataTable title={'Sidooh DTL'} data={data} columns={[
                    {accessorKey: 'name',},
                    {accessorKey: 'age'}
                ]}/>
            </Card.Body>
        </Card>
    );
});