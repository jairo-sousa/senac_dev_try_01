const userModel = require("../models/user");
const { hashPassword } = require("../modules/handlePassword");

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

  // TODO VALIDATE
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

  post = async (req, reply) => {
    const { name, cpf, email, password, profile_id } = req.body

    const hashedPassword = await hashPassword(password)

    const userSent = [
      name,
      cpf,
      email,
      hashedPassword,
      profile_id
    ]

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

  update = async (req, reply) => {
    const { id } = req.params;
    const { name, cpf, email, profile_id, password } = req.body;

    const userSent = [name, cpf, email, profile_id];

    try {
      if (password) {
        const hashedPassword = await hashPassword(password);
        userSent.push(hashedPassword);
        await userModel.updateWithPassword(userSent, id);
      } else {
        await userModel.update(userSent, id);
      }

      return reply.status(200).send("Usuário atualizado com sucesso");
    } catch (error) {
      console.error(error);
      return reply.status(500).send("Erro ao atualizar usuário");
    }
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
