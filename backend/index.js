const app = require('./app');

const { SERVER } = require('./src/config/config');

app.listen(SERVER.PORT, () => console.log(`Backend server is running on port ${SERVER.PORT}`));
