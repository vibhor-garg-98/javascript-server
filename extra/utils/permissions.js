import {permissions} from "../constant";
export default function hasPermission(moduleName, role, permissionType)
{
let data = permissions[moduleName];

let x = data[permissionType];

return x.some(element => {if (element === role)
return true;
else
return false});
}
