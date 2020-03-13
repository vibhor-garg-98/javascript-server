import { Router } from 'express';
import TraineeController from './Controller';
import validationHandler from '../../libs/routes/validationHandler';
import validation from './validation';
import authMiddleWare from '../../libs/routes/authMiddleWare';

const TraineeRouter = Router();

/**
 * @swagger
 *
 * definitions:
 *   TraineePost:
 *      type: object
 *      properties:
 *          name:
 *              type: string
 *              example: vibhor garg
 *          address:
 *              type: string
 *              example: noida
 *          dob:
 *              type: Date
 *              example: 03/04/1998
 *          email:
 *              type: string
 *              example: vibhor@successive.tech
 *          mobileNumber:
 *              type: number
 *              example: 995813645
 *          password:
 *              type: string
 *              example: Trainer@123
 *          role:
 *              type: string
 *              example: trainee
 *          hobbies:
 *              type: array
 *              example: ["cricket"]
 *
 *   TraineeResponse:
 *      type: object
 *      properties:
 *          _id:
 *              example: 5e53ac6060a36a15d89a3aa0
 *          name:
 *              type: string
 *              example: vibhor
 *          address:
 *              type: string
 *              example: noida
 *          dob:
 *              type: Date
 *              example: 03/04/1998
 *          email:
 *              type: string
 *              example: vibhor@successive.tech
 *          mobileNumber:
 *              type: number
 *              example: 9958413545
 *          role:
 *              type: string
 *              example: trainee
 *          hobbies:
 *              type: array
 *              example: ["cricket"]
 *          originalId:
 *              example: 5e53ac6060a36a15d89a3aa0
 *          createdBy:
 *              example: 5e53ac6060a36a15d89a3aa0
 *          createdAt:
 *              example: 2020-02-24 10:58:40.385Z
 *          v:
 *              example:0
 *   Unauthorized:
 *      type: object
 *      properties:
 *          error:
 *              example: Unauthorized
 *          message:
 *              example: Token not found
 *          status:
 *              example: 403
 *          timestamp:
 *              example: 2020-02-24 10:58:40.385Z
 *
 */

TraineeRouter.route('/')
  /**
   * @swagger
   *
   * /trainee:
   *      get:
   *          description: Returns the list of the trainees
   *          tags:
   *              - Trainee
   *          security:
   *              - Bearer: []
   *          consumes:
   *              - application/json
   *          produces:
   *              - application/json
   *          parameters:
   *              - name: skip
   *                description: data to be skip
   *                in: query
   *                required: false
   *                type: number
   *              - name: limit
   *                description: number of data to be shown
   *                in: query
   *                required: false
   *                type: number
   *              - name: sortData
   *                description: data to be sort by
   *                in: query
   *                required: false
   *                type: string
   *              - name: search
   *                description: data to be search by
   *                in: query
   *                required: false
   *                type: string
   *          responses:
   *              200:
   *                  description: An Array of Trainees
   *                  schema:
   *                      properties:
   *                          status:
   *                              example: Ok
   *                          message:
   *                              example: 'Successfully fetched Trainees'
   *                          count:
   *                              example: 2
   *                          data:
   *                              type: object
   *                              allOf[]:
   *                              - $ref: '#/definitions/TraineeResponse'
   *                              properties:
   *                                  _id:
   *                                      example: 5e53ac6060a36a15d89a3aa0
   *                                  name:
   *                                      example: vibhor garg
   *                                  email:
   *                                      example: vibhor@successive.tech
   *                                  dob:
   *                                      example: 03/04/1998
   *                                  address:
   *                                      example: noida
   *                                  role:
   *                                      example: trainee
   *                                  mobileNumber:
   *                                      example: 9958413545
   *                                  hobbies:
   *                                      example: ["cricket"]
   *                                  originalId:
   *                                      example: 5e53ac6060a36a15d89a3aa0
   *                                  createdBy:
   *                                      example: 5e53ac6060a36a15d89a3aa0
   *                                  createdAt:
   *                                      example: 2020-02-24 10:58:40.385Z
   *                                  v:
   *                                      example: 0
   *              403:
   *                  description: Unauthorised access
   *                  schema:
   *                      $ref: '#/definitions/Unauthorized'
   */

  .get(
    authMiddleWare('getUsers', 'read'),
    validationHandler(validation.get),
    TraineeController.list
  )

  /**
   * @swagger
   *
   * /trainee:
   *      post:
   *        description: Returns the success reponse on creation
   *        tags:
   *              - Trainee
   *        security:
   *             - Bearer: []
   *        produces:
   *          - application/json
   *        parameters:
   *          - name: User
   *            description: User's Data.
   *            in: body
   *            required: true
   *            type: object
   *            schema:
   *                $ref: '#/definitions/TraineePost'
   *        responses:
   *          200:
   *            description: Trainee created success response
   *            schema:
   *                   allOf[]:
   *                   properties:
   *                     status:
   *                         example: Ok
   *                     message:
   *                         example: Trainee created successfully
   *                     data:
   *                         type: object
   *                         allOf[]:
   *                         - $ref: '#/definitions/TraineeResponse'
   *                         properties:
   *                                 _id:
   *                                    example: 5e53ac6060a36a15d89a3aa0
   *                                 name:
   *                                    example: vibhor
   *                                 address:
   *                                    example: noida
   *                                 dob:
   *                                    example: 03/04/1998
   *                                 email:
   *                                    example: vibhor@successive.tech
   *                                 mobileNumber:
   *                                    example: 9958413545
   *                                 role:
   *                                    example: trainee
   *                                 hobbies:
   *                                    example: ["cricket"]
   *                                 originalId:
   *                                    example: 5e53ac6060a36a15d89a3aa0
   *                                 createdBy:
   *                                    example: 5e53ac6060a36a15d89a3aa0
   *                                 createdAt:
   *                                    example: 2020-02-24 10:58:40.385Z
   *                                 v:
   *                                    example: 0
   *          403:
   *            description: unauthorised access
   *            schema:
   *                $ref: '#/definitions/Unauthorized'
   */
  .post(
    authMiddleWare('getUsers', 'write'),
    validationHandler(validation.create),
    TraineeController.create
  )
  /**
   * @swagger
   * definitions:
   *  TraineePut:
   *    type: object
   *    properties:
   *      id:
   *        example: 5e4e6e93c095d84d34045a30
   *      dataToUpdate:
   *        type: object
   *        example:
   *          name: vibhor
   *          address: noida
   *          mobileNumber: 9944558877
   *          dob: 03/04/1998
   */

  /**
   * @swagger
   *
   * /trainee:
   *      put:
   *          description: Returns the success reponse on creation
   *          tags:
   *              - Trainee
   *          security:
   *              - Bearer: []
   *          produces:
   *              - application/json
   *          parameters:
   *              - name: User
   *                description: Trainee's Data
   *                in: body
   *                required: true
   *                type: object
   *                schema:
   *                    $ref: '#/definitions/TraineePut'
   *          responses:
   *              200:
   *                  description: Trainee update success response
   *                  schema:
   *                      allOf[]:
   *                      properties:
   *                          status:
   *                              example: Ok
   *                          message:
   *                              example: Trainee Updated successfully
   *                          data:
   *                              type: object
   *                              allOf[]:
   *                              - $ref: '#/definitions/TraineeResponse'
   *                              properties:
   *                                    _id:
   *                                      example: 5e53ac6060a36a15d89a3aa0
   *                                    name:
   *                                      example: vibhor
   *                                    address:
   *                                      example: noida
   *                                    dob:
   *                                      example: 03/04/1998
   *                                    email:
   *                                      example: vibhor@successive.tech
   *                                    mobileNumber:
   *                                      example: 9958413545
   *                                    role:
   *                                      example: trainee
   *                                    hobbies:
   *                                      example: ["cricket"]
   *                                    originalId:
   *                                      example: 5e53ac6060a36a15d89a3aa0
   *                                    createdBy:
   *                                      example: 5e53ac6060a36a15d89a3aa0
   *                                    createdAt:
   *                                      example: 2020-02-24 10:58:40.385Z
   *                                    v:
   *                                      example: 0
   *              403:
   *                  description: unauthorised access
   *                  schema:
   *                      $ref: '#/definitions/Unauthorized'
   */

  .put(
    authMiddleWare('getUsers', 'write'),
    validationHandler(validation.update),
    TraineeController.update
  );

