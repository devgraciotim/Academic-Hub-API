import { subjectRepository } from "../repositories/SubjectRepository";
import { Subject } from "../entities/Subject";

export class SubjectService {
    async create(name: string): Promise<Subject> {
        const newSubject = subjectRepository.create({ name });
        return await subjectRepository.save(newSubject);
    }

    async findAll(): Promise<Subject[]> {
        return await subjectRepository.find();
    }

    async findById(id: number): Promise<Subject | null> {
        return await subjectRepository.findOne({
            where: { id }
        });
    }

    async update(id: number, name: string): Promise<Subject | null> {
        const subject = await subjectRepository.findOne({
            where: { id }
        });

        if (!subject) {
            return null;
        }

        subject.name = name;
        return await subjectRepository.save(subject);
    }

    async delete(id: number): Promise<boolean> {
        const subject = await subjectRepository.findOne({
            where: { id }
        });

        if (!subject) {
            return false;
        }

        await subjectRepository.remove(subject);
        return true;
    }
}
