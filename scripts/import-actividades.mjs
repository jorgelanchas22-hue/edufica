import fs from 'node:fs/promises';
import admin from 'firebase-admin';

const required = ['FIREBASE_DATABASE_URL', 'FIREBASE_SERVICE_ACCOUNT_JSON'];
for (const key of required) {
  if (!process.env[key]) {
    console.error(`Falta la variable de entorno ${key}`);
    process.exit(1);
  }
}

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

const db = admin.database();
const raw = await fs.readFile(new URL('../data/actividades-cooperacion.json', import.meta.url), 'utf8');
const actividades = JSON.parse(raw);

if (!Array.isArray(actividades)) {
  throw new Error('El archivo de actividades debe contener un array JSON.');
}

const updates = {};
for (const actividad of actividades) {
  if (!actividad.id || !actividad.nombre) continue;
  updates[`edufisica/banco/actividades/${actividad.id}`] = {
    ...actividad,
    updatedAt: admin.database.ServerValue.TIMESTAMP,
  };
}

await db.ref().update(updates);
console.log(`Importadas ${Object.keys(updates).length} actividades en Firebase Realtime Database.`);
process.exit(0);
