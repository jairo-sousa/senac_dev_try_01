const getAll = `
    SELECT * FROM sector;
`;

const getById = `
    SELECT * FROM sector WHERE id = ?;
`;

const post = `
    INSERT INTO sector (name, capacity)
    VALUES (?, ?)
  `;

const update = `
    UPDATE sector
    SET
        name = ?,
        capacity = ?
    WHERE id = ?;
`;

const remove = `
    DELETE FROM sector WHERE id = ?;
`;

module.exports = {
    getAll,
    getById,
    post,
    update,
    remove,
};
