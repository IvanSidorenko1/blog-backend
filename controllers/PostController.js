import PostModel from "../models/Post.js";

export const getLastTags = async (req, res) => {
  try {
    const posts = await PostModel.find().limit(5).exec();

    const tags = posts
      .map((obj) => obj.tags)
      .flat()
      .slice(0, 5);
    res.json(tags);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      massege: "dont get tags",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("user").exec();

    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      massege: "dont get posts",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    // отримуємо ід з параметру запросу
    const postId = req.params.id;
    // для того щоб реалізувати каунтер просмотрів теба
    // необхідно знайти одну статтю і оновити
    const post = await PostModel.findOneAndUpdate(
      {
        // знаходимо по параметру ід
        _id: postId,
      },
      {
        // інсрементуємо каунтер з допомогою вбудованої фуркціі
        $inc: { viewsCount: 1 },
      },
      {
        // повертаємо оновленний документ(статтю)
        returnDocument: "after",
      }
    ).populate("user");

    if (!post) {
      console.log(err);
      return res.status(500).json({
        massege: "dont get posts",
      });
    }

    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      massege: "dont get postss",
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags.split(","),
      user: req.userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      massege: "dont create post",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;

    const delpost = await PostModel.findOneAndDelete(
      {
        _id: postId,
      }
      // (err, doc) => {
      //   if (err) {
      //     console.log(err);
      //     return res.status(500).json({
      //       massege: "dont delete post",
      //     });
      //   }
      //   if (!doc) {
      //     console.log(err);
      //     return res.status(500).json({
      //       massege: "dont delete posts",
      //     });
      //   }
      //   res.json({
      //     success: true,
      //   });
      // }
    );

    if (!delpost) {
      console.log(err);
      return res.status(500).json({
        massege: "dont get posts",
      });
    }
    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      massege: "dont find post",
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    const updatePost = await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags.split(","),
        user: req.userId,
      }
    );
    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      massege: "dont update post",
    });
  }
};

// export const getOne = async (req, res) => {
//   try {
//     const postId = req.params.id;

//     const post = await PostModel.findById(postId);

//     res.json(post);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       massege: "dont get postss",
//     });
//   }
// };
