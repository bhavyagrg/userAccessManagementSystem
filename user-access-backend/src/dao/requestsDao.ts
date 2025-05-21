import { AppDataSource } from '../config/data-source';
import { AccessRequest } from '../entities/AccessRequest';
import { Status } from '../constants/status';

export class RequestsDao {
    private requestsRepository = AppDataSource.getRepository(AccessRequest);

    async saveAccessRequest(request: AccessRequest): Promise<AccessRequest> {
        return this.requestsRepository.save(request);
    }

    async getAllPendingRequests(): Promise<AccessRequest[]> {
        return await this.requestsRepository
                .createQueryBuilder('request')
                .leftJoinAndSelect('request.user', 'user')
                .leftJoinAndSelect('request.software', 'software')
                .where('request.status = :status', { status: Status.Pending })
                .select(['request', 'user.username', 'software.name'])
                .getMany()
;
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