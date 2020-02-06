interface Iuser {
  traineeEmail: string;
  reviewerEmail: string;
}

interface Ipermissions {
  getUsers: IgetUsers;
}

interface IgetUsers {
  all: Irole;
  read: Irole;
  write: Irole;
  delete: Irole;
}
interface Irole {
  [index: number]: string;
}
export { Ipermissions, IgetUsers, Iuser };
