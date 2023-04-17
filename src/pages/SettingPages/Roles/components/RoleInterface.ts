export interface IActions {
  [key: string]: boolean;
}

export interface IMyObject {
  name: string;
  actions: IActions;
}

export interface NewRole {
  name: string;
  actions: {
    index: boolean;
    create: boolean;
    show: boolean;
    edit: boolean;
    delete: boolean;
  };
}
