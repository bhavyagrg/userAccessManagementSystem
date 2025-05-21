import { Request, Response } from 'express';
import { RequestsService } from '../services/requestsService';

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

    async getAllRequests(req: Request, res: Response): Promise<void> {
        try {
            const requests = await this.requestsService.getAllRequests();
            
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
}
