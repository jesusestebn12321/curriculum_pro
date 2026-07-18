import { getConnection } from "./lib/candidaturas-db";

const c = await getConnection();
const [rows] = await c.query(
  `SELECT id, empresa, puesto, estado, portal_nombre, url, created_at, notas
   FROM candidaturas
   WHERE empresa LIKE '%mente%'
      OR empresa LIKE '%inquieta%'
      OR url LIKE '%trabajosdiarios%'
      OR portal_nombre LIKE '%Trabajos%'
   ORDER BY created_at DESC`
);
console.log(JSON.stringify(rows, null, 2));
await c.end();
