const express = require('express');
const morgan = require('morgan');
const app = express();

//Configuraciones
app.set('port',process.env.PORT || 3000);

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//rutas
app.use(require('./routes/experience.js'));
app.use(require('./routes/sala.js'));

//Public


// Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server started on port ${app.get('port')}`);
    }
);

//404
app.use((req, res, next) => {
    res.status(404).send('404 Not Found');
});