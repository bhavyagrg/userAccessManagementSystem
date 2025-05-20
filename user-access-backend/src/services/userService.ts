import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";

const userRepo = AppDataSource.getRepository(User);

export const getAllUsers = () => userRepo.find();
export const createUser = (data: Partial<User>) => userRepo.save(data);
export const getUserById = (id: number) => userRepo.findOneBy({ id });
