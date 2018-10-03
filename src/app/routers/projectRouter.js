const express = require("express");
const authMiddleware = require("../middlewares/auth");
const projectController = require("../controllers/projectController");

const router = express.Router();

router.use(authMiddleware);

router.get("/list", projectController.list);

router.get("/listById", projectController.listById);

router.post("/create", projectController.create);

router.put("/update", projectController.update);

router.delete("/update", projectController.delete);

module.exports = router;
