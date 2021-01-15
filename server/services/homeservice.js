const Orders = require('../models/orders.js');
const Columns = require('../models/columns.js');

class HomeDatabase {
    async getHomeData() {
        return await Orders.find({ $and: [{ user_id: Number(process.env.ACTIVE_USER_ID) }, { completed: { $ne: "Completed" } }] });
    }

    async getCompletedHomeData() {
        return await Orders.find({ $and: [{ user_id: Number(process.env.ACTIVE_USER_ID) }, { completed: "Completed" }] });
    }

    async getColumnTypes() {
        return await Columns.find({ user_id: Number(process.env.ACTIVE_USER_ID), order_type: 'I' });
    }

    async getCompletedColumnTypes() {
        return await Columns.find({ user_id: Number(process.env.ACTIVE_USER_ID), order_type: 'C' });
    }

    async getGraphData1()
    {
      return await Orders.aggregate(
        [ 
            { "$match": { 'user_id':  Number(process.env.ACTIVE_USER_ID) }},
            { "$group":  { "_id": "$customer_name", "count": { "$sum": 1 } } },
            { '$replaceWith': { 'label': "$_id" , 'y' : '$count'} }
            
        ]);
    }

    async SaveCompletedData(data)
    {
        const session = await Orders.startSession();
        session.startTransaction();
        try {
            const opts = { session };
            await Orders.deleteMany({ user_id: process.env.ACTIVE_USER_ID });
            //console.log(data.table_data);
            //console.log(data.open_orders);
            //console.log(data.data_types);
            if(data.open_orders != undefined)
                await Orders.insertMany(data.open_orders,{strict : false});
            await Orders.insertMany(data.table_data,{strict : false});

            await Columns.deleteMany({ $and: [{ user_id: process.env.ACTIVE_USER_ID }, { order_type: 'C' }] }, () => {});
            let count = 0;
            for (let k in data.data_types) {
                await Columns.create({ 'sr_no': count, 'column_name': k, 'column_type': data.data_types[k], 'order_type': 'C', 'user_id': process.env.ACTIVE_USER_ID });
                count++;
            }
            return true;
        } catch (error) {
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
            await Orders.deleteMany({ user_id: process.env.ACTIVE_USER_ID });
            console.log(data.table_data);
            console.log(data.completed_orders);
            console.log(data.data_types);
            await Orders.insertMany(data.table_data,{strict : false});
            if(data.completed_orders != undefined)
                await Orders.insertMany(data.completed_orders,{strict : false});
            await Columns.deleteMany({ $and: [{ user_id: process.env.ACTIVE_USER_ID }, { order_type: 'I' }] }, () => {});
            let count = 0;
            for (let k in data.data_types)
            {
                await Columns.create({ 'sr_no': count, 'column_name': k, 'column_type': data.data_types[k], 'order_type': 'I', 'user_id': process.env.ACTIVE_USER_ID });
                count++;
            }
            await session.commitTransaction();
            session.endSession();
            return true;
        } catch (error) {
            // If an error occurred, abort the whole transaction and
            // undo any changes that might have happened
            await session.abortTransaction();
            session.endSession();
            throw error;
        }

    }

