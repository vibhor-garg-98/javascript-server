let validcount: number = 0;
let invalidcount: number = 0;
const valid: string[] = [];
const invalid: string[] = [];

import { validateEmail } from './helpers';
import { Iuser } from '../interface';

export default function validateUsers(users: Iuser[]): void {
  users.forEach((element: any) => {
    const { traineeEmail, reviewerEmail } = element;

    const check = validateEmail(traineeEmail);

    if (check === true) {
      validcount++;
      valid.push(traineeEmail);
    } else {
      invalidcount++;
      invalid.push(traineeEmail);
    }
    const check1 = validateEmail(reviewerEmail);
    if (check1 === true) {
      validcount++;
      valid.push(reviewerEmail);
    } else {
      invalidcount++;
      invalid.push(reviewerEmail);
    }
  });

  console.log('valid count \n' + validcount);
  console.log('valid email\n' + valid);
  console.log('invlaid count \n' + invalidcount);
  console.log('invalid email\n' + invalid);
}