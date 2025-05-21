import { SoftwareDao } from '../dao/softwareDao';
import { Software } from '../entities/Software';

export class SoftwareService {
    private softwareDao: SoftwareDao;

    constructor() {
        this.softwareDao = new SoftwareDao();
    }

    async createSoftware(data: { name: string; description: string; accessLevels: string[] }): Promise<void> {
        const software = new Software();
        software.name = data.name;
        software.description = data.description;
        software.accessLevels = data.accessLevels;
        // Save user to database
        await this.softwareDao.saveSoftware(software);
    }

    async getAllSoftware(): Promise<{ software: Software[] }> {

        const software = await this.softwareDao.getAllSoftware();

        if(!software)
        {
            throw new Error("Software not found");
        }

        return software;  
    }

}
