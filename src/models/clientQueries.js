const DB_SECRET = process.env.DB_SECRET || "BD_SMH";

const decryptedClient = `
    id,
    CONVERT(AES_DECRYPT(email, '${DB_SECRET}') USING utf8) AS email,
    CONVERT(AES_DECRYPT(cpf, '${DB_SECRET}') USING utf8) AS cpf,
    name
`;

const getAll = `
    SELECT ${decryptedClient} FROM client;
`;

const getByEmail = `
    SELECT ${decryptedClient}
    FROM client 
    WHERE email = AES_ENCRYPT(?, '${DB_SECRET}');
`;

const getById = `
    SELECT ${decryptedClient}
    FROM client WHERE id = ?;
`;

const post = `
    INSERT INTO client (name, cpf, email)
    VALUES (?, AES_ENCRYPT(?, '${DB_SECRET}'), AES_ENCRYPT(?, '${DB_SECRET}'));
`;

const update = `
    UPDATE client
    SET
        name = ?,
        cpf = AES_ENCRYPT(?, '${DB_SECRET}'),
        email = AES_ENCRYPT(?, '${DB_SECRET}')
    WHERE id = ?;
`;

const remove = `
    DELETE FROM client WHERE id = ?;
`;

module.exports = {
    getAll,
    getByEmail,
    getById,
    post,
    update,
    remove,
};
