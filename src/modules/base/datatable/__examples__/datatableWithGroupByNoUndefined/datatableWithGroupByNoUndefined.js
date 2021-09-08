import { LightningElement } from 'lwc';

export default class DatatableWithGroupByNoUndefined extends LightningElement {
    columns = [
        {
            id: 1,
            label: 'Name',
            fieldName: 'name',
            editable: true
        },
        {
            id: 2,
            label: 'Age',
            fieldName: 'age',
            type: 'number'
        },
        {
            id: 3,
            label: 'Sex',
            fieldName: 'sex'
        },
        {
            id: 4,
            label: 'City',
            fieldName: 'city'
        },
        {
            id: 5,
            label: 'District',
            fieldName: 'district'
        },
        {
            id: 6,
            label: 'Habitation',
            fieldName: 'habitation'
        }
    ];

    records = [
        {
            id: 1,
            name: 'Karen',
            age: '88',
            sex: 'Female',
            city: 'Montreal',
            district: 'Plateau',
            habitation: 'Apartment'
        },
        {
            id: 2,
            name: 'James',
            age: '87',
            sex: 'Male',
            city: 'Montreal',
            district: 'Villeray',
            habitation: 'Apartment'
        },
        {
            id: 3,
            name: 'Don',
            age: '18',
            sex: 'Male',
            city: 'Longueuil',
            district: 'Old Longueuil',
            habitation: 'Room'
        },
        {
            id: 5,
            name: 'Donald',
            age: '16',
            sex: 'Male',
            city: 'Longueuil',
            district: 'Saint-Hubert'
        },
        {
            id: 6,
            name: 'Jenny',
            age: '56',
            sex: 'Female',
            city: 'Longueuil',
            district: 'Greenfield Park',
            habitation: 'Apartment'
        },
        {
            id: 7,
            name: 'Doug',
            age: '61',
            sex: 'Male',
            city: 'Montreal',
            district: 'Outremont',
            habitation: 'Room'
        },
        {
            id: 8,
            name: 'Michel',
            age: '19',
            sex: 'Male',
            city: 'Longueuil',
            district: 'Greenfield Park',
            habitation: 'Room'
        },
        {
            id: 9,
            name: 'Renaud',
            age: '29',
            sex: 'Male',
            city: 'Longueuil',
            district: 'Saint-Hubert',
            habitation: 'Apartment'
        },
        {
            id: 10,
            name: 'Linda',
            age: '14',
            sex: 'Female',
            city: 'Laval',
            district: 'Vimont',
            habitation: 'Apartment'
        },
        {
            id: 11,
            name: 'Daniel',
            age: '41',
            sex: 'Male',
            city: 'Laval',
            habitation: 'House'
        },
        {
            id: 12,
            name: 'Melissa',
            age: '73',
            sex: 'Female',
            city: 'Montreal',
            district: 'Plateau',
            habitation: 'Apartment'
        },
        {
            id: 14,
            name: 'Lisa',
            age: '15',
            sex: 'Female',
            city: 'Laval',
            district: 'Viau',
            habitation: 'House'
        },
        {
            id: 15,
            name: 'Hubert',
            age: '16',
            sex: 'Male',
            city: 'Montreal',
            district: 'Outremont',
            habitation: 'House'
        },
        {
            id: 16,
            name: 'Yvan',
            age: '19',
            sex: 'Male',
            city: 'Montreal',
            district: 'Outremont',
            habitation: 'House'
        },
        {
            id: 17,
            name: 'Jean',
            age: '24',
            sex: 'Male',
            city: 'Montreal',
            habitation: 'Apartment'
        },
        {
            id: 18,
            name: 'Samuel',
            age: '19',
            sex: 'Male',
            city: 'Laval',
            district: 'Rosemere',
            habitation: 'House'
        },
        {
            id: 19,
            name: 'Maggie',
            age: '26',
            sex: 'Female',
            city: 'Montreal',
            district: 'Outremont',
            habitation: 'House'
        },
        {
            id: 20,
            name: 'Rita',
            age: '19',
            sex: 'Female',
            city: 'Laval',
            district: 'Vimont',
            habitation: 'Duplex'
        },
        {
            id: 21,
            name: 'Delphine',
            age: '29',
            sex: 'Female',
            city: 'Laval'
        },
        {
            id: 22,
            name: 'Max',
            age: '87',
            sex: 'Male',
            district: 'Villeray',
            habitation: 'Duplex'
        },
        {
            id: 23,
            name: 'Richard',
            age: '23',
            sex: 'Male',
            city: 'Longueuil',
            district: 'Old Longueuil',
            habitation: 'Room'
        },
        {
            id: 24,
            name: 'Edward',
            age: '99',
            sex: 'Male',
            city: 'Longueuil',
            district: 'Saint-Hubert'
        },
        {
            id: 25,
            name: 'Benny',
            age: '75',
            sex: 'Male',
            city: 'Longueuil',
            district: 'Greenfield Park',
            habitation: 'Apartment'
        },
        {
            id: 26,
            name: 'Bella',
            age: '62',
            sex: 'Female',
            city: 'Montreal',
            district: 'Outremont',
            habitation: 'Apartment'
        },
        {
            id: 27,
            name: 'Felix',
            age: '21',
            sex: 'Male',
            city: 'Montreal',
            district: 'Plateau',
            habitation: 'Apartment'
        },
        {
            id: 28,
            name: 'Xavier',
            age: '27',
            sex: 'Male',
            city: 'Montreal',
            district: 'Plateau',
            habitation: 'House'
        },
        {
            id: 29,
            name: 'Fred',
            age: '27',
            sex: 'Female',
            city: 'Montreal',
            district: 'Villeray',
            habitation: 'House'
        },
        {
            id: 30,
            name: 'Pete',
            age: '42',
            sex: 'Male',
            city: 'Laval',
            district: 'Viau',
            habitation: 'Duplex'
        }
    ];

    groupBy = ['city', 'district'];
}
