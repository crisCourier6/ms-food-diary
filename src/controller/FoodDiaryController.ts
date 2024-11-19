import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { FoodDiary } from "../entity/FoodDiary"
import axios from "axios"

const GOOGLE_LISTS_URL = 'https://tasks.googleapis.com/tasks/v1/users/@me/lists'

export class FoodDiaryController {

    private foodDiaryRepository = AppDataSource.getRepository(FoodDiary)

    async all(req:Request, res:Response) {
        const {d, u} = req.params
        const withEntries = req.query.we === "true"
        const relations = []
        if (withEntries){
            relations.push("diaryEntry")
        }

        if (u){
            return this.foodDiaryRepository.findOne({where: {userId:u}, relations})
        }

        if (d){
            return this.foodDiaryRepository.findOne({where: {id:d}, relations})
        }
        return this.foodDiaryRepository.find({relations})
    }

    async one(req:Request, res: Response) {
        const {id} = req.params
        if (!id) {
            res.status(400)
            return {message: "Error: id inválida"}
        }
        const foodDiary = await this.foodDiaryRepository.findOne({
            where: { id: id }
        })

        if (!foodDiary) {
            res.status(404)
            return {message: "Error: Diario no existe"}
        }
        return foodDiary
    }

    async allByUserId(id: string, res: Response) {
  
        const foodDiary = await this.foodDiaryRepository.find({
            where: { userId: id },
            relations: ["diaryEntry"]
        })

        if (!foodDiary) {
            res.status(404)
            return {message:"Diario no encontrado"}
        }
        return foodDiary
    }

    async create(request: Request, response: Response) {
        const { userId, title, description } = request.body;
       
           
        const newFoodDiary = Object.assign(new FoodDiary(), {
            userId,
            title,
            description
        })

        const newDiary = await this.foodDiaryRepository.save(newFoodDiary)
        return this.foodDiaryRepository.findOne({where: {id:newDiary.id}, relations: ["diaryEntry"]})
        
    }
    async update(request: Request, response:Response) {
        const {id} = request.params
        if (!id){
            response.status(400)
            return { message: "Error: Parámetro inválido"}
        }
        const updatedFoodDiary = await this.foodDiaryRepository.update(id, request.body)
        if (updatedFoodDiary.affected===1){
            return this.foodDiaryRepository.findOne({where: {id:id}, relations: ["diaryEntry"]})
        }
        response.status(500)
        return { message: "Error al actualizar diario"}
        
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = request.params.id

        if (!id){
            response.status(400)
            return {message: "Error: id inválida"}
        }

        let foodDiaryToRemove = await this.foodDiaryRepository.findOneBy({ id: id })
        
        if (!foodDiaryToRemove) {
            response.status(404)
            return {message: "Error: Diario no encontrado"}
        }
        return this.foodDiaryRepository.remove(foodDiaryToRemove)
    }

    async removeByUser(request: Request, response: Response, next: NextFunction) {
        const id = request.params.userId

        if (!id){
            response.status(400)
            return {message: "Error: id inválida"}
        }

        let foodDiaryToRemove = await this.foodDiaryRepository.find({where : { userId: id}})
        
        if (!foodDiaryToRemove || foodDiaryToRemove.length===0) {
            response.status(404)
            return {message: "Error: Diarios no encontrados"}
        }
        return this.foodDiaryRepository.remove(foodDiaryToRemove)
    }

    async allGoogle(token: string, res:Response){
        try{
            const diaries = await axios.get(GOOGLE_LISTS_URL, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return diaries.data.items.filter((list:any) => list.title.includes(" EF"))
        }
        catch(error){
            res.status(error.status)
            return {message: "Error al comunicarse con la API de google"}
        }
    }

    async createGoogle(req: Request, res: Response) {
        const { title } = req.body;
        const { token } = req.params
        try{
            const newDiary = await axios.post(GOOGLE_LISTS_URL, 
                {
                    title: `${title} EF`
                },
                {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return newDiary.data
        }
        catch(error){
            res.status(error.status)
            return {message: "Error al comunicarse con la API de google"}
        }     
    }

    async removeGoogle(req: Request, res: Response, next: NextFunction) {
        const { id } = req.body
        const { token } = req.params

        if (!id){
            res.status(400)
            return {message: "Error: id inválida"}
        }

        try{
            const deletedDiary = await axios.delete(`${GOOGLE_LISTS_URL}/${id}`,
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