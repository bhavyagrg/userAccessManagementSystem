import express from 'express';
import { validateUser } from '../middlewares/authMiddleware';
import { roleValidator } from '../middlewares/validators/roleValidator';
import { USER_ROLES } from '../constants/user';
import { SoftwareController } from '../controllers/softwareController';


const router = express.Router();

const softwareController = new SoftwareController();

router.post('/', validateUser, roleValidator(USER_ROLES.Admin), softwareController.createSoftware.bind(softwareController));
router.get('/list-softwares', validateUser, roleValidator(USER_ROLES.Admin), softwareController.getAllSoftware.bind(softwareController));

export const softwareRoutes = router;
