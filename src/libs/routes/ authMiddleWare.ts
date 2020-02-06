import * as jwt from "jsonwebtoken";
import configuration, { default as config } from "../../config/configuration";
import { Request, Response, NextFunction } from "express";
import hasPermission from "./permissions";
export default (modulename, permissionType) => (req: Request, res: Response, next: NextFunction) => {

    
    try {
        console.log(":::::::::::::Middleware:::::::::::::",modulename,permissionType);
        const token: string = req.headers.authorization;
        //console.log(token);
        
        const { secretKey } = configuration;
        const decodeUser = jwt.verify(token, secretKey);

        if (!decodeUser) {
        return next({
            status: 403,
            error: "Unauthorized access",
            message: "Unauthorized access"
        });
        }
        const role: string = decodeUser.role;
        if (!hasPermission(modulename, role, permissionType)) {
            return next({
                status: 403,
                error: "Unauthorized access"
            });
        }
        next();
    } catch (error) {
        return next({
            status: 403,
            error: "Unauthorized access"
        });
    }
};
