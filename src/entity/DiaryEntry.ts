import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm"
import { FoodDiary } from "./FoodDiary"

@Entity()
export class DiaryEntry {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    diaryId: string

    @Column()
    date: Date

    @Column({default: "Mi registro"})
    title: string

    @Column({default: "Sin contenido"})
    content: string

    @ManyToOne(()=>FoodDiary, foodDiary  => foodDiary.diaryEntry, {onDelete: "CASCADE"})
    @JoinColumn({name: "diaryId"})
    foodDiary: FoodDiary
}
