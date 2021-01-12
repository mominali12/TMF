const Orders = require('../models/orders.js');
const Columns = require ('../models/columns.js');

class HomeDatabase
{
    async getHomeData()
    {
      return await Orders.find({user_id : Number(process.env.ACTIVE_USER_ID), completed:{$ne : "Completed"}});
    }

    async getCompletedHomeData()
    {
      return await Orders.find({user_id : Number(process.env.ACTIVE_USER_ID), completed:"Completed"});
    }

    async getColumnTypes()
    {
      return await Columns.find({user_id : Number(process.env.ACTIVE_USER_ID),order_type:'I'});
    }

    async getCompletedColumnTypes()
    {
      return await Columns.find({user_id : Number(process.env.ACTIVE_USER_ID),order_type:'C'});
    }

    async SaveCompletedData(data)
    {
      const session = await Orders.startSession();
      session.startTransaction();
      try
      {
        const opts = { session };
        await Orders.deleteMany({ user_id:data.table_data[0].user_id, completed : 'Completed' });
        await Columns.deleteMany({user_id:data.table_data[0],order_type : 'C'},()=>{});
        // console.log(data.table_data);
        // console.log(data.data_types);
        await Orders.insertMany(data.table_data);
        let count = 0;
        for(let k in data.data_types)
        {
          await Columns.create({'sr_no':count,'column_name':k,'column_type':data.data_types[k],'order_type':'C','user_id':data.table_data[0].user_id});
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

    async SaveData(data)
    {
      const session = await Orders.startSession();
      session.startTransaction();
      try
      {
        const opts = { session };
        await Orders.deleteMany({ user_id:data.table_data[0].user_id, completed :{ $ne: 'Completed' }});
        await Columns.deleteMany({user_id:data.table_data[0],order_type : 'I'},()=>{});
        // console.log(data.table_data);
        // console.log(data.data_types);
        await Orders.insertMany(data.table_data);
        let count = 0;
        for(let k in data.data_types)
        {
          await Columns.create({'sr_no':count,'column_name':k,'column_type':data.data_types[k],'order_type':'I','user_id':data.table_data[0].user_id});
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