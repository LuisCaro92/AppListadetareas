import express from "express";
import cors from 'cors';
import {
  getTareas,
  sharedTarea,
  deleteTareas,
  getTareasById,
  createTareas,
  toggleCompleted,
  getUserByEmail,
  getUserById,
  getSharedTareasById,
} from "./database.js";

const corsOption ={
    origin: "http://127.0.0.1:5173",
    methods: ["POST", "GET"],
    credentials:true,
}

const app = express();
app.use(express.json());
app.use(cors(corsOption));

app.get("/tareas/:id", async (req, res) => {
  const tareas = await getTareasById(req.params.id);
  res.status(200).send(tareas);
});

app.get("/tareas/shared_tareas/:id", async (req, res) => {
  const tarea = await getSharedTareasById(req.params.id);
  const author = await getUserById(tarea.user_id);
  const shared_with = await getUserById(tarea.shared_with_id);
  res.status(200).send({ author, shared_with });
});

app.get("/users/:id", async (req, res) => {
  const user = await getUserById(req.params.id);
  res.status(200).send(user);
});

app.put("/tareas/:id", async (req, res) => {
  const { value } = req.body;
  const tarea = await toggleCompleted(req.params.id, value);
  res.status(200).send(tarea);
});

app.delete("tareas/:id", async (req, res) => {
  await deleteTareas(req.params.id);
  res.send({ message: "Tarea borrada con exito" });
});

app.post("tareas/shared_tareas", async (req, res) =>{
    const {tarea_id, user_id, email} = req.body;
    //const {tarea_id, user_id, email, shared_with_id} = req.body;
    const userToshare = await getUserByEmail(email);
    const sheredTarea = await sharedTarea(tarea_id, user_id, userToshare.id);
    res.status(201).send(sharedTarea);
});

app.post("/tareas", async (req, res) =>{
    const {user_id, title} =req.body;
    const tarea = await createTareas(user_id, title);
    res.status(201).send(tarea);
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
