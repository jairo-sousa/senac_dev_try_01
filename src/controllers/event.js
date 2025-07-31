const eventModel = require("../models/event");

class EventController {
  // EVENT
  getById = (id) => {
    return eventModel
      .getById(id)
      .then((events) => {
        return events[0];
      })
      .catch((error) => {
        throw new Error("Erro ao buscar evento: ", error);
      });
  };

  // CRUD
  getAll = (req, reply) => {
    const response = eventModel.getAll();

    response
      .then((events) => {
        return reply.status(200).send(events);
      })
      .catch((error) => {
        console.error(error);
        return reply.status(500).send("Erro ao buscar eventos");
      });
  };

  post = async (req, reply) => {
    const { name, date, capacity, user_id } = req.body

    const eventSent = [
      name,
      date,
      capacity,
      user_id
    ]

    eventModel
      .post(eventSent)
      .then(() => {
        return reply.status(201).send("Evento criado com sucesso");
      })
      .catch((error) => {
        console.error(error);
        return reply.status(500).send("Erro ao criar evento");
      });
  };

  update = async (req, reply) => {
    const { id } = req.params;
    const { name, date, capacity } = req.body

    const eventSent = [
      name,
      date,
      capacity
    ]

    try {
      await eventModel.update(eventSent, id);

      return reply.status(200).send("Evento atualizado com sucesso");
    } catch (error) {
      console.error(error);
      return reply.status(500).send("Erro ao atualizar evento");
    }
  };

  delete = (req, reply) => {
    const { id } = req.params;

    eventModel
      .delete(id)
      .then(() => {
        return reply.status(200).send("Evento deletado com sucesso");
      })
      .catch((error) => {
        console.error(error);
        return reply.status(500).send("Erro ao deletar evento");
      });
  };
}

module.exports = new EventController();
