const { Router } = require('express');
const { getUsers, createUser, updateUsers, deleteUsers, getUserById } = require('../controllers/usersController');
const router = Router()

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.patch("/users/:id", updateUsers);
router.delete('/users/:id', deleteUsers);

module.exports = router;