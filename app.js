const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session');
const app = express();
const passport = require('passport')
const router = require('./routers/router');
require('./passport/passport');

app.use(cookieSession({
    name: 'mike-session',
    keys: ['key1','key2']
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(router);

const logado = (req, res, next) => {
    if (req.use) {
        next();
    } else {
        res.sendStatus(401);
    }
};



app.listen(3030, ()=>{
console.log("Servidor rodando na porta 3030");
console.log("Acesse a rota http://localhost:3030/auth/google para efetuar o login!");
console.log("Acesse a rota http://localhost:3030/ para sair!");
});