import express from "express"
import { protect } from "../middlewares/auth.js";
import { createProject, getUserCredits, getUserProject, getUserProjects, purchaseCredits, togglePublishProject } from "../controllers/userController.js";
const userRouter = express.Router();


userRouter.get("/credits", protect, getUserCredits);
userRouter.post("/project", protect, createProject);
userRouter.get("/project/:projectId", protect, getUserProject);
userRouter.get("/projects", protect, getUserProjects);
userRouter.get("/publish-toggle/:projectId", protect, togglePublishProject);
userRouter.post("/purchase-credits", protect, purchaseCredits);

export default userRouter;