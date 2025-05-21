import { Request, Response } from 'express';
import { RequestsService } from '../services/requestsService';
import { Status } from '../constants/status';

export class RequestsController {
    private requestsService: RequestsService;

    constructor() {
        this.requestsService = new RequestsService();
    }

    async createRequest(req: Request, res: Response): Promise<void> {
        try {
            let requestData = req.body;
            requestData.user = req.user;
            
            const request = await this.requestsService.createAccessRequest(requestData);
            
            res.status(201).json({
                message: 'Request created successfully',
                request: request
            });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({
                    message: 'Error creating access request',
                    error: error.message
                });
            } else {
                res.status(500).json({
                    message: 'Error creating access request',
                    error: 'Unknown error occurred'
                });
            }
        }
    }

    async getAllPendingRequests(req: Request, res: Response): Promise<void> {
        try {
            const requests = await this.requestsService.getAllPendingRequests();
            
            res.status(201).json({
                message: 'Requests fetched successfully',
                requests: requests
            });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({
                    message: 'Error fetching access requests',
                    error: error.message
                });
            } else {
                res.status(500).json({
                    message: 'Error fetching access requests',
                    error: 'Unknown error occurred'
                });
            }
        }
    }

    async updateRequestStatus(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const { status } = req.body;
            
            const validStatus = Object.values(Status).includes(status as Status);
            if (!validStatus) {
                throw new Error('Invalid status value');
            }

            const updatedRequest = await this.requestsService.updateRequestStatus(id, status);
            
            res.status(200).json({
                message: 'Request status updated successfully',
                request: updatedRequest
            });
        } catch (error) {
            res.status(500).json({
                message: 'Failed to update request status',
                error: error instanceof Error ? error.message : 'Unknown error occurred'
            });
        }
    }
}
