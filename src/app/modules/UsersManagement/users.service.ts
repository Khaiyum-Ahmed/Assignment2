import { TUsersData } from './users.interface';
import { UsersManagementModel } from './users.model';

const createUsersIntoDB = async (usersData: TUsersData) => {
  if (await UsersManagementModel.isUserExists(usersData.userId)) {
    throw new Error('User already Exists!');
  }
  const result = await UsersManagementModel.create(usersData);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await UsersManagementModel.find();
  return result;
};

const getSingleUsersFromDB = async (userId: number) => {
  const result = await UsersManagementModel.findOne({ userId });
  return result;
};

export const usersServices = {
  createUsersIntoDB,
  getAllUsersFromDB,
  getSingleUsersFromDB,
};
