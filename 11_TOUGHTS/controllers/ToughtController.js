const Tought = require('../models/Tought');
const User = require('../models/User');

module.exports = class ToughtController {
  static createTought(req, res) {
    res.render('toughts/create');
  }

  static async dashboard(req, res) {
    res.render('toughts/dashboard');
  }

  static async showToughts(req, res) {
    res.render('toughts/home');
  }
}
