import express from 'express';
import { validateUser } from '../middlewares/authMiddleware';
import { roleValidator } from '../middlewares/validators/roleValidator';
import { USER_ROLES } from '../constants/user';
import { RequestsController } from '../controllers/requestsController';


const router = express.Router();

const requestsController = new RequestsController();

router.post('/', validateUser, roleValidator(USER_ROLES.Employee), requestsController.createRequest.bind(requestsController));
// router.get('/', validateUser, roleValidator(USER_ROLES.Admin), softwareController.getAllSoftware.bind(softwareController));

export const requestsRoutes = router;
 