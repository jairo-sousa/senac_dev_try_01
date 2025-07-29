const bcrypt = require("bcrypt");
const saltRounds = 10;

const hashPassword = async (password) => {
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (error) {
    console.error("Erro ao gerar hash:", error);
    return null;
  }
};

const passwordMatch = async (enteredPassword, storedHash) => {
  try {
    const result = await bcrypt.compare(enteredPassword, storedHash);
    return result;
  } catch (error) {
    console.error("Erro ao comparar senhas:", error);
    return false;
  }
};

module.exports = {
  hashPassword,
  passwordMatch,
};
