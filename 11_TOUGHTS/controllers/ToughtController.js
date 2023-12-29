const Tought = require('../models/Tought');
const User = require('../models/User');

module.exports = class ToughtController {
  static async showToughts(req, res) {
    const toughtsData = await Tought.findAll({
      include: User,
    });

    const toughts = toughtsData.map((result) => result.get({ plain: true }));

    console.log(toughts);
    res.render('toughts/home', { toughts });
  }

  static async dashboard(req, res) {
    const userId = req.session.userid;

    const user = await User.findOne({
      where: {
        id: userId,
      },
      include: Tought,
      plain: true,
    });

    // check if user exists
    if (!user) {
      req.flash('message', 'Usuário inexistente, faça login novamente!');

      res.redirect('/auth/login');
      return;
    }

    const toughts = user.Toughts.map((result) => result.dataValues);

    const emptyToughts = toughts.length === 0;

    res.render('toughts/dashboard', { toughts, emptyToughts });
  }

  static async createTought(req, res) {
    res.render('toughts/create');
  }

  static async createToughtSave(req, res) {
    // validation to know if the session user exists in the database
    const UserId = req.session.userid;

    const user = await User.findOne({ where: { id: UserId } });

    if (!user) {
      req.flash('message', 'Usuário inexistente, faça login novamente!');

      res.redirect('/auth/login');
      return;
    }

    // creation of thought
    const tought = {
      title: req.body.title,
      UserId,
    }

    try {
      await Tought.create(tought);

      req.flash('message', 'Pensamento criado com sucesso!');

      req.session.save(() => {
        res.redirect('/toughts/dashboard');
      });
    } catch (error) {
      console.log(`Não foi possível criar o pensamento: ${error}`);
    }
  }

  static async removeTought(req, res) {
    const id = req.body.id;
    const UserId = req.session.userid;

    try {
      await Tought.destroy({ where: { id: id, UserId: UserId } });

      req.flash('message', 'Pensamento removido com sucesso!');

      req.session.save(() => {
        res.redirect('/toughts/dashboard');
      });
    } catch (error) {
      console.log(`Não foi possível excluir o pensamento: ${error}`);
    }
  }

  static async updateTought(req, res) {
    const id = req.params.id;

    const tought = await Tought.findOne({ raw: true, where: { id: id } });

    res.render('toughts/edit', { tought });
  }

  static async updateToughtSave(req, res) {
    const id = req.body.id;

    const tought = {
      title: req.body.title,
    };

    try {
      await Tought.update(tought, { where: { id: id } });

      req.flash('message', 'Pensamento alterado com sucesso!');

      req.session.save(() => {
        res.redirect('/toughts/dashboard');
      });
    } catch (error) {
      console.log(`Não foi possível alterar o pensamento: ${error}`);
    }
  }
}
