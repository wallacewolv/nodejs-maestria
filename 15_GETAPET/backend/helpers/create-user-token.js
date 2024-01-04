const jwt = require('jsonwebtoken');

const createUserToken = async (user, req, res) => {
  // create a token
  const secretOrPrivateKey = "nossosecret"; // secret para deixar o token único, traser mais segurança

  const token = jwt.sign({
    name: user.name,
    id: user._id,
  }, secretOrPrivateKey);

  // return token
  res.status(200).json({
    message: "Você está autenticado",
    token: token,
    userId: user._id,
  });
};

module.exports = createUserToken;
