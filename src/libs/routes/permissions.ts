import { permissions } from './constant';
export default function hasPermission(
  moduleName: string,
  role: string,
  permissionType: string
): boolean {
  const data: string[] = permissions[moduleName];
  const temp: string[] = data[permissionType];
  return temp.some((element: any) => {
    if (element === role) return true;
    else return false;
  });
}
