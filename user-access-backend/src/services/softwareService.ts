import { AppDataSource } from "../config/data-source";
import { Software } from "../entities/Software";

const SOFTWARE_REPO = AppDataSource.getRepository(Software);

export const getAllSoftware = async (): Promise<Software[]> => {
  return await SOFTWARE_REPO.find();
};

export const addSoftware = async (
  data: Partial<Software>
): Promise<Software> => {
  const software = SOFTWARE_REPO.create(data);
  return await SOFTWARE_REPO.save(software);
};

export const getSoftwareById = async (id: number): Promise<Software | null> => {
  return await SOFTWARE_REPO.findOneBy({ id });
};

export const deleteSoftware = async (id: number): Promise<void> => {
  await SOFTWARE_REPO.delete(id);
};
