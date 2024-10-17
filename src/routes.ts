import { MainController } from "./controller/MainController";


export const Routes = [{
    method: "get",
    route: "/food-diary",
    controller: MainController,
    action: "foodDiaryAll"
}, {
    method: "get",
    route: "/food-diary/byId/:id",
    controller: MainController,
    action: "foodDiaryOne"
}, 
{
    method: "get",
    route: "/food-diary/byUser/:userId",
    controller: MainController,
    action: "foodDiaryOneByUser"
},{
    method: "post",
    route: "/food-diary",
    controller: MainController,
    action: "foodDiarySave"
}, {
    method: "delete",
    route: "/food-diary/byId/:id",
    controller: MainController,
    action: "foodDiaryRemove"
}, {
    method: "patch",
    route: "/food-diary/byId/:id",
    controller: MainController,
    action: "foodDiaryUpdate"
}, {
    method: "delete",
    route: "/food-diary/byUser/:userId",
    controller: MainController,
    action: "foodDiaryRemoveByUser"
}, {
    method: "get",
    route: "/food-diary-google/:token",
    controller: MainController,
    action: "foodDiaryAllGoogle"
}, {
    method: "post",
    route: "/food-diary-google/:token",
    controller: MainController,
    action: "foodDiarySaveGoogle"
}, {
    method: "delete",
    route: "/food-diary-google/:token",
    controller: MainController,
    action: "foodDiaryRemoveGoogle"
}, {
    method: "get",
    route: "/diary-entry-google/:token/:id",
    controller: MainController,
    action: "diaryEntryAllByDiaryGoogle"
}, {
    method: "post",
    route: "/diary-entry-google/:token/:id",
    controller: MainController,
    action: "diaryEntrySaveGoogle"
}, {
    method: "patch",
    route: "/diary-entry-google/:token/:id",
    controller: MainController,
    action: "diaryEntryUpdateGoogle"
}, {
    method: "delete",
    route: "/diary-entry-google/:token/:id",
    controller: MainController,
    action: "diaryEntryRemoveByIdGoogle"
}, 
{
    method: "get",
    route: "/food-diary/byId/:id/entries",
    controller: MainController,
    action: "diaryEntryAll"
}, 
{
    method: "get",
    route: "/food-diary/byId/:id/entries/:entryId",
    controller: MainController,
    action: "diaryEntryOne"
},
{
    method: "post",
    route: "/food-diary/byId/:id/entries",
    controller: MainController,
    action: "diaryEntryCreate"
},
{
    method: "patch",
    route: "/food-diary/byId/:id/entries/:entryId",
    controller: MainController,
    action: "diaryEntryUpdate"
},
{
    method: "get",
    route: "/food-diary/byId/:id/entries/:entryId",
    controller: MainController,
    action: "diaryEntryRemove"
},]