import { Router } from "express";
import { SubjectController } from "./controllers/SubjectController";
import { RoomController } from "./controllers/RoomController";

const routes = Router();

routes.post("/subject", new SubjectController().create);

routes.get("/subject", new SubjectController().findAll);

routes.get("/subject/:id", new SubjectController().findById);

routes.put("/subject/:id", new SubjectController().update);

routes.delete("/subject/:id", new SubjectController().delete);

routes.post("/room", new RoomController().create);

routes.post("/room/:idRoom/create", new RoomController().createVideo);

routes.post("/room/:idRoom/subject", new RoomController().roomSubject);

routes.get("/room", new RoomController().findAll);

export default routes;