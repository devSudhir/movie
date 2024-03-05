import express from "express";
import movieModel from "../models/movies.mjs";
import movieJsonData from "../config/movies.json" assert { type: "json" };
const router = express.Router();

const genreOptions = [
  "Action",
  "Romance",
  "Drama",
  "Crime",
  "Adventure",
  "Thriller",
  "Sci-fi",
  "Music",
  "Family",
  "Fantacy",
];

router.get("/movies", async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";
    const sort = req.query.sort ? req.query.sort.split(",") : ["rating"];
    const genre = req.query.genre
      ? req.query.genre.split(",")
      : [...genreOptions];
    const sortBy = {};
    sort.length == 1 ? (sortBy[sort[0]] = "asc") : (sortBy[sort[0]] = sort[1]);
    const movies = await movieModel
      .find({ name: { $regex: search, $options: "i" } })
      .where("genre")
      .in([...genre])
      .sort(sortBy)
      .skip(page * limit)
      .limit(limit);

    const totalMovies = await movieModel.countDocuments({
      genre: { $in: [...genre] },
      name: { $regex: search, $options: "i" },
    });

    const response = {
      error: false,
      total: totalMovies,
      page: page + 1,
      limit,
      genres: genreOptions,
      movies,
    };
    res.status(200).json(response);
  } catch (error) {
    console.log("Error created", error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

// const insertMovies = async function () {
//   try {
//     const docs = await movieModel.insertMany(movieJsonData);
//     return Promise.resolve(docs);
//   } catch (error) {
//     return Promise.reject(error);
//   }
// };

// insertMovies()
//   .then((result) => console.log("Inserted movie details", result))
//   .catch((err) => console.log(error));

export default router;
