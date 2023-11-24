import { getMenuItems } from './menu.service';

describe('getMenuItem()', () => {
  it.skip('should return only unauthenticated pages when not logged in', () => {
    // const res = getMenuItems({ isAuthenticated: false, roles: [] });
    // expect(res.length).toBe(2);
    // expect(res[0].title).toBe('Home');
    // expect(res[1].title).toBe('Over deze app');
  });
  // it('should return student pages when logged in as student', () => {
  //   const res = getMenuItems({
  //     isAuthenticated: true,
  //     roles: ['Authenticated', 'Student'],
  //   });
  //   // res.length; /*?*/
  //   expect(res.length).toBe(11);
  //   expect(res[0].title).toBe('Home');
  //   expect(res[1].title).toBe('Over deze app');
  // });
});
