const getAll = `
    SELECT * FROM event;
`;

const getById = `
    SELECT * FROM event WHERE id = ?;
`;

const post = `
    INSERT INTO event (name, date, capacity, created_at, user_id)
    VALUES (?, ?, ?, current_timestamp(), ?)
  `;

const update = `
    UPDATE event
    SET
        name = ?,
        date = ?,
        capacity = ?
    WHERE id = ?;
`;

const remove = `
    DELETE FROM event WHERE id = ?;
`;

module.exports = {
    getAll,
    getById,
    post,
    update,
    remove,
};
