const validation = {
  create: {
    name: {
      required: true,
      regex: /^[A-Z][a-z]{2,30}$/,
      in: ["body"],
      errorMessage: {
        Error: {
          error: "Name is required",
          message: "Name is required",
          timestamp: new Date(),
          status: 500
        },
        regexError: {
          error: "Regex did not match",
          message: "Regex did not match",
          timestamp: new Date(),
          status: 500
        },
        typeError: {
          error: "Name should be of type string",
          message: "Name should be of type string",
          timestamp: new Date(),
          status: 500
        }
      }
    },
    address: {
      required: true,
      string: true,
      in: ["body"],
      errorMessage: {
        Error: {
          error: "Address is required",
          message: "Address is required",
          timestamp: new Date(),
          status: 500
        },
        typeError: {
          error: "Address should be of type string",
          message: "Address should be of type string",
          timestamp: new Date(),
          status: 500
        }
      }
    },
    dob: {
      required: true,
      string: true,
      in: ["body"],
      errorMessage: {
        Error: {
          error: "dob is required",
          message: "dob is required",
          timestamp: new Date(),
          status: 500
        },
        typeError: {
          error: "dob should be of type string",
          message: "Limit should be of type string",
          timestamp: new Date(),
          status: 500
        }
      }
    },
    email: {
      required: true,
      string: true,
      in: ["body"],
      errorMessage: {
        Error: {
          error: "Email is required",
          message: "Email is required",
          timestamp: new Date(),
          status: 500
        },
        typeError: {
          error: " Email should be of type string",
          message: "Email should be of type string",
          timestamp: new Date(),
          status: 500
        }
      }
    },
    mobileNumber: {
      required: true,
      number: true,
      in: ["body"],
      errorMessage: {
        Error: {
          error: "mobileNumber is required",
          message: "mobileNumber is required",
          timestamp: new Date(),
          status: 500
        },
        typeError: {
          error: "mobileNumber should be of type number",
          message: "mobileNumber should be of type number",
          timestamp: new Date(),
          status: 500
        }
      }
    },
    hobbies: {
      required: true,
      array: "String",
      in: ["body"],
      errorMessage: {
        Error: {
          error: "hobbies is required",
          message: "hobbies is required",
          timestamp: new Date(),
          status: 500
        },
        typeError: {
          error: "hobbies should be of type array",
          message: "hobbies should be of type array",
          timestamp: new Date(),
          status: 500
        }
      }
    },
    password: {
      required: true,
      in: ["body"],
      errorMessage: {
        Error: {
          error: "password is required",
          message: "password is required",
          timestamp: new Date(),
          status: 500
        },
        typeError: {
          error: "password should be of type string",
          message: "password should be of type string",
          timestamp: new Date(),
          status: 500
        }
      }
    },
  },
  delete: {
    id: {
      required: true,
      errorMessage: {
        idError: {
          error: "Id is required",
          message: "Id is required",
          timestamp: new Date(),
          status: 500
        }
      },
      in: ["params"]
    }
  },
  get: {
    skip: {
      required: false,
      default: 0,
      number: true,
      in: ["query"],
      errorMessage: {
        typeError: {
          error: "Skip should be of type number",
          message: "Skip should be of type number",
          timestamp: new Date(),
          status: 500
        }
      }
    },
    limit: {
      required: false,
      default: 10,
      number: true,
      in: ["query"],
      errorMessage: {
        typeError: {
          error: "Limit should be of type number",
          message: "Limit should be of type number",
          timestamp: new Date(),
          status: 500
        }
      }
    }
  },
  update: {
    id: {
      required: true,
      string: true,
      in: ["body"],
      errorMessage: {
        Error: {
          error: "Id is required",
          message: "Id is required",
          timestamp: new Date(),
          status: 500
        },
        typeError: {
          error:
            "ID should be of string type and dataToUpadte should be of type object",
          message:
            "ID should be of string type and dataToUpadte should be of type object",
          timestamp: new Date(),
          status: 500
        }
      }
    },
    dataToUpdate: {
      in: ["body"],
      required: true,
      isObject: true,
      errorMessage: {
        Error: {
          error: "dataToUpdate is required",
          message: "dataToUpdate is required",
          timestamp: new Date(),
          status: 500
        },
        typeError: {
          error:
            "ID should be of string type and dataToUpadte should be of type object",
          message:
            "ID should be of string type and dataToUpadte should be of type object",
          timestamp: new Date(),
          status: 500
        }
      },
      custom: function(dataToUpdate) {
        console.log("Value", dataToUpdate);
        throw {
          error: "Error Occured",
          message: "Message"
        };
      }
    }
  }
};

export default validation;