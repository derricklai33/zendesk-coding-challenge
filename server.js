const app = require('./app');
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log("Running on port " + PORT));