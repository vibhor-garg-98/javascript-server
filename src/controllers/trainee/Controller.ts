import { Request, Response } from 'express';

class TraineeController {
  static instance;
  static getInstance = () => {
    if (TraineeController.instance) {
      return TraineeController.instance;
    }
    TraineeController.instance = new TraineeController();
    return TraineeController.instance;
  };

  create = (req: Request, res: Response) => {
    console.log('::::::::::::::::::__INSIDE CREATE TRAINEE__:::::::::::::::::::');
    res.send({
      status: 'OK',
      message: 'Trainee Added Successfully',
      data: {
        id: '1',
        name: 'Vibhor',
        address: 'Noida'
      }
    });
  };

  list = (req: Request, res: Response) => {
    console.log('::::::::::::::::::__INSIDE LIST TRAINEE__:::::::::::::::::');
    res.send({
      status: 'OK',
      message: 'Trainee Listed Successfully',
      data: [
        {
          id: '1',
          name: 'Vibhor',
          address: 'Noida'
        },
        {
          id: '2',
          name: 'Ravi',
          address: 'Delhi'
        },
        {
          id: '3',
          name: 'Vaibhav',
          address: 'Greater Noida'
        }
      ]
    });
  };

  deleted = (req: Request, res: Response) => {
    console.log(':::::::::::::::::__INSIDE DELETED TRAINEE__:::::::::::::::');
    res.send({
      status: 'OK',
      message: 'Trainee Deleted Successfully',
      data: {
        id: '2',
        name: 'Ravi',
        address: 'Delhi'
      }
    });
  };

  update = (req: Request, res: Response) => {
    console.log('::::::::::::::::::__INSIDE UPDATE TRAINEE__::::::::::::::::::::');
    res.send({
      status: 'OK',
      message: 'Trainee Updated Successfully',
      data: {
        id: '1',
        name: 'Vibhor Garg',
        address: 'Shamli'
      }
    });
  };
}
export default TraineeController.getInstance();