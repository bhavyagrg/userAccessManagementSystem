import { AppDataSource } from "../config/data-source";
import { Software } from "../entities/Software";

const softwareRepo = AppDataSource.getRepository(Software);

export const getAllSoftware = () => softwareRepo.find();
export const addSoftware = (data: Partial<Software>) => softwareRepo.save(data);
export const getSoftwareById = (id: number) => softwareRepo.findOneBy({ id });
