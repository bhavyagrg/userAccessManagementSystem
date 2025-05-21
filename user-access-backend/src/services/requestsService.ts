import { RequestsDao } from '../dao/requestsDao';
import { AccessRequest } from '../entities/AccessRequest';
import { Software } from '../entities/Software';
import { ACCESS_TYPE } from '../constants/user';
import { User } from '../entities/User';

export class RequestsService {
    private requestsDao: RequestsDao;

    constructor() {
        this.requestsDao = new RequestsDao();
    }

    async createAccessRequest(data: { software: Software; accessType: ACCESS_TYPE; reason: string, user: User }): Promise<void> {
        const request = new AccessRequest();
        request.software = data.software;
        request.accessType = data.accessType;
        request.reason = data.reason;
        console.log(data.user);
        request.user = data.user;
        // Save requests to database
        await this.requestsDao.saveAccessRequest(request);
    }

    async getAllRequests(): Promise<{ requests: AccessRequest[] }> {

        const requests = await this.requestsDao.getAllRequests();

        if(!requests)
        {
            throw new Error("Requests not found");
        }

        return requests;  
    }

}
