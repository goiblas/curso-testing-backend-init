import express from 'express';

const router = express.Router();

let users = [
    { id: 1, name: 'John Doe', isAdmin: true },
    { id: 2, name: 'Jane Doe', isAdmin: false },
    { id: 3, name: 'Jim Doe', isAdmin: false }
];

// Obtener todos los usuarios
router.get('/', (req, res) => {
    res.status(200).json(users);
});

// Crear un nuevo usuario
router.post('/', (req, res) => {
    const newUser = { id: users.length + 1, ...req.body };
    users.push(newUser);
    res.status(201).json(newUser);
});

// Actualizar un usuario existente
router.put('/:id', (req, res) => {
    const userId = Number(req.params.id);
    const userIndex = users.findIndex(user => user.id === userId);

    if (userIndex !== -1) {
        users[userIndex] = { id: userId, ...req.body };
        res.status(200).json(users[userIndex]);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// Eliminar un usuario
router.delete('/:id', (req, res) => {
    const userId = Number(req.params.id);
    users = users.filter(user => user.id !== userId);

    res.status(200).json({ message: 'User deleted' });
});

export default router;