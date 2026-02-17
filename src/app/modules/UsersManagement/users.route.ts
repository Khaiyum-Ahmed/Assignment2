import express from 'express';
import { usersControllers } from './users.controller';
const router = express.Router();

router.post('/create-users', usersControllers.createUsers);
router.get('/', usersControllers.getAllUsers);
router.get('/:userId', usersControllers.getSingleUser);

export const usersRoute = router;
