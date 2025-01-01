import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { DiaryEntry } from "../entity/DiaryEntry"
import { FoodDiary } from "../entity/FoodDiary"
import axios from "axios"

const GOOGLE_TASKS_URL = "https://tasks.googleapis.com/tasks/v1/lists/LIST_ID/tasks"

export class DiaryEntryController {

    private readonly diaryEntryRepository = AppDataSource.getRepository(DiaryEntry)
    private readonly foodDiaryRepository = AppDataSource.getRepository(FoodDiary)

    async all(req:Request, res:Response) {
        const {id} = req.params
        return this.diaryEntryRepository.find({where: {diaryId:id}})
    }

    async one(req:Request, res:Response) {
        const {entryId} = req.params
        const diaryEntry = await this.diaryEntryRepository.findOne({
            where: { id: entryId}
        })

        if (!diaryEntry) {
            res.status(404)
            return {message:"Registro no encontrado"}
        }
        return diaryEntry
    }

    async oneByDiaryId(req:Request, res: Response) {
        const {id} = req.params
        const diaryEntry = await this.diaryEntryRepository.findOne({
            where: { diaryId: id }
        })

        if (!diaryEntry) {
            res.status(404)
            return {message:"Registro no encontrado"}
        }
        return diaryEntry
    }

    async create(request: Request, response: Response) {
        const {id} = request.params
        const { title, content, date} = request.body;
        
        const foodDiary = await this.foodDiaryRepository.findOne({
            where: {id: id}
        })
        if (!foodDiary){
            response.status(404)
            return {message: "Error: Diario no existe"}
        }

        const newDiaryEntry = Object.assign(new DiaryEntry(), {
            title,
            content,
            date: new Date(date),
            foodDiary
        })
        return this.diaryEntryRepository.save(newDiaryEntry)
        
    }
    async update(request: Request, response: Response) {
        const {entryId} = request.params
        if (!entryId){
            response.status(400)
            return {message: "Error: Parámetro inválido"}
        }
        const updatedDiaryEntry = await this.diaryEntryRepository.update(entryId, request.body)
        if (updatedDiaryEntry.affected===1){
            return this.diaryEntryRepository.findOne({where:{id:request.params.entryId}})
        }
        response.status(500)
        return {message: "Error al actualizar entrada"}
        
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const {entryId} = request.params

        if (!entryId){
            response.status(400)
            return {message: "Error: Parámetro inválido"}
        }

        let diaryEntryToRemove = await this.diaryEntryRepository.findOneBy({ id: entryId })
        
        if (!diaryEntryToRemove) {
             response.status(404)
            return {message: "Error: entrada no existe"}
        }
        return this.diaryEntryRepository.remove(diaryEntryToRemove)
    }

    async allByDiaryGoogle(req: Request, res: Response){
        const { token, id } = req.params
        try{
            const entries = await axios.get(GOOGLE_TASKS_URL.replace("LIST_ID", id), {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return entries.data
        }
        catch(error){
            res.status(error.status)
            return {message: "Error al comunicarse con la API de google"}
        }
    }

    async createGoogle(req: Request, res: Response) {
        const { title, notes, due } = req.body;
        const { token, id } = req.params
        try{
            const newEntry = await axios.post(GOOGLE_TASKS_URL.replace("LIST_ID", id), 
                {
                    title,
                    notes,
                    due
                },
                {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(newEntry)
            return newEntry.data
        }
        catch(error){
            res.status(error.status)
            return {message: "Error al comunicarse con la API de google"}
        }     
    }

    async patchGoogle(req: Request, res: Response){
        const { title, notes, due, entryId } = req.body;
        const { token, id } = req.params
        console.log(title, notes, due, entryId)
        try{
            const updatedEntry = await axios.patch(
                `${GOOGLE_TASKS_URL.replace("LIST_ID", id)}/${entryId}`,
                {
                    title, 
                    notes,  
                    due,    
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            return updatedEntry.data
        }
        catch(error){
            res.status(error.status)
            console.log(error)
            return {message: "Error al comunicarse con la API de google"}
        } 
    }

    async removeGoogle(req: Request, res: Response, next: NextFunction) {
        const { entryId } = req.body
        const { token, id } = req.params
        console.log(entryId, token, id)
        if (!id){
            res.status(400)
            return {message: "Error: id inválida"}
        }

        try{
            const deletedDiary = await axios.delete(`${GOOGLE_TASKS_URL.replace("LIST_ID", id)}/${entryId}`,
                {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            res.status(200)
            return deletedDiary.data
        }
        catch(error){
            res.status(error.status)
            return {message: "Error al comunicarse con la API de google"}
        }  
    }


}