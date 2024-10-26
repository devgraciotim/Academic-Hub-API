import { Request, Response } from "express";
import { RoomService } from "../services/RoomService";
import { isDataView } from "util/types";
import { roomRepository } from "../repositories/RoomRepository";

const roomService = new RoomService();

export class RoomController {
    async create(req: Request, res: Response): Promise<void> {
        const { name, description } = req.body;

        try {
            const newRoom = await roomService.create(name, description)
            res.status(201).json(newRoom);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error "})
        }
    }

    async createVideo(req: Request, res: Response): Promise<void> {
        const { title, url } = req.body;
        const { idRoom } = req.params;
    
        try {
            const newVideo = await roomService.createVideo(title, url, Number(idRoom));
    
            if (!newVideo) {
                res.status(404).json({ message: "Room not found!" });
                return;
            }
            
            res.status(201).json(newVideo);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
    
    async roomSubject(req: Request, res: Response): Promise<void> {
        const { subject_id } = req.body;
        const { idRoom } = req.params;

        try {
            const newSubject = await roomService.createSubject(subject_id, Number(idRoom));

            if(!newSubject) {
                res.status(404).json({ message: "Room not found!" });
                return;
            }

            res.status(204).json(newSubject);
        } catch (error) { 
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const rooms = await roomService.findAll();
            res.status(200).json(rooms)
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
 }