const express = require('express');
const app = express();
const passport = require('passport');

app.get('/', (req, res) => res.send("Adeus!"));
app.get('/logado', (req, res) =>{
    res.send(`Bem vindo ${req.user._json.name} !
    <br>
    <img src='${req.user._json.picture}'/>`);
});

 //${res.json(req.user)}
app.get('/erro', (req, res) => res.send("Erro ao logar"));
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/erro' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/logado');
    });

app.get('/sair', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
});

module.exports = app;