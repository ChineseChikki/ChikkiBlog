const router = require("express").Router();

const postController = require("../controller/postController");
const authMiddleWare = require("../middleWares/authorization");
const doesAUserExist = require("../middleWares/isUserExist");
const upload = require("../../utils/imgUploader");
const { json } = require("express");

//CONTROLLER PATHS
router.post(
  "/create",
  authMiddleWare,
  doesAUserExist,
  upload.single("image"),
  postController.createPost
);

router.put(
  "/update/:postId",
  authMiddleWare,
  doesAUserExist,
  upload.single("image"),
  postController.updatePostById
);

router.delete(
  "/delete/:postId",
  authMiddleWare,
  doesAUserExist,
  postController.deletePostById
);

router.get("/all", postController.getPosts);

router.get("/:postId", postController.getPost);

module.exports = router;
