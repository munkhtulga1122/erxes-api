/* eslint-env jest */

import permissionQueries from '../data/resolvers/queries/permissions';

describe('permissionQueries', () => {
  test(`test if Error('Login required') exception is working as intended`, async () => {
    expect.assertions(4);

    const expectError = async func => {
      try {
        await func(null, {}, {});
      } catch (e) {
        expect(e.message).toBe('Login required');
      }
    };

    expectError(permissionQueries.permissions);
    expectError(permissionQueries.permissionModules);
    expectError(permissionQueries.permissionActions);
    expectError(permissionQueries.permissionsTotalCount);
  });
});
