import { Ipermissions, Iuser } from './interface';

const permissions: Ipermissions = {
  getUsers: {
    all: ['head-trainer'],
    read: ['trainee', 'trainer'],
    write: ['trainer'],
    delete: []
  }
};

const users: Iuser[] = [
  {
    traineeEmail: 'vibhor.garg@successive.tech',
    reviewerEmail: 'preet.saxena@successive.tech'
  },
  {
    traineeEmail: 'vibhu.gargsuccessive.tech',
    reviewerEmail: 'preet@succesive.tech'
  },
  {
    traineeEmail: 'vibhu.garg@successive.tech',
    reviewerEmail: 'preet@successive.tech'
  }
];
export { permissions, users };
