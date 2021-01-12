const Orders = require('../models/orders.js');
const Columns = require ('../models/columns.js');

class HomeDatabase
{
    async getHomeData()
    {
      return await Orders.find({user_id : Number(process.env.ACTIVE_USER_ID), completed:"In Progress"});
    }

    async getCompletedData()
    {
      return await Orders.find({user_id : Number(process.env.ACTIVE_USER_ID), completed:"Completed"});
    }

    async getColumnTypes()
    {
      return await Columns.find({});
    }

    async SaveData(data)
    {
      const session = await Orders.startSession();
      session.startTransaction();
      try
      {
        const opts = { session };
        await Orders.deleteMany({ user_id:data.table_data[0].user_id });
        await Columns.deleteMany({},()=>{});
        // console.log(data.table_data);
        // console.log(data.data_types);
        await Orders.insertMany(data.table_data);
        let count = 0;
        for(let k in data.data_types)
        {
          await Columns.create({'sr_no':count,'column_name':k,'column_type':data.data_types[k]});
          count++;
        }
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