/**
 * @swagger
 *
 * /trainee/{id}:
 *      delete:
 *          description: Returns the success reponse on creation
 *          tags:
 *              - Trainee
 *          security:
 *              - Bearer: []
 *          produces:
 *              - application/json
 *          parameters:
 *              - name: id
 *                description: id of user to be deleted.
 *                in: path
 *                required: true
 *                type: string
 *                example: 5e53ac6060a36a15d89a3aa0
 *          responses:
 *              200:
 *                  description: Trainee deleted success response
 *                  schema:
 *                      allOf[]:
 *                      properties:
 *                          status:
 *                              example: Ok
 *                          message:
 *                              example: Trainee deleted successfully
 *                          data:
 *                              type: object
 *                              allOf[]:
 *                              - $ref: '#/definitions/TraineeResponse'
 *                              properties:
 *                                    _id:
 *                                      example: 5e53ac6060a36a15d89a3aa0
 *                                    name:
 *                                      example: vibhor
 *                                    address:
 *                                      example: noida
 *                                    dob:
 *                                      example: 03/04/1998
 *                                    email:
 *                                      example: vibhor@successive.tech
 *                                    mobileNumber:
 *                                      example: 9958413545
 *                                    role:
 *                                      example: trainee
 *                                    hobbies:
 *                                      example: ["cricket"]
 *                                    originalId:
 *                                      example: 5e53ac6060a36a15d89a3aa0
 *                                    createdBy:
 *                                      example: 5e53ac6060a36a15d89a3aa0
 *                                    createdAt:
 *                                      example: 2020-02-24 10:58:40.385Z
 *                                    v:
 *                                      example: 0
 *                                    deletedBy:
 *                                      example: 5e53ac6060a36a15d89a3aa0
 *                                    deletedAt:
 *                                      example: 2020-02-24 10:58:40.385Z
 *              403:
 *                  description: unauthorised access
 *                  schema:
 *                      $ref: '#/definitions/Unauthorized'
 */

TraineeRouter.delete(
  '/:id',
  authMiddleWare('getUsers', 'delete'),
  validationHandler(validation.delete),
  TraineeController.delete
);
export default TraineeRouter;
