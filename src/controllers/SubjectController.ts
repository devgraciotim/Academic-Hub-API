import { Request, Response } from "express";
import { subjectRepository } from "../repositories/SubjectRepository";
import { Subject } from "../entities/Subject";

export class SubjectController {
    async create(req: Request, res: Response): Promise<void> {
        const { name } = req.body;

        if(!name) {
            res.status(400).json({ message: "The name is required"});
        }

        try {
            const newSubject = subjectRepository.create({
                name: name
            });

            await subjectRepository.save(newSubject);

            res.status(201).json(newSubject);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async findAll(req: Request, res: Response): Promise<void> {
        try {
            const allSubjects = await subjectRepository.find();

            res.status(200).json(allSubjects);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async findById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const subject = await subjectRepository.findOne({
                where: { id: parseInt(id) }
            });

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
            const subject = await subjectRepository.findOne({
                where: { id: parseInt(id) }
            });

            if (!subject) {
                res.status(404).json({ message: "Subject not found" });
                return;
            }

            subject.name = name;
            await subjectRepository.save(subject);

            res.status(200).json(subject);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
    
        try {
            const subjectId = parseInt(id);
    
            if (isNaN(subjectId)) {
                res.status(400).json({ message: "Invalid ID format" });
                return;
            }
    
            const subject = await subjectRepository.findOne({
                where: { id: subjectId }
            });
    
            if (!subject) {
                res.status(404).json({ message: "Subject not found" });
                return;
            }
    
            await subjectRepository.remove(subject);
    
            res.status(200).json({ message: "Subject removed successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}
