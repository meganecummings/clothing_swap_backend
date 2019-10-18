const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const routes = require('./routes');


// --------------------- MIDDLEWARE --------------------- //
// BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Custom Logger Middleware
app.use((request, response, next) => {
    const url = request.url;
    const method = request.method;
    const requestedAt = new Date().toLocaleDateString();
    console.table({ url, method, requestedAt });
    next();
})

// User Sessions
app.use(session({ 
    secret: 'honeybuns',
    resave: false, 
    saveUninitialized: false
}));

const corsOptions = {
    origin: ['https://meganecummings.github.io/clothingswap-app'],
    credentials: true,
    preflightContinue: true,
    optionsSuccessStatus: 200
}

app.options('*', cors())

app.use(cors(corsOptions));

  // --------------------- ROUTES --------------------- //
// Root Route
app.get('/', (request, response) => {
    response.send('<h1>Welcome to ClothingSwap<h1>');
});

// API Routes
app.options('https://meganecummings.github.io', cors()) 
app.use('/api/v1/auth', routes.auth);
app.options('https://meganecummings.github.io', cors()) 
app.use('/api/v1/users', routes.users);
app.options('https://meganecummings.github.io', cors()) 
app.use('/api/v1/posts', routes.posts);
app.options('https://meganecummings.github.io', cors()) 
app.use('/api/v1/items', routes.items);
app.options('https://meganecummings.github.io', cors()) 
app.use('/api/v1/events', routes.events);

// --------------------- START SERVER --------------------- //
app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});