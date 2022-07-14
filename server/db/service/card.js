const pool = require("../loader");
const promisePool = pool.promise();

module.exports = {
  createCard(data) {
    const { title, content, author, ordered, board } = data;

    if (!(title && content && author && ordered && board)) {
      throw Error("Invalid Card Data");
    }

    return promisePool.execute(`
      INSERT INTO
        card
      SET
        title = "${title}",
        content = "${content}",
        author = "${author}",
        ordered = ${ordered},
        board = ${board};
    `);
  },
  deleteCard(id) {
    id = parseInt(id);
    if (!id || typeof id !== "number") {
      throw Error("Invalid ID");
    }

    return promisePool.execute(`
      DELETE FROM card
      WHERE id = ${id};
    `);
  },
  updateCard(id, data) {
    id = parseInt(id);
    const { title, content } = data;

    if (!id || typeof id !== "number") {
      throw Error("Invalid ID");
    }
    if (!(title || content)) {
      throw Error("Invalid Title & Content");
    }

    const querySet = Object.entries(data)
      .reduce((set, [key, value]) => {
        if (value) set.push(`${key} = "${value}"`);
        return set;
      }, [])
      .join(",");

    return promisePool.execute(`
      UPDATE
        card
      SET ${querySet}
      WHERE
        id = ${id}
    `);
  },
};
