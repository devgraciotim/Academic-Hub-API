import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Video } from "./Video";
import { Subject } from "./Subject";

@Entity('rooms')
export class Room {
    @PrimaryGeneratedColumn("identity")
    id: number

    @Column({ nullable: false, type: "text" })
    name: string

    @Column({ nullable: true, type: "text" })
    description: string

    @OneToMany(() => Video, video => video.room)
    videos: Video[]

    @ManyToMany(() => Subject, subject => subject.rooms)
    subjects: Subject[]
}