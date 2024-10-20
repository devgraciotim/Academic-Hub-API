import { Router } from "express";
import { SubjectController } from "./controllers/SubjectController";

const routes = Router();

routes.post("/subject", new SubjectController().create);

routes.get("/subject", new SubjectController().findAll);

routes.get("/subject/:id", new SubjectController().findById);

routes.put("/subject/:id", new SubjectController().update);

routes.delete("/subject/:id", new SubjectController().delete);

export default routes;