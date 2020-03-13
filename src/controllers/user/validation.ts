const validation = {
  login: {
    password: {
      required: true,
      in: ['body'],
      errorMessage: {
        Error: {
          error: 'passwoed is required',
          message: 'password is required',
          timestamp: new Date(),
          status: 500
        }
      }
    },

    email: {
      required: true,
      string: true,
      in: ['body'],
      errorMessage: {
        Error: {
          error: 'Email is required',
          message: 'Email is required',
          timestamp: new Date(),
          status: 500
        },
        typeError: {
          error: 'Email should be of type string',
          message: 'Email should be of type string',
          timestamp: new Date(),
          status: 500
        }
      }
    }
  }
};

export default validation;
