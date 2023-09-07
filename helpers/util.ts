import { randomUUID } from "crypto";
import Post from "../models/post";
import { collections, connectToDatabase } from "../services/database.service";
import { loremIpsum } from "lorem-ipsum";

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
    "title": generateRandomTitle(),
    "content": generateRandomContent(),
    "author": generateRandomAuthorName(),
    "published": new Date(Date.now()),
    "coverImage": `https://loremflickr.com/1280/720?lock=${generateRandomNumber(2000)}`,
    "tags": generateRandomTags(generateRandomNumber(7)),
  };

  return post;
}

function generateRandomTitle(): string {
  return loremIpsum({
    sentenceUpperBound: 10,
  }).split(' ').map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join(' ');
}

function generateRandomContent(): string {
  return loremIpsum({
    count: generateRandomNumber(6),
    units: "paragraph"
  });
}

function generateRandomAuthorName(): string {
  return loremIpsum({
    count: 2,
    units: "word",
  }).split(' ').map((name) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
  }).join(' ');
}

function generateRandomNumber(upTo: number): number {
  return Math.floor(Math.random() * (upTo - 1)) + 1;
}

function generateRandomTags(n: number): string[] {
  let words: string[] = []; 
  while (words.length !== n) {
    words = [...new Set(loremIpsum({count: n, units:"word"}).split(' '))];
  }
  return words;
}

export function getPage(array: Post[], page: number, perPage: number): Post[] {
  const start = (page - 1) * perPage;
  const end = page * perPage;

  const arr = array.slice(start, end)
  return arr;
}
