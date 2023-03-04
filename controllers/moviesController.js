const pool = require("../config");

const defaultLimit = 10;
const defaultPage = 1;

const getMovies = (req, res, next) => {
  const { limit, page } = req.query;

  let resultLimit = limit ? +limit : defaultLimit;
  let resultPage = page ? +page : defaultPage;

  pool.query(
    `SELECT movies.* FROM movies 
        ORDER BY id DESC
        LIMIT ${resultLimit} OFFSET ${(resultPage - 1) * resultLimit};`,
    (err, result) => {
      if (err) next(err);

      res.status(200).json(result.rows);
    }
  );
};

const getMovieById = (req, res, next) => {
  const { id } = req.params;

  pool.query(
    `SELECT movies.* FROM movies 
        WHERE id=$1;`,
    [id],
    (err, result) => {
      if (err) next(err);

      res.status(200).json(result.rows[0]);
    }
  );
};

const createMovie = (req, res, next) => {
  const { id, title, genres, year } = req.body;

  pool.query(
    `INSERT INTO movies(id, title, genres, year) 
        VALUES($1, $2, $3, $4);`,
    [+id, title, genres, year],
    (err, result) => {
      if (err) next(err);

      res.status(201).json({ messages: "Successfully created new movie" });
    }
  );
};

const updateMovie = (req, res, next) => {
  const { id } = req.params;
  const { title, genres, year } = req.body;

  pool.query(
    `UPDATE movies 
        SET title = $1, genres = $2, year = $3 
        WHERE id = $4;`,
    [title, genres, year, id],
    (err, result) => {
      if (err) next(err);

      res.status(200).json({ message: `Movie widh id: ${id} updated` });
    }
  );
};

const deleteMovie = (req, res, next) => {
  const { id } = req.params;

  pool.query(
    `DELETE FROM movies 
        WHERE id=$1;`,
    [id],
    (err, result) => {
      if (err) next(err);

      res.status(200).json({ message: `Success deleted movie with id ${id}` });
    }
  );
};

module.exports = {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
};
