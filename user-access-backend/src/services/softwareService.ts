import { ACCESS_TYPE } from '../constants/user';
import { SoftwareDao } from '../dao/softwareDao';
import { Software } from '../entities/Software';

export class SoftwareService {
    private softwareDao: SoftwareDao;

    constructor() {
        this.softwareDao = new SoftwareDao();
    }

    async createSoftware(data: { name: string; description: string; accessLevels: ACCESS_TYPE[] }): Promise<void> {
        const software = new Software();
        software.name = data.name;  
        software.description = data.description;
        software.accessLevels = data.accessLevels;
        // Save software to database
        await this.softwareDao.saveSoftware(software);
    }

    async getAllSoftware(): Promise< Software[] > {

        const softwares = await this.softwareDao.getAllSoftware();

        if(!softwares)
        {
            throw new Error("Software not found");
        }

        return softwares;  
    }

}
