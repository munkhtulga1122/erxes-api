/* eslint-env jest */
/* eslint-disable no-underscore-dangle */

import { connect, disconnect } from '../db/connection';
import { Customers } from '../db/models';
import { customerFactory } from '../db/factories';

beforeAll(() => connect());

afterAll(() => disconnect());

describe('Customers model tests', () => {
  let _customer;

  beforeEach(async () => {
    _customer = await customerFactory();
  });

  afterEach(async () => {
    // Clearing test data
    await Customers.remove({});
  });

  test('Create customer', async () => {
    const doc = { name: 'name', email: 'dombo@yahoo.com' };

    const customerObj = await Customers.createCustomer(doc);

    expect(customerObj.name).toBe(doc.name);
    expect(customerObj.email).toBe(doc.email);
  });

  test('Update customer', async () => {
    const doc = {
      name: 'Dombo',
      email: 'dombo@yahoo.com',
      phone: '242442200',
    };

    const customerObj = await Customers.updateCustomer(_customer._id, doc);

    expect(customerObj.name).toBe(doc.name);
    expect(customerObj.email).toBe(doc.email);
    expect(customerObj.phone).toBe(doc.phone);
  });

  test('Mark customer as inactive', async () => {
    const customer = await customerFactory({
      messengerData: { isActive: true, lastSeenAt: null },
    });

    const customerObj = await Customers.markCustomerAsNotActive(customer._id);

    expect(customerObj.messengerData.isActive).toBe(false);
    expect(customerObj.messengerData.lastSeenAt).toBeDefined();
  });

  test('Add company', async () => {
    let customer = await customerFactory({});

    // call add company
    const company = await Customers.addCompany({
      _id: customer._id,
      name: 'name',
      website: 'website',
    });

    customer = await Customers.findOne({ _id: customer._id });

    expect(customer.companyIds.length).toBe(1);
    expect(customer.companyIds[0]).toEqual([company._id]);
  });
});
