import { Request, Response } from "express";
import { SubjectService } from "../services/SubjectService";

const subjectService = new SubjectService();

export class SubjectController {
    async create(req: Request, res: Response): Promise<void> {
        const { name } = req.body;

        if (!name) {
            res.status(400).json({ message: "The name is required" });
            return;
        }

        try {
            const newSubject = await subjectService.create(name);
            res.status(201).json(newSubject);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async findAll(req: Request, res: Response): Promise<void> {
        try {
            const allSubjects = await subjectService.findAll();
            res.status(200).json(allSubjects);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async findById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const subject = await subjectService.findById(parseInt(id));

            if (subject) {
                res.status(200).json(subject);
            } else {
                res.status(404).json({ message: "Subject not found" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { name } = req.body;

        try {
            const updatedSubject = await subjectService.update(parseInt(id), name);

            if (!updatedSubject) {
                res.status(404).json({ message: "Subject not found" });
                return;
            }

            res.status(200).json(updatedSubject);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const deleted = await subjectService.delete(parseInt(id));

            if (!deleted) {
                res.status(404).json({ message: "Subject not found" });
                return;
            }

            res.status(200).json({ message: "Subject removed successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}
