import { Router } from "express";
import * as controller from "../controllers/posts";

const router = Router();

router.get("/", controller.getPosts);
router.post("/", controller.addNewPost);

export default router;
