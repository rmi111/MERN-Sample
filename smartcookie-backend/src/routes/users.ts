import express from 'express';
import controller from '../controllers/users';
const router = express.Router();

router.get('/users', controller.getUser);
router.get('/users/sendemail', controller.sendEmail);
router.post('/users', controller.addUser);

export = router;