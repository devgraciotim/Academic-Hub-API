import { Collection, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Room } from "./Room";

@Entity('subjects')
export class Subject {
    @PrimaryGeneratedColumn("identity")
    id: number

    @Column({ nullable:false, type: "text" })
    name: string

    @ManyToMany(() => Room, room => room.subjects)
    @JoinTable({
        name: "room_subject",
        joinColumn: {
            name: "room_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "subject_id",
            referencedColumnName: "id"
        }
    })
    rooms: Room[]

}