    async FirstTimeColumnsLoad()
    {
        const column = await Columns.findOne({user_id: process.env.ACTIVE_USER_ID}).exec();
        if(column === null || column === undefined)
        {
        await Columns.insertMany([
        {"sr_no":0,"column_name":"▬","column_type":"text","order_type":"C","user_id":process.env.ACTIVE_USER_ID},
        {"sr_no":1,"column_name":"customer_name","column_type":"text","order_type":"C","user_id":process.env.ACTIVE_USER_ID},
        {"sr_no":2,"column_name":"product_name","column_type":"text","order_type":"C","user_id":process.env.ACTIVE_USER_ID},
        {"sr_no":3,"column_name":"codes","column_type":"dropdown","order_type":"C","user_id":process.env.ACTIVE_USER_ID},
        {"sr_no":4,"column_name":"code_date","column_type":"date","order_type":"C","user_id":process.env.ACTIVE_USER_ID},
        {"sr_no":5,"column_name":"design","column_type":"dropdown","order_type":"C","user_id":process.env.ACTIVE_USER_ID},
        {"sr_no":6,"column_name":"design_date","column_type":"date","order_type":"C","user_id":process.env.ACTIVE_USER_ID},
        {"sr_no":7,"column_name":"design_approval","column_type":"dropdown","order_type":"C","user_id":process.env.ACTIVE_USER_ID},
        {"sr_no":8,"column_name":"design_approval_date","column_type":"date","order_type":"C","user_id":process.env.ACTIVE_USER_ID},
        {"sr_no":9,"column_name":"printing","column_type":"dropdown","order_type":"C","user_id":process.env.ACTIVE_USER_ID},
        {"sr_no":10,"column_name":"printing_date","column_type":"date","order_type":"C","user_id":process.env.ACTIVE_USER_ID},
        {"sr_no":11,"column_name":"stapling","column_type":"dropdown","order_type":"C","user_id":process.env.ACTIVE_USER_ID},
        {"sr_no":12,"column_name":"stapling_date","column_type":"date","order_type":"C","user_id":process.env.ACTIVE_USER_ID},
        {"sr_no":13,"column_name":"shipping","column_type":"dropdown","order_type":"C","user_id":process.env.ACTIVE_USER_ID},
        {"sr_no":14,"column_name":"ship_date","column_type":"date","order_type":"C","user_id":process.env.ACTIVE_USER_ID},
        {"sr_no":15,"column_name":"received","column_type":"dropdown","order_type":"C","user_id":process.env.ACTIVE_USER_ID},
        {"sr_no":16,"column_name":"received_date","column_type":"date","order_type":"C","user_id":process.env.ACTIVE_USER_ID},
        {"sr_no":17,"column_name":"completed","column_type":"dropdown","order_type":"C","user_id":process.env.ACTIVE_USER_ID},
        {"sr_no":18,"column_name":"file","column_type":"text","order_type":"C","user_id":process.env.ACTIVE_USER_ID}
        ]);

        await Columns.insertMany([
        {"sr_no": 0,  "column_name": "▬",  "column_type": "text",  "order_type": "I",  "user_id":process.env.ACTIVE_USER_ID},
        {"sr_no": 1,  "column_name": "customer_name",  "column_type": "text",  "order_type": "I",  "user_id":process.env.ACTIVE_USER_ID},
        {"sr_no": 2,  "column_name": "product_name",  "column_type": "text",  "order_type": "I",  "user_id":process.env.ACTIVE_USER_ID},
        {"sr_no": 3,  "column_name": "codes",  "column_type": "dropdown",  "order_type": "I",  "user_id":process.env.ACTIVE_USER_ID},
        {"sr_no": 4,  "column_name": "code_date",  "column_type": "date",  "order_type": "I",  "user_id":process.env.ACTIVE_USER_ID},
        {"sr_no": 5,  "column_name": "design",  "column_type": "dropdown",  "order_type": "I",  "user_id":process.env.ACTIVE_USER_ID},
        {"sr_no": 6,  "column_name": "design_date",  "column_type": "date",  "order_type": "I",  "user_id":process.env.ACTIVE_USER_ID},
        {"sr_no": 7,  "column_name": "design_approval",  "column_type": "dropdown",  "order_type": "I",  "user_id":process.env.ACTIVE_USER_ID},
        {"sr_no": 8,  "column_name": "design_approval_date",  "column_type": "date",  "order_type": "I",  "user_id":process.env.ACTIVE_USER_ID},
        {"sr_no": 9,  "column_name": "send_to_printer",  "column_type": "dropdown",  "order_type": "I",  "user_id":process.env.ACTIVE_USER_ID},
        {"sr_no": 10,  "column_name": "send_to_printer_date",  "column_type": "date",  "order_type": "I",  "user_id":process.env.ACTIVE_USER_ID},
        {"sr_no": 11,  "column_name": "proof_approval",  "column_type": "dropdown",  "order_type": "I",  "user_id":process.env.ACTIVE_USER_ID},
        {"sr_no": 12,  "column_name": "proof_approval_date",  "column_type": "date",  "order_type": "I",  "user_id":process.env.ACTIVE_USER_ID},
        {"sr_no": 13,  "column_name": "shipping",  "column_type": "dropdown",  "order_type": "I",  "user_id":process.env.ACTIVE_USER_ID},
        {"sr_no": 14,  "column_name": "ship_date",  "column_type": "date",  "order_type": "I",  "user_id":process.env.ACTIVE_USER_ID},
        {"sr_no": 15,  "column_name": "received",  "column_type": "dropdown",  "order_type": "I",  "user_id":process.env.ACTIVE_USER_ID},
        {"sr_no": 16,  "column_name": "received_date",  "column_type": "date",  "order_type": "I",  "user_id":process.env.ACTIVE_USER_ID},
        {"sr_no": 17,  "column_name": "completed",  "column_type": "dropdown",  "order_type": "I",  "user_id":process.env.ACTIVE_USER_ID},
        {"sr_no": 18,  "column_name": "notes",  "column_type": "text",  "order_type": "I", "user_id":process.env.ACTIVE_USER_ID},
        {"sr_no": 19,  "column_name": "file",  "column_type": "text",  "order_type": "I",  "user_id":process.env.ACTIVE_USER_ID}
    ]);

        return true;
        }
        return false;
    }

}
module.exports = new HomeDatabase();