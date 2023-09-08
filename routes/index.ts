import express, { Express, Request, Response } from 'express';
import Post from '../models/post';
import { collections, connectToDatabase } from '../services/database.service';
import { getPage } from '../helpers/util';
import { SortOrder, orderBy } from '../helpers/sort';
import { UUID } from 'crypto';

const routes = (app: Express) => {
  const router = express.Router();
  
    router.get("/posts", async(req, res) => {
      try {
        await connectToDatabase();
        let chain = (await collections.posts?.find({}).toArray()) as Post[];
        console.log(chain);
        let _page = req.query._page as string;
        let _limit = req.query._limit as string;
        let _sort = req.query._sort as string;
        let _order = req.query._order as string;
        let _start = req.query._start as string;
        let _end = req.query._end as string;

        if (_sort) {
          const _sortSet = _sort.split(' ');
          const _orderSet = (_order || '').split(',').map((s) => s.toLowerCase());
          chain = orderBy(chain, _sortSet, (_orderSet as SortOrder[]));
        }

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

  router.get("/post/:id", async (req: Request, res: Response) => {
    await connectToDatabase();
    const id = req.params.id as UUID;
    let post = (await 
                  collections.
                  posts?.
                  findOne({ postId: id })) as Post;
    if (post === null)
      res.status(404).send("No such post");
    else 
      res.status(200).send(post);
  });

  app.use("/api", router);
};

export default routes;
