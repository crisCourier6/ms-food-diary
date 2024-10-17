import { NextFunction, Request, Response } from "express"
import { DiaryEntryController } from "./DiaryEntryController"
import { FoodDiaryController } from "./FoodDiaryController"
import { Channel } from "amqplib"
import { FoodDiary } from "../entity/FoodDiary"
import axios from "axios"
import "dotenv/config"

export class MainController{

    private foodDiaryController = new FoodDiaryController
    private diaryEntryController = new DiaryEntryController

    // food diary

    // foodDiaryAll() retorna todos los diarios alimenticios
    async foodDiaryAll(req: Request, res: Response, next: NextFunction, channel: Channel) {
        return this.foodDiaryController.all(req, res)  
    }

    async foodDiaryAllGoogle(req: Request, res: Response, next: NextFunction, channel: Channel) {
        const diaries = await this.foodDiaryController.allGoogle(req.params.token, res)
        return diaries
    }
    // foodDiaryOne() retorna el diario alimenticio con la id indicada
    async foodDiaryOne(req: Request, res: Response, next: NextFunction, channel: Channel) {
        return this.foodDiaryController.one(req, res)
    }
    // foodDiaryOneByUser() retorna el diario con el id de usuario indicado en los parámetros de la uri
    async foodDiaryOneByUser(req: Request, res: Response, next: NextFunction, channel: Channel){
        return this.foodDiaryController.allByUserId(req.params.userId, res)
    }
    // foodDiarySave() crea un diario nuevo con los datos provenientes en la request y lo retorna
    async foodDiarySave(req: Request, res: Response, next: NextFunction, channel: Channel) {
       return this.foodDiaryController.create(req, res)
    }

    async foodDiarySaveGoogle(req: Request, res: Response, next: NextFunction, channel: Channel) {
        return this.foodDiaryController.createGoogle(req, res)
    }

    // foodDiaryUpdate() modifica los datos de un diario y retorna el resultado
    async foodDiaryUpdate(req: Request, res: Response, next: NextFunction, channel: Channel) {
        return this.foodDiaryController.update(req, res)
    }
    // foodDiaryRemove() elimina el diario con el id indicado en los parámetros de la uri
    async foodDiaryRemove(req: Request, res: Response, next: NextFunction, channel: Channel){
        return this.foodDiaryController.remove(req, res, next)
    }

    // foodDiaryRemove() elimina el diario con el id indicado en los parámetros de la uri
    async foodDiaryRemoveGoogle(req: Request, res: Response, next: NextFunction, channel: Channel){
        return this.foodDiaryController.removeGoogle(req, res, next)
    }

    // foodDiaryRemoveByUser() elimina los diarios con el id de usuario indicado en los parámetros de la uri
    async foodDiaryRemoveByUser(req: Request, res: Response, next: NextFunction, channel: Channel){
        return this.foodDiaryController.removeByUser(req, res, next)
    }

    // diary entry

    // diaryEntryAll() retorna todos los registros de diarios
    async diaryEntryAll(req: Request, res: Response, next: NextFunction, channel: Channel) {
        return this.diaryEntryController.all(req,res)
    }

    // diaryEntryAll() retorna todos los registros de diarios
    async diaryEntryAllByDiaryGoogle(req: Request, res: Response, next: NextFunction, channel: Channel) {
        return this.diaryEntryController.allByDiaryGoogle(req, res)
    }

    // diaryEntryOne() retorna el rol con la id indicada en los parámetros de la uri
    async diaryEntryOne(req: Request, res: Response, next: NextFunction, channel: Channel) {
        return this.diaryEntryController.one(req, res)
    }
    // diaryEntryCreate() crea un nuevo rol con los datos provenientes en la request y lo retorna
    async diaryEntryCreate(req: Request, res: Response, next: NextFunction, channel: Channel) {
        return this.diaryEntryController.create(req, res)
    }

    async diaryEntrySaveGoogle(req: Request, res: Response, next: NextFunction, channel: Channel) {
        return this.diaryEntryController.createGoogle(req, res)
    }
    // diaryEntryUpdate() actualiza los datos del rol y lo retorna
    async diaryEntryUpdate(req: Request, res: Response, next: NextFunction, channel: Channel) {
        return this.diaryEntryController.update(req, res)
    }

    async diaryEntryUpdateGoogle(req: Request, res: Response, next: NextFunction, channel: Channel) {
        return this.diaryEntryController.patchGoogle(req, res)
    }
    // diaryEntryRemoveById() elimina el rol con la id indicada en los parámetros de la URI
    async diaryEntryRemoveById(req: Request, res: Response, next: NextFunction, channel: Channel) {
        return this.diaryEntryController.remove(req.params.entryId, res, next)
    }

    async diaryEntryRemoveByIdGoogle(req: Request, res: Response, next: NextFunction, channel: Channel) {
        return this.diaryEntryController.removeGoogle(req, res, next)
    }
}