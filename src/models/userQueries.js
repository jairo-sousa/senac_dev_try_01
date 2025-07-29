const DB_SECRET = process.env.DB_SECRET || "BD_SMH";

const decryptedUser = `
    id,
    CONVERT(AES_DECRYPT(email, '${DB_SECRET}') USING utf8) AS email,
    CONVERT(AES_DECRYPT(cpf, '${DB_SECRET}') USING utf8) AS cpf,
    name
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
    INSERT INTO user SET ?;
`;

const update = `
    UPDATE user SET ? WHERE id = ?;
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
  remove,
};
