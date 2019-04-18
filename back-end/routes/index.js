const authCheck = require('../middleware/auth-check');
const roleCheck = require('../middleware/role-check');
const authRoutes = require('./auth');
const about = require('./about');
const phoneRoutes = require('./phone');
const commentRoutes = require('./comment');
const purchaseRoutes = require('./purchase');

module.exports = (app) => {
    app.use('/auth', authRoutes);
    app.get('/about',roleCheck('Admin'), about.getAbout);

    app.use('/phone', phoneRoutes);
    app.use('/comment', commentRoutes);
    app.use('/purchase', purchaseRoutes);
    
    // app.get('/plan/:year', authCheck, yearly.getYear);
   
};

