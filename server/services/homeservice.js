const Orders = require('../models/orders.js');

class HomeDatabase
{
    async getHomeData()
    {
      return await Orders.find({user_id : Number(process.env.ACTIVE_USER_ID)});
    }

    async SaveData(data)
    {
      const session = await Orders.startSession();
      session.startTransaction();
      try
      {
        const opts = { session };
        await Orders.deleteMany({ user_id:data.table_data[0].user_id });
        //console.log(data.table_data);
        await Orders.insertMany(data.table_data);
        //await session.commitTransaction();s
        //session.endSession();
        return true;
      }
      catch (error)
      {
        // If an error occurred, abort the whole transaction and
        // undo any changes that might have happened
        await session.abortTransaction();
        session.endSession();
        throw error; 
      }
      
    }

}
module.exports = new HomeDatabase();