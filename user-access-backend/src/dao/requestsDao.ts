import { AppDataSource } from '../config/data-source';
import { AccessRequest } from '../entities/AccessRequest';

export class RequestsDao {
    private requestsRepository = AppDataSource.getRepository(AccessRequest);

    async saveAccessRequest(request: AccessRequest): Promise<AccessRequest> {
        return this.requestsRepository.save(request);
    }

    async getAllRequests(): Promise<{ requests: AccessRequest[] }> {
        return { requests: await this.requestsRepository.find() };
    }
}