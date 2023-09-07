import { UUID } from "crypto";
import { ObjectId } from "mongodb";

export interface IPost {
  "postId": UUID,
  "title": string,
  "content": string,
  "author": string,
  "published": Date,
  "coverImage": string,
  "tags": string[],
}

export default class Post implements IPost {
  constructor(
    public postId: UUID,
    public title: string,
    public content: string,
    public author: string,
    public published: Date,
    public coverImage: string,
    public tags: string[],
    public id?: ObjectId,
  ) {}
}


