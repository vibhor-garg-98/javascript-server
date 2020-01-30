import { diamond } from './patterns/';
import { equilateral } from './patterns/';

import { users } from './constant';
import { hasPermission, validateUser } from './utils';

const x  = hasPermission('getUsers', 'trainee', 'read');
console.log(x);

diamond(5);
equilateral(5);
validateUser(users);
