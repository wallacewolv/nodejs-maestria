const Tought = require('../models/Tought');
const User = require('../models/User');

module.exports = class ToughtController {
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

    res.render('toughts/dashboard', { toughts });
  }

  static async showToughts(req, res) {
    res.render('toughts/home');
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

      req.flash('message', 'Pensamento excluído com sucesso!');

      req.session.save(() => {
        res.redirect('/toughts/dashboard');
      })
    } catch (error) {
      console.log(`Não foi possível excluir o pensamento: ${error}`);
    }
  }
}
