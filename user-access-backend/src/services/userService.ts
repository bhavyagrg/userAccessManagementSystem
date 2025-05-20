import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import { Role } from "../constants/Role";

const USER_REPO = AppDataSource.getRepository(User);

export const getAllUsers = async () => {
  return await USER_REPO.find();
};

export const createUser = async (data: Partial<User>) => {
  const user = USER_REPO.create(data);
  return await USER_REPO.save(user);
};

export const findUserById = async (id: number) => {
  return await USER_REPO.findOneBy({ id });
};

export const findUsersByRole = async (role: string) => {
  return await USER_REPO.findBy({ role });
};
