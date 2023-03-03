const express =require('express');
const routes =require('./controllers');
const sequelize =require('./config/connection');
const path =require('path');

// route to helper function
const helpers =require('./utils/helpers');

// route to handlebars
const exphbs =require('express-handlebars');
const hbs =exphbs.create({helpers});

const session =require('express-session');

const app =express();
const PORT =process.env.PORT || 3001;

const SequelizeStore =require('connect-session-sequelize')(session.Store);

// creating session
const sess ={
    secret: "super super secret",
    cookie: {originalMaxAge: 60000},
    resave: false,
    saveUnitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};
app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars',hbs.engine);
app.set('view engine', 'handlebars');

app.use(routes);

sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () =>  console.log('Now listening'));
});
