import { AppDataSource } from '../config/data-source';
import { AccessRequest } from '../entities/AccessRequest';
import { Status } from '../constants/status';

export class RequestsDao {
    private requestsRepository = AppDataSource.getRepository(AccessRequest);

    async saveAccessRequest(request: AccessRequest): Promise<AccessRequest> {
        return this.requestsRepository.save(request);
    }

    async getAllPendingRequests(): Promise<{ requests: AccessRequest[] }> {
        return { 
            requests: await this.requestsRepository
                .createQueryBuilder('request')
                .where('request.status = :status', { status: Status.Pending })
                .getMany()
        };
    }

    async updateRequestStatus(id: number, status: Status): Promise<AccessRequest> {
        return this.requestsRepository
            .createQueryBuilder()
            .update(AccessRequest)
            .set({ status })
            .where('id = :id', { id })
            .returning('*')
            .execute()
            .then(result => result.raw[0]);
    }
}