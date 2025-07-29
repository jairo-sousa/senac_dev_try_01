const userModel = require("../models/user");

class UserController {
  // USER
  getById = (id) => {
    return userModel
      .getById(id)
      .then((users) => {
        return users[0];
      })
      .catch((error) => {
        throw new Error("Erro ao buscar usuário: ", error);
      });
  };

  getByEmail = (email) => {
    return userModel
      .getByEmail(email)
      .then((users) => {
        return users[0];
      })
      .catch((error) => {
        throw new Error("Erro ao buscar usuário: ", error);
      });
  };

  // TODO, VALIDATE + ENCRYPT CPF, EMAIL, PASSWORD

  // CRUD
  getAll = (req, reply) => {
    const response = userModel.getAll();

    response
      .then((users) => {
        return reply.status(200).send(users);
      })
      .catch((error) => {
        console.error(error);
        return reply.status(500).send("Erro ao buscar usuários");
      });
  };

  post = (req, reply) => {
    const userSent = req.body;

    userModel
      .post(userSent)
      .then(() => {
        return reply.status(201).send("Usuário criado com sucesso");
      })
      .catch((error) => {
        console.error(error);
        return reply.status(500).send("Erro ao criar usuário");
      });
  };

  update = (req, reply) => {
    const userSent = req.body;
    const { id } = req.params;

    userModel
      .update(userSent, id)
      .then(() => {
        return reply.status(200).send("Usuário atualizado com sucesso");
      })
      .catch((error) => {
        console.error(error);
        return reply.status(500).send("Erro ao atualizar usuário");
      });
  };

  delete = (req, reply) => {
    const { id } = req.params;

    userModel
      .delete(id)
      .then(() => {
        return reply.status(200).send("Usuário deletado com sucesso");
      })
      .catch((error) => {
        console.error(error);
        return reply.status(500).send("Erro ao deletar usuário");
      });
  };
}

module.exports = new UserController();
