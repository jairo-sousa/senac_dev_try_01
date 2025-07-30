const { runQuery } = require("../database/dbHelper");
const ticketQueries = require('./ticketQueries')

class TicketModel {
    getAll = () => runQuery(ticketQueries.getTickets)
}