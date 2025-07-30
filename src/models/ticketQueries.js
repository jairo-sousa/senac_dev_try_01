const getTickets = `
    SELECT * FROM ticket;
`;

const getByCode = `
    SELECT * FROM ticket WHERE code = ?
`;

const getById = `
    SELECT * FROM ticket WHERE id = ?;
`;

const postTiket = `
    INSERT INTO ticket SET ?;
`;

const updateTicket = `
    UPDATE ticket SET ? WHERE id = ?;
`;

const removeTicket = `
    DELETE FROM ticket WHERE id = ?;
`;

module.exports = {
    getTickets,
    getByCode,
    getById,
    postTiket,
    updateTicket,
    removeTicket
};
