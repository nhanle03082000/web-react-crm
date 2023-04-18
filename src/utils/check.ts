import { getRoleUser } from './redux.util';

export const roleCheckRoute = (arrCheck: any) => {
  const replacePath = (str: string) => str.replace(/-/g, '_');
  console.log(replacePath);
  const roleUser = getRoleUser() && JSON.parse(getRoleUser());

  const arrChecked = arrCheck.filter((obj1: any) => {
    return (
      roleUser &&
      roleUser.some((obj2: any) => {
        return obj1.key
          ? obj2.name === replacePath(obj1.key) && obj2.actions.index
          : obj2.name === replacePath(obj1.path) && obj2.actions.index;
      })
    );
  });
  return arrChecked;
};
