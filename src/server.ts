import express, { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import routes from "./routes";

AppDataSource.initialize().then(() => {
    const app = express();
    app.use(express.json());

    app.use(routes);

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch(error => {
    console.error("Error during Data Source initialization:", error);
});
