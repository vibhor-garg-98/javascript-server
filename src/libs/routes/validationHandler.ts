import { Request, Response, NextFunction } from "express";

function isEmpty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }
  return true;
}

function isString(value) {
  return typeof value === "string" || value instanceof String;
}

function isObject(value) {
  return (value && typeof value === "object") || value.constructor === Object;
}

export default function(config) 
{
  return function(req: Request, res: Response, next: NextFunction) 
  {
    console.log("The config is", config);
    const arrayError = [];

    const configKeys = Object.keys(config);
    console.log(configKeys);

    console.log(req.method);

    if (req.method.match("POST")) 
    {
      const createKeys = Object.keys(config);

      console.log(createKeys);

      createKeys.forEach(element => {
        config[element].in.map(value => {
          if (!isEmpty(req[value])) {
            if (req[value][element]) {
              console.log(`${element} is there`);
            } else {
              //console.log(arrayError.length);
              arrayError.push(config[element].errorMessage.idError);
            }
            if (isString(req[value][element])) {
              console.log(`${element} are of string type`);
            } else {
              // console.log(arrayError.length);
              arrayError.push(config[element].errorMessage.typeError);
            }
            if (element === "name") {
              if (config.name.regex.test(req[value][element])) {
                console.log("Regex validation is right");
              } else {
                // console.log(arrayError.length);
                arrayError.push(config[element].errorMessage.regexError);
              }
            }
          }
        });
      });
      console.log(req.body);
    } 
    else if (req.method.match("PUT")) {
      const updateKeys = Object.keys(config);
      console.log(updateKeys);
      updateKeys.forEach(element => {
        config[element].in.map(value => {
          if (!isEmpty(req[value])) {
            if (req[value][element]) {
              console.log(`${element} is there`);
            } else {
              arrayError.push(config[element].errorMessage.idError);
            }
            if (
              isString(req[value][element]) ||
              isObject(req[value][element])
            ) {
              console.log(`${element} is of correct type`);
            } else {
              arrayError.push(config[element].errorMessage.typeError);
            }
          }
        });
      });
      console.log(req.body);
    } 
    else if (req.method.match("GET")) {
      const getKeys = Object.keys(config);
      getKeys.forEach(element => {
        config[element].in.map(value => {
          if (!isEmpty(req[value])) {
            if (!req[value][element]) {
              req[value][element] = config[element].default;
            }
            if (!isNaN(req.query[element])) {
              console.log(`${element} is of type number`);
            } else {
              arrayError.push(config[element].errorMessage.typeError);
            }
          }
        });
      });
      console.log(req.query);
    } 
    else if (req.method.match("DELETE")) {
      const deleteKeys = Object.keys(config);
      console.log(deleteKeys);
      deleteKeys.forEach(element => {
        config[element].in.map(value => {
          console.log(value);
          console.log(req.params);
          if (req[value][element]) {
            console.log(`${element} is there`);
          } else {
            arrayError.push(config[element].errorMessage.idError);
          }
        });
      });
      console.log(req.params);
    } 
    else {
      console.log("error");
    }

    if (arrayError.length === 0) {
      return next();
    } else {
      return next(arrayError);
    }
  };
}
