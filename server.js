import express from "express"; 
import dotenv from "dotenv";
import ConnectDb from "./config/database.js";
import router from "./routes/bookRoutes.js";
import session from "express-session";
import passport from "passport";
import './passport.js';

dotenv.config()

const app = express ();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}));


app.set('view engine', 'ejs');
app.set('views', './views')
//const port = 3000;

// app.get('/', (req, res) => {   
//     res.send('Hello World!')
// })

app.use(passport.initialize()); //Inisialisasi Passport
app.use(passport.session()); //Gunakan session passport

app.use('/', router)

ConnectDb();

const port = process.env.PORT;
 
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})