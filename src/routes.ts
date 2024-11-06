import { MainController } from "./controller/MainController";


export const Routes = [{
    method: "get",
    route: "/api/v1/food-diary",
    controller: MainController,
    action: "foodDiaryAll"
}, {
    method: "get",
    route: "/api/v1/food-diary/byId/:id",
    controller: MainController,
    action: "foodDiaryOne"
}, 
{
    method: "get",
    route: "/api/v1/food-diary/byUser/:userId",
    controller: MainController,
    action: "foodDiaryOneByUser"
},{
    method: "post",
    route: "/api/v1/food-diary",
    controller: MainController,
    action: "foodDiarySave"
}, {
    method: "delete",
    route: "/api/v1/food-diary/byId/:id",
    controller: MainController,
    action: "foodDiaryRemove"
}, {
    method: "patch",
    route: "/api/v1/food-diary/byId/:id",
    controller: MainController,
    action: "foodDiaryUpdate"
}, {
    method: "delete",
    route: "/api/v1/food-diary/byUser/:userId",
    controller: MainController,
    action: "foodDiaryRemoveByUser"
}, {
    method: "get",
    route: "/api/v1/food-diary-google/:token",
    controller: MainController,
    action: "foodDiaryAllGoogle"
}, {
    method: "post",
    route: "/api/v1/food-diary-google/:token",
    controller: MainController,
    action: "foodDiarySaveGoogle"
}, {
    method: "delete",
    route: "/api/v1/food-diary-google/:token",
    controller: MainController,
    action: "foodDiaryRemoveGoogle"
}, {
    method: "get",
    route: "/api/v1/diary-entry-google/:token/:id",
    controller: MainController,
    action: "diaryEntryAllByDiaryGoogle"
}, {
    method: "post",
    route: "/api/v1/diary-entry-google/:token/:id",
    controller: MainController,
    action: "diaryEntrySaveGoogle"
}, {
    method: "patch",
    route: "/api/v1/diary-entry-google/:token/:id",
    controller: MainController,
    action: "diaryEntryUpdateGoogle"
}, {
    method: "delete",
    route: "/api/v1/diary-entry-google/:token/:id",
    controller: MainController,
    action: "diaryEntryRemoveByIdGoogle"
}, 
{
    method: "get",
    route: "/api/v1/food-diary/byId/:id/entries",
    controller: MainController,
    action: "diaryEntryAll"
}, 
{
    method: "get",
    route: "/api/v1/food-diary/byId/:id/entries/:entryId",
    controller: MainController,
    action: "diaryEntryOne"
},
{
    method: "post",
    route: "/api/v1/food-diary/byId/:id/entries",
    controller: MainController,
    action: "diaryEntryCreate"
},
{
    method: "patch",
    route: "/api/v1/food-diary/byId/:id/entries/:entryId",
    controller: MainController,
    action: "diaryEntryUpdate"
},
{
    method: "get",
    route: "/api/v1/food-diary/byId/:id/entries/:entryId",
    controller: MainController,
    action: "diaryEntryRemove"
},]