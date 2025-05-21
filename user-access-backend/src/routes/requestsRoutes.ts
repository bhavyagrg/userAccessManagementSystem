import express from 'express';
import { validateUser } from '../middlewares/authMiddleware';
import { roleValidator } from '../middlewares/validators/roleValidator';
import { USER_ROLES } from '../constants/user';
import { RequestsController } from '../controllers/requestsController';

const router = express.Router();

const requestsController = new RequestsController();

// Create new request
router.post('/', validateUser, roleValidator(USER_ROLES.Employee), requestsController.createRequest.bind(requestsController));

// Get all pending requests
router.get('/pending-requests', validateUser, roleValidator(USER_ROLES.Manager), requestsController.getAllPendingRequests.bind(requestsController));

// Update request status (only for managers)
router.patch('/:id', validateUser, roleValidator(USER_ROLES.Manager), requestsController.updateRequestStatus.bind(requestsController));

export const requestsRoutes = router;