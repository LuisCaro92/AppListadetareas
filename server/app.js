import express from "express";
import{
    getTareas,
    sharedTarea,
    deleteTareas,
    getTareasById,
    createTareas,
    toggleCompleted,
    getUserByEmail,
    getUserById,
    getSharedTareasById,
} from "./database.js"

const app = express();
app.use(express.json());

app.get("/tareas/:id", async (req, res) =>{
    const tareas = await getTareasById(req.params.id);
    res.status(200).send(tareas);
})

app.listen(8080, ()=>{
    console.log("Server running on port 8080");
});