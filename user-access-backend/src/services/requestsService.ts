import { RequestsDao } from '../dao/requestsDao';
import { AccessRequest } from '../entities/AccessRequest';
import { Software } from '../entities/Software';
import { ACCESS_TYPE } from '../constants/user';
import { Status } from '../constants/status';
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
        request.user = data.user;
        // Save requests to database
        await this.requestsDao.saveAccessRequest(request);
    }

    //Get all pending requests
    async getAllPendingRequests(): Promise<{ requests: AccessRequest[] }> {
        try {
            const requests = await this.requestsDao.getAllPendingRequests();
            
            if (!requests || !requests.requests) {
                return { requests: [] };
            }

            return requests;
        } catch (error) {
            throw new Error("Failed to fetch pending requests");
        }
    }

    async updateRequestStatus(id: number, status: Status): Promise<AccessRequest> {
        try {
            return await this.requestsDao.updateRequestStatus(id, status);
        } catch (error) {
            throw new Error("Failed to update request status");
        }
    }

}
