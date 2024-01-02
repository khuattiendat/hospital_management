const authRoutes = require('./auth');
const userRoutes = require('./user');
const patientRoutes = require('./patient');
const specializationRoutes = require('./specialization');

const router = (app) => {
    app.use('/api/v1/auth', authRoutes);
    app.use('/api/v1/users', userRoutes);
    app.use('/api/v1/patients', patientRoutes);
    app.use('/api/v1/specializations', specializationRoutes);
}
module.exports = router;