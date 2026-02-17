import { Request, Response } from 'express';
import { usersDataValidationSchema } from './users.ZodValidation';
import { usersServices } from './users.service';

const createUsers = async (req: Request, res: Response) => {
  try {
    const user = req.body.user;
    // Data validation Using Zod
    const zodParseData = usersDataValidationSchema.parse(user);
    const result = await usersServices.createUsersIntoDB(zodParseData);

    // send response
    res.status(200).json({
      success: true,
      message: 'Users created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await usersServices.getAllUsersFromDB();
    res.status(200).json({
      success: true,
      message: 'Users fetched Successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'someThing went wrong',
      error: err,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    // console.log({ userId });
    const result = await usersServices.getSingleUsersFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'Single User fetch successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'someThing went wrong',
      error: err,
    });
  }
};
const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const result = await usersServices.deleteUsersFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'User Deleted successful',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'someThing went wrong',
      error: err,
    });
  }
};

export const usersControllers = {
  createUsers,
  getAllUsers,
  getSingleUser,
  deleteUser,
};
