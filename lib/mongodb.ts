// lib/mongodb.ts
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb+srv://Eliud:<db_password>@eliud.xmhdq.mongodb.net/?retryWrites=true&w=majority";
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  console.warn("⚠️ No se encontró MONGODB_URI, usando string de conexión directo (no recomendado en producción).");
}

if (process.env.NODE_ENV === "development") {
  // En desarrollo, reutilizamos el cliente para evitar múltiples conexiones
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri, options);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  // En producción, creamos un cliente nuevo
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
