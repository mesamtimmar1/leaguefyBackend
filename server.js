const express = require('express');
const app = express();
const routes = require('./api/routes/routes');

routes(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running'));

