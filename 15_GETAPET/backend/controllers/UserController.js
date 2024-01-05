const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

// helpers
const createUserToken = require('../helpers/create-user-token');
const getToken = require('../helpers/get-token');

module.exports = class UserController {
  static async register(req, res) {
    const { name, email, phone, password, confirmpassword } = req.body;

    // validations
    if (!name) {
      res.status(422).json({ message: 'O nome é obrigatório' });
      return;
    }

    if (!email) {
      res.status(422).json({ message: 'O e-mail é obrigatório' });
      return;
    }

    if (!phone) {
      res.status(422).json({ message: 'O telefone é obrigatório' });
      return;
    }

    if (!password) {
      res.status(422).json({ message: 'A senha é obrigatória' });
      return;
    }

    if (!confirmpassword) {
      res.status(422).json({ message: 'A confirmação da senha é obrigatória' });
      return;
    }

    if (password !== confirmpassword) {
      res.status(422).json({ message: 'A senha e a confirmação de senha precisam ser iguais!' });
      return;
    }

    // check if user exists 
    const userExists = await User.findOne({ email: email });

    if (userExists) {
      res.status(422).json({ message: 'Por favor, utilize outro e-mail!' });
      return;
    }

    // check email is valid
    const check = /\S+@\S+\.\S+/;
    const emailInvalid = !check.test(email);

    if (emailInvalid) {
      res.status(422).json({ message: 'Por favor, insira um e-mail válido!' });
      return;
    }

    // create a password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // create a user
    const user = new User({
      name,
      email,
      phone,
      password: passwordHash,
    });


    try {
      const newUser = await user.save();
      await createUserToken(newUser, req, res);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };

  static async login(req, res) {
    const { email, password } = req.body;

    if (!email) {
      res.status(422).json({ message: 'O e-mail é obrigatório' });
      return;
    }

    if (!password) {
      res.status(422).json({ message: 'A senha é obrigatória' });
      return;
    }

    // check if user exists 
    const user = await User.findOne({ email: email });

    if (!user) {
      res.status(422).json({ message: 'Não há usuário cadastrado com esse e-mail!' });
      return;
    }

    // check email is valid
    const check = /\S+@\S+\.\S+/;
    const emailInvalid = !check.test(email);

    if (emailInvalid) {
      res.status(422).json({ message: 'Por favor, insira um e-mail válido!' });
      return;
    }

    // check if password with db password 
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      res.status(422).json({ message: 'Senha inválida' });
      return;
    }

    await createUserToken(user, req, res);
  };

  static async checkUser(req, res) {
    let currentUser;

    if (req.headers.authorization) {
      const token = getToken(req);
      const decoded = jwt.verify(token, 'nossosecret');

      currentUser = await User.findById(decoded.id);

      currentUser.password = undefined;
    } else {
      currentUser = null;
    }

    res.status(200).send(currentUser);
  };

  static async getById(req, res) {
    const id = req.params.id;

    const user = await User.findById(id).select("-password");

    if (!user) {
      res.status(422).json({
        message: 'Usuário não encontrado',
      });
      return;
    }

    res.status(200).send({ user });
  };

  static async editUser(req, res) {
    res.status(200).json({
      message: 'Deu certo o update!',
    });
    return;
  };
}
