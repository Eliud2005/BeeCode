// pages/api/reseñas.ts
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../../lib/mongodb";

type Reseña = {
  nombre: string;
  mensaje: string;
  estrellas: number;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db("BeeCode"); // Nombre de tu base de datos
  const collection = db.collection<Reseña>("reseñas"); // Nombre de la colección

  if (req.method === "GET") {
    const reseñas = await collection.find({}).toArray();
    res.status(200).json(reseñas);
  } else if (req.method === "POST") {
    const { nombre, mensaje, estrellas } = req.body;
    if (!nombre || !mensaje || typeof estrellas !== "number") {
      return res.status(400).json({ error: "Faltan datos o son inválidos" });
    }
    const nuevaReseña = { nombre, mensaje, estrellas };
    await collection.insertOne(nuevaReseña);
    res.status(201).json(nuevaReseña);
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
}
