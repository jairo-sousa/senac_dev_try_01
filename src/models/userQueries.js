const DB_SECRET = process.env.DB_SECRET || "BD_SMH";

const decryptedUser = `
    id,
    CONVERT(AES_DECRYPT(email, '${DB_SECRET}') USING utf8) AS email,
    CONVERT(AES_DECRYPT(cpf, '${DB_SECRET}') USING utf8) AS cpf,
    name,
    password,
    profile_id
`;

const getAll = `
    SELECT ${decryptedUser} FROM user;
`;

const getByEmail = `
    SELECT ${decryptedUser}
    FROM user 
    WHERE email = AES_ENCRYPT(?, '${DB_SECRET}');
`;

const getById = `
    SELECT ${decryptedUser}
    FROM user WHERE id = ?;
`;

const post = `
    INSERT INTO user (name, cpf, email, password, profile_id)
    VALUES (?, AES_ENCRYPT(?, '${DB_SECRET}'), AES_ENCRYPT(?, '${DB_SECRET}'), ?, ?);
`;

const update = `
    UPDATE user
    SET
        name = ?,
        cpf = AES_ENCRYPT(?, '${DB_SECRET}'),
        email = AES_ENCRYPT(?, '${DB_SECRET}'),
        profile_id = ?
    WHERE id = ?;
`;

const updateWithPassword = `
    UPDATE user
    SET
        name = ?,
        cpf = AES_ENCRYPT(?, '${DB_SECRET}'),
        email = AES_ENCRYPT(?, '${DB_SECRET}'),
        profile_id = ?,
        password = ?
    WHERE id = ?;
`;

const remove = `
    DELETE FROM user WHERE id = ?;
`;

module.exports = {
    getAll,
    getByEmail,
    getById,
    post,
    update,
    updateWithPassword,
    remove,
};
