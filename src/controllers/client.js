const clientModel = require("../models/client");
const { hashPassword } = require("../modules/handlePassword");

class ClientController {
  // CLIENT
  getById = (id) => {
    return clientModel
      .getById(id)
      .then((client) => {
        return client[0];
      })
      .catch((error) => {
        throw new Error("Erro ao buscar cliente: ", error);
      });
  };

  getByEmail = (email) => {
    return clientModel
      .getByEmail(email)
      .then((client) => {
        return client[0];
      })
      .catch((error) => {
        throw new Error("Erro ao buscar cliente: ", error);
      });
  };

  // CRUD
  getAll = (req, reply) => {
    const response = clientModel.getAll();

    response
      .then((client) => {
        return reply.status(200).send(client);
      })
      .catch((error) => {
        console.error(error);
        return reply.status(500).send("Erro ao buscar cliente");
      });
  };

  post = async (req, reply) => {
    const { name, cpf, email } = req.body

    const clientSent = [
      name,
      cpf,
      email,
    ]

    clientModel
      .post(clientSent)
      .then(() => {
        return reply.status(201).send("Cliente criado com sucesso");
      })
      .catch((error) => {
        console.error(error);
        return reply.status(500).send("Erro ao criar cliente");
      });
  };

  update = async (req, reply) => {
    const { id } = req.params;
    const { name, cpf, email } = req.body;

    const clientSent = [name, cpf, email];

    try {
      await clientModel.update(clientSent, id);

      return reply.status(200).send("Cliente atualizado com sucesso");
    } catch (error) {
      console.error(error);
      return reply.status(500).send("Erro ao atualizar cliente");
    }
  };


  delete = (req, reply) => {
    const { id } = req.params;

    clientModel
      .delete(id)
      .then(() => {
        return reply.status(200).send("Cliente deletado com sucesso");
      })
      .catch((error) => {
        console.error(error);
        return reply.status(500).send("Erro ao deletar cliente");
      });
  };
}

module.exports = new ClientController();
