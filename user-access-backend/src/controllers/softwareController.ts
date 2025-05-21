import { Request, Response } from 'express';
import { SoftwareService } from '../services/softwareService';

export class SoftwareController {
    private softwareService: SoftwareService;

    constructor() {
        this.softwareService = new SoftwareService();
    }

    async createSoftware(req: Request, res: Response): Promise<void> {
        try {
            const softwareData = req.body;
            const software = await this.softwareService.createSoftware(softwareData);
            
            res.status(201).json({
                message: 'Software created successfully',
                software: software
            });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({
                    message: 'Error creating software',
                    error: error.message
                });
            } else {
                res.status(500).json({
                    message: 'Error creating software',
                    error: 'Unknown error occurred'
                });
            }
        }
    }

    async getAllSoftware(req: Request, res: Response): Promise<void> {
        try {
            const software = await this.softwareService.getAllSoftware();
            
            res.status(201).json({
                message: 'Software fetched successfully',
                software: software
            });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({
                    message: 'Error fetching software',
                    error: error.message
                });
            } else {
                res.status(500).json({
                    message: 'Error fetching software',
                    error: 'Unknown error occurred'
                });
            }
        }
    }
}
