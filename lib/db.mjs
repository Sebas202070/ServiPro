import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function dbConnect() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    return client; // Retorna el cliente conectado
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    await client.close(); // Cierra el cliente en caso de error
    throw error; // Lanza el error para que se maneje en el lugar donde se llama dbConnect
  }
}

export default dbConnect;