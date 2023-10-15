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
  const [row] = await pool.query(`SELECT * FROM tareas WHERE id = ? `, [id]);
  return row[0];
}

export async function getSharedTareasById(id) {
    const [row] = await pool.query(`SELECT * FROM shared_tareas WHERE tarea_id = ?`, [id]);
    return row[0];
  }

getTareas(1);
