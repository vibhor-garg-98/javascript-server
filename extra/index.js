import { diamond } from './patterns/'
import { equilateral } from './patterns/'
let r = Number(process.argv[2]);

equilateral(r);
diamond(r);



import { hasPermission,validateUser } from './utils';

let x = hasPermission('getUsers','trainee','read');
console.log(x);

import {users} from "./constant"


validateUser(users);