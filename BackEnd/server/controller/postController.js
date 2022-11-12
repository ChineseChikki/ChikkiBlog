const postModel = require("../model/blogPost");

//FNX THAT ALLOWS A USER TO BE ABLE TO CREATE A POST
exports.createPost = async function (req, res) {
  const newBlog = req.body,
    user = res.locals.id;
  // const newBlog = {
  //     title: req.body.title,
  //     post: req.body.post,
  //   },
  // user = res.locals.id;

  // attaches the id of the user to the new blog
  newBlog.user = user;

  newBlog.image = req.protocol + "://" + req.hostname + "/" + req.file.filename;
  try {
    const post = await postModel.create(newBlog);

    if (post) {
      return res.status(201).json({
        success: true,
        message: "Post created successfully",
        data: post,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Failed to create post",
      });
    }
  } catch (error) {
    console.log(error);

    res.status(403).json({
      success: false,
      message: "Forbidden",
    });
  }
};

//FNX TO UPDATE OUR BLOG POST
exports.updatePostById = async (req, res) => {
  const id = req.params.postId;
  const postToUpdate = req.body;

  if (req.file) {
    postToUpdate.image =
      req.protocol + "://" + req.hostname + "/" + req.file.filename;
  }

  try {
    // find the post
    const foundPost = await postModel.findById(id);
    if (foundPost) {
      const updatedPost = await postModel.findByIdAndUpdate(
        id,
        { $set: postToUpdate },
        { new: true }
      );
      if (updatedPost)
        res.status(200).json({
          success: true,
          message: "Post updated successfully",
          data: updatedPost,
        });
      else
        res
          .status(500)
          .json({ success: false, message: "Failed to update post" });
    } else {
      // respond to the client
      res.status(404).json({ success: false, message: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update post" });
  }
};

//FNX TO GET ALL BLOG POST POSTED ON OUR SITES
exports.getPost = async function (req, res) {
  const id = req.params.postId;

  try {
    const post = await postModel.findById(id).populate("user", "-password");

    if (post) {
      res.json({
        success: true,
        message: `post retrieved successfully`,
        data: post,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve post",
    });
  }
};

//THIS FNX GETS A SINGLE POST BY IT'S ID
exports.getPosts = async function (req, res) {
  try {
    const posts = await postModel
      .find({})
      .sort({ updatedAt: -1 })
      .populate("user", "-password");
    if (posts) {
      res.status(200).json({
        success: true,
        message: `Posts retrieved successfully`,
        data: posts,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve posts",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve posts",
      error,
    });
  }
};

//FNX DELETES A POST FROM OUR DATABASE
exports.deletePostById = async (req, res) => {
  // gets the post id from req.params
  const id = req.params.postId;
  try {
    // find and delete the post
    const deletePost = await postModel.findByIdAndDelete(id);
    // if deleted
    if (deletePost) {
      // responds to client
      res
        .status(200)
        .json({ success: true, message: "Post deleted successfully" });
    } else {
      // respond to the client
      res
        .status(404)
        .json({ success: false, message: "Post not found", data: deleteUser });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete post" });
  }
};
