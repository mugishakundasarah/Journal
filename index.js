const config = require("config")
const port = config.get("app.port");
const appDebug = require("debug")("app:Debug")
const express = require("express")
const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require('./swagger.json');
const app = express()
const {formatResult} = require("./utils/import")
const {diaryRoutes} = require("./routes")
require('./models/db')

app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/diary", diaryRoutes)
app.use("/", (req, res) => {
    res.send(formatResult({
        status: 200,
        message: 'welcome to our page'
    }));
});

app.listen(port, () => appDebug(`app started listen on port ..... ${port}`))
