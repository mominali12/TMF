const Orders = require('../models/orders.js');

class HomeDatabase
{
    async getHomeData()
    {
      return await Orders.find({user_ID : Number(process.env.ACTIVE_USER_ID)});
    }

}
module.exports = new HomeDatabase();