const pool = require("../loader");
const promisePool = pool.promise();

const objectToQuerySet = (obj) => {
  return Object.entries(obj)
    .reduce((set, [key, value]) => {
      if (value) set.push(`${key} = "${value}"`);
      return set;
    }, [])
    .join(",");
};

module.exports = {
  createCard(data) {
    const { title, content, author, board } = data;

    if (!(title && content && author && board)) {
      throw Error("Invalid Card Data");
    }

    const querySet = objectToQuerySet(data);

    return promisePool.execute(`
      INSERT INTO
        card
      SET ${querySet}
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

    const querySet = objectToQuerySet(data);

    return promisePool.execute(`
      UPDATE
        card
      SET ${querySet}
      WHERE
        id = ${id}
    `);
  },
};
