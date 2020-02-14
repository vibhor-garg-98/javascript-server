import IVersionableDocument from '../versionable/ IVersionableDocument';
export default interface IUserModel extends IVersionableDocument {
  id: string;
  name: string;
  address: string;
  email: string;
  dob: Date;
  mobileNumber: number;
  role: string;
  hobbies: string[];
  password: string;
}
