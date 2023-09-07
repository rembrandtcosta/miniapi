import { randomUUID } from "crypto";
import Post from "../models/post";
import { collections, connectToDatabase } from "../services/database.service";

export async function setUpDb(n: number) {
  for (let i = 0; i < n; i++) {
    await insertPost()
  }
}

export async function insertPost() {
  await connectToDatabase();
  const post: Post = generateRandomPost();
  const result = await collections.posts?.insertOne(post);
  return result;
}

function generateRandomPost(): Post {
  const post: Post = {
    "postId": randomUUID(),
    "title": "test",
    "content": "test test",
    "author": "tester",
    "published": new Date(Date.now()),
    "coverImage": "https://loremflickr.com/320/240?lock=212",
    "tags": ["test"],
  };

  return post;
}

export function getPage(array: Post[], page: number, perPage: number): Post[] {
  const start = (page - 1) * perPage;
  const end = page * perPage;

  const arr = array.slice(start, end)
  return arr;
}
