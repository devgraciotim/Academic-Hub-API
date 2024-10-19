import express, { Request, Response } from "express";
import { AppDataSource } from "./data-source";

AppDataSource.initialize().then(() => {
    const app = express();
    app.use(express.json());

    app.get("/", (req: Request, res: Response): void => {
        res.json("connected");
    });

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch(error => {
    console.error("Error during Data Source initialization:", error);
});
