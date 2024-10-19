import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Room } from "./Room";

@Entity('videos')
export class Video {
    @PrimaryGeneratedColumn("identity")
    id: number

    @Column({ nullable: false, type: "text" })
    title: string

    @Column({ nullable: false, type: "text" })
    url: string

    @ManyToOne(() => Room, room => room.videos)
    @JoinColumn({ name: "room_id" })
    room: Room
}