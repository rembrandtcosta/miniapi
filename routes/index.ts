import express, { Express, Request, Response } from 'express';
import Post from '../models/post';
import { collections } from '../services/database.service';
import { getPage } from '../helpers/util';

const routes = (app: Express) => {
  const router = express.Router();
  
  router.get("/posts", async(req, res) => {
    let chain = (await collections.posts?.find({}).toArray()) as Post[];
    let _page = req.query._page as string;
    let _limit = req.query._limit as string;
    let _start = req.query._start as string;
    let _end = req.query._end as string;

    try {
      if (_page) {
        let page: number = parseInt(_page, 10);
        page = page >= 1 ? page : 1;
        const limit: number = parseInt(_limit, 10) || 10;
        chain = getPage(chain, page, limit);
      } else if (_end) {
        const start: number = parseInt(_start, 10) || 0;
        const end: number = parseInt(_end, 10);
        chain = chain.slice(start, end);
      } else if (_limit) {
        const start: number = parseInt(_start, 10) || 0;
        const limit: number = parseInt(_limit, 10);
        chain = chain.slice(start, start + limit);
      }

      res.status(200).send(chain);
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  });

  router.get("/post/:id", (req: Request, res: Response) => {
    res.send("Hello " + req.params.id);
  });

  app.use("/api", router);
};

export default routes;
