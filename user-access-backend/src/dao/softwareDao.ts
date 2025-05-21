import { AppDataSource } from '../config/data-source';
import { Software } from '../entities/Software';

export class SoftwareDao {
    private softwareRepository = AppDataSource.getRepository(Software);

    async saveSoftware(software: Software): Promise<Software> {
        return this.softwareRepository.save(software);
    }

    async getAllSoftware(): Promise<Software[] > {
        return await this.softwareRepository.find() ;
    }
}