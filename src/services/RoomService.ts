import { Room } from "../entities/Room";
import { roomRepository } from "../repositories/RoomRepository";
import { subjectRepository } from "../repositories/SubjectRepository";
import { videoRepository } from "../repositories/VideoRepository";


export class RoomService { 
    async create(name: string, description: string): Promise<Room> {
        const newRoom = roomRepository.create({ name, description });
        return await roomRepository.save(newRoom);
    }

    async createVideo(title: string, url: string, idRoom: number) {
        const room = await roomRepository.findOne({where: { id: idRoom }});

        if(!room) {
            return null;
        }

        const newVideo = videoRepository.create({
            title,
            url,
            room
        });

        return await videoRepository.save(newVideo);
    }

    async createSubject(subject_id: number, idRoom: number) {
        const room = await roomRepository.findOne({where: { id: idRoom }});

        if(!room) {
            return null;
        }

        const subject = await subjectRepository.findOneBy({ id: subject_id})

        if(!subject){
            return null;
        }

        const roomUpdated = {
            ...room,
            subjects: [subject]
        }

        return await roomRepository.save(roomUpdated);
    }

    async findAll() {
        return await roomRepository.find({
            relations: {
                subjects: true,
                videos: true
            }
        });
    }
}