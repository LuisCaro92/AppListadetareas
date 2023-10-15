import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export async function getTareasById(id) {
  const [row] = await pool.query(
    `SELECT tareas.*, shared_tareas.shared_with_id
    FROM tareas
    LEFT JOIN shared_tareas ON tareas.id = shared_tareas.shared_with_id
    WHERE tareas.user_id = ? OR shared_tareas.shared_with_id = ?`,
    [id, id]
  );
}

export async function getTareas(id) {
  const [rows] = await pool.query(`SELECT * FROM tareas WHERE id = ? `, [id]);
  return rows[0];
}

export async function getSharedTareasById(id) {
    const [rows] = await pool.query(`SELECT * FROM shared_tareas WHERE tarea_id = ?`, [id]);
    return rows[0];
  }


export async function getUserById(id){
    const [rows] = await pool.query(`SELECT * FROM users WHERE id = ?`, [id]);
    return rows[0];
}

export async function getUserByEmail(email){
    const [rows] = await pool.query(`SELECT * FROM users WHERE email = ?`,[email]);
    return rows[0];
}


export async function createTareas(user_id, title){
    const [result] = await pool.query(
        `INSERT INTO tareas (user_id, title) VALUES ('?, ?)`,[user_id, title]
    );
    const tareaId = result.insertId;
    return getTareas(tareaId);
}


export async function  deleteTareas(id){
    const [result] = await pool.query(
        `DELETE FROM tareas WHERE id = ?;`,
        [id]
    );
}

export  async function toggleCompleted(id, value){
    const newValue = value === true ? "TRUE" : "FALSE";
    const [result] = await pool.query(
        `UPDATE tareas
        SET completed = ${newValue}
        WHERE id = ?;`, [id]
    );
    return result;
}



export async function sharedTarea(tarea_id, user_id, shared_with_id){
    const [result] = await pool.query(
        `INSERT INTO shared_tareas (tarea_id, user_id, shared_with_id)
        VALUES (?, ?, ?);`,[tarea_id, user_id, shared_with_id]
    );
    return result.insertId;
}

getTareas(1);
