const Login = require('./controller/login/controller');
const Home = require('./controller/home/controller');
let fs = require('fs');

function routes(app)
{
    app.get(['/','/home'],(Home.GetHome));
    
    app.get('/home/orders',(Home.GetOrders));
    
    app.post('/login/signup',(Login.InsertbyIdandPass));

    app.post('/home/orders/save', (req,res)=>{
        // console.log(req.body)
    })

    app.post('/login/signin',(Login.GetbyIdandPass));

    app.get('/login', (Login.GetLoginPage));
}

module.exports = routes;