import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import Post from "../models/post";
import { UUID } from "crypto";

export const collections: { posts?: mongoDB.Collection<Post | {postId: UUID}> } = {}

export async function connectToDatabase() {
  dotenv.config({ path: '../.env' });

  const client: mongoDB.MongoClient =
    new mongoDB.MongoClient(process.env.DB_CONN_STRING ?? "");
  await client.connect();

  const db: mongoDB.Db = client.db(process.env.DB_NAME ?? "");

  const postsCollection: mongoDB.Collection<Post | {postId: UUID}> = 
    db.collection<Post | {postId: UUID}>(process.env.POSTS_COLLECTION_NAME ?? "");

  collections.posts = postsCollection;

  console.log(`Successfully connected to database: ${db.databaseName} and collection: ${postsCollection.collectionName}`);
}
