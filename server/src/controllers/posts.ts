import { Request, Response } from "express";
import Post from "../models/post";
import { body, validationResult } from "express-validator";

const DEFAULT_LIMIT = 10;

export async function getPosts(req: Request, res: Response, next) {
  try {
    if (!req.query.page && !req.query.limit) {
      const posts = await Post.find().sort({ postedAt: -1 }).exec();
      return res.json(posts);
    }

    let currentPage = parseInt(req.query.page as string);
    currentPage = currentPage > 0 ? currentPage : 1;
    let limit = parseInt(req.query.limit as string);
    limit = limit > 0 ? limit : DEFAULT_LIMIT;

    const skip = (currentPage - 1) * limit;
    const countDocs = await Post.countDocuments();
    const totalPages = Math.ceil(countDocs / limit);
    let posts: any[] = [];

    if (currentPage <= totalPages) {
      posts = await Post.find()
        .sort({ postedAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec();
    }

    res.json({ posts, currentPage, totalPages });
  } catch {
    next(Error("Cannot read posts"));
  }
}

export const addNewPost = [
  body("name")
    .optional({ values: "null" })
    .trim()
    .isLength({ min: 1, max: 40 })
    .withMessage("Name must be between 1 and 40 characters"),
  body("title")
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Title must be between 1 and 100 characters"),
  body("content")
    .trim()
    .isLength({ min: 1, max: 5000 })
    .withMessage("Content must be between 1 and 5000 characters"),
  async (req: Request, res: Response, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const post = await Post.create({
        name: req.body.name,
        title: req.body.title,
        content: req.body.content,
        postedAt: Date.now(),
      });

      res.json(post);
    } catch {
      next(Error("Cannot create the post"));
    }
  },
];
