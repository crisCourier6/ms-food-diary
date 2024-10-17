import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import { DiaryEntry } from "./DiaryEntry"

@Entity()
export class FoodDiary {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    userId: string

    @Column({default: "Mi diario alimenticio"})
    title: string

    @Column({default: "Sin descripción"})
    description: string

    @CreateDateColumn()
    createdAt:Date

    @UpdateDateColumn()
    updatedAt:Date

    @OneToMany(()=>DiaryEntry, diaryEntry=>diaryEntry.foodDiary)
    diaryEntry: DiaryEntry[]
}
