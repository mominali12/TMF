const HomeService = require('../../services/homeservice');
const fs = require('fs');
const path = require('path');

class Controller
{  
    async GetHome (req,res)
    {
      //console.log("Hello" + process.env.ACTIVE_USER);
      if(process.env.ACTIVE_USER != "")
      {
        
        fs.readFile(path.join(__dirname, '/../../../client_end/home.html'), null,function (error, data)
        {
          //console.log(path.join(__dirname, '/../../../client_side/login_signup.html'));
          if (error)
          {
              res.writeHead(404);
              res.write('Whoops! File not found!');
          }
          else
          {
            res.writeHead(200, {
              'Content-Type': 'text/html',
            });
            res.write(data);
            //res.json(orders);
          }
          res.end();
        });
      }
      else
        res.redirect('/login');
    }

    async SaveData(req,res)
    {
      if(process.env.ACTIVE_USER != "")
      {
        let result = await HomeService.SaveData(req.body);
        if(result)
          res.status(200).redirect('/home');
        else
          res.status(400).send(result);
      }
      else
        res.redirect('/login');
    }

    async SaveCompletedData(req,res)
    {
      if(process.env.ACTIVE_USER != "")
      {
        let result = await HomeService.SaveCompletedData(req.body);
        if(result)
          res.status(200).redirect('/home');
        else
          res.status(400).send(result);
      }
      else
        res.redirect('/login');
    }

    async GetCompletedHome (req,res)
    {
      //console.log("Hello" + process.env.ACTIVE_USER);
      if(process.env.ACTIVE_USER != "")
      {
        fs.readFile(path.join(__dirname, '/../../../client_end/completed.html'), null,function (error, data)
        {
          //console.log(path.join(__dirname, '/../../../client_side/login_signup.html'));
          if (error)
          {
              res.writeHead(404);
              res.write('Whoops! File not found!');
          }
          else
          {
            res.writeHead(200, {
              'Content-Type': 'text/html',
            });
            res.write(data);
            //res.json(orders);
          }
          res.end();
        });
      }
      else
        res.redirect('/login');
    }

    async GetOrders(req,res)
    {
      if(process.env.ACTIVE_USER != "")
      {
      const orders = await HomeService.getHomeData();
      const types = await HomeService.getColumnTypes();
      let final = {'orders':orders, 'types':types};
      orders.push({'store_logo_path' : "assets/" + process.env.ACTIVE_USER_ID + process.env.ACTIVE_USER + '.png',
                   'store_logo' : process.env.ACTIVE_USER_ID + process.env.ACTIVE_USER,
                   'user_id' : process.env.ACTIVE_USER_ID});
      res.status(200).json(final);
      }
      else
        res.redirect('/login');
    }

    async GetCompletedOrders(req,res)
    {
      if(process.env.ACTIVE_USER != "")
      {
        const orders = await HomeService.getCompletedHomeData();
        const types = await HomeService.getCompletedColumnTypes();
        let final = {'orders':orders, 'types':types};
        orders.push({'store_logo_path' : "assets/" + process.env.ACTIVE_USER_ID + process.env.ACTIVE_USER + '.png',
                    'store_logo' : process.env.ACTIVE_USER_ID + process.env.ACTIVE_USER});
        res.status(200).json(final);
      }
      else
        res.redirect('/login');
    }

    async GetGraph(req,res)
    {
      if(process.env.ACTIVE_USER != "")
      {
        
        fs.readFile(path.join(__dirname, '/../../../client_end/graph.html'), null,function (error, data)
        {
          //console.log(path.join(__dirname, '/../../../client_side/login_signup.html'));
          if (error)
          {
              res.writeHead(404);
              res.write('Whoops! File not found!');
          }
          else
          {
            res.writeHead(200, {
              'Content-Type': 'text/html',
            });
            res.write(data);
            //res.json(orders);
          }
          res.end();
        });
      }
      else
        res.redirect('/login');
    }

    async GetGraphData1(req,res)
    {
      if(process.env.ACTIVE_USER != "")
      {
        let final = await HomeService.getGraphData1();
        res.status(200).json(final);
      }
      
    }
}

module.exports = new Controller();