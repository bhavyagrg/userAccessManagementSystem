import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Server is healthy!' });
});

export const healthRoutes = router;
