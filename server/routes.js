const Login = require('./controller/login/controller');
const Home = require('./controller/home/controller');
let fs = require('fs');

function routes(app)
{

    app.get(['/graph'],(Home.GetGraph));

    app.get(['/','/home'],(Home.GetHome));
    
    app.get('/home/orders',(Home.GetOrders));

    app.post('/home/orders/save',(Home.SaveData));


    app.get('/home/completed',(Home.GetCompletedHome));

    app.get('/home/completedorders',(Home.GetCompletedOrders));
    
    app.post('/home/orders/savecompleted',(Home.SaveCompletedData));
    
    
    app.post('/login/signup',(Login.InsertbyIdandPass));

    app.post('/login/signin',(Login.GetbyIdandPass));

    app.get('/login', (Login.GetLoginPage));
}

module.exports = routes;