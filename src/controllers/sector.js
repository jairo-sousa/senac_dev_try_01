const sectorModel = require("../models/sector");

class SectorController {
  // SECTOR
  getById = (id) => {
    return sectorModel
      .getById(id)
      .then((sector) => {
        return sector[0];
      })
      .catch((error) => {
        throw new Error("Erro ao buscar setor: ", error);
      });
  };

  // CRUD
  getAll = (req, reply) => {
    const response = sectorModel.getAll();

    response
      .then((sector) => {
        return reply.status(200).send(sector);
      })
      .catch((error) => {
        console.error(error);
        return reply.status(500).send("Erro ao buscar setores");
      });
  };

  post = async (req, reply) => {
    const { name, capacity } = req.body

    const sectorSent = [
      name,
      capacity,
    ]

    sectorModel
      .post(sectorSent)
      .then(() => {
        return reply.status(201).send("Setor criado com sucesso");
      })
      .catch((error) => {
        console.error(error);
        return reply.status(500).send("Erro ao criar setor");
      });
  };

  update = async (req, reply) => {
    const { id } = req.params;
    const { name, capacity } = req.body

    const sectorSent = [
      name,
      capacity
    ]

    try {
      await sectorModel.update(sectorSent, id);

      return reply.status(200).send("Setor atualizado com sucesso");
    } catch (error) {
      console.error(error);
      return reply.status(500).send("Erro ao atualizar setor");
    }
  };

  delete = (req, reply) => {
    const { id } = req.params;

    sectorModel
      .delete(id)
      .then(() => {
        return reply.status(200).send("Setor deletado com sucesso");
      })
      .catch((error) => {
        console.error(error);
        return reply.status(500).send("Erro ao deletar setor");
      });
  };
}

module.exports = new SectorController();
