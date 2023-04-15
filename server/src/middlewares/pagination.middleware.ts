import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

interface ReqPagination extends Request {
  pagination: {
    limit: number;
    offset: number;
    page: number;
  }
}

@Injectable()
export class PaginationMiddleware implements NestMiddleware {
  use(req: ReqPagination, res: Response, next: NextFunction) {
    const { limit, page } = req.query;

    req.pagination = {
      limit: limit ? +limit : 10,
      offset: +page * +limit,
      page: page ? +page - 1 : 0
    };

    next();
  }
}