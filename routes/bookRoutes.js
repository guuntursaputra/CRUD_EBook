import express from "express"
import { create, destroy, getAllBooksPage, index, indexID, update } from "../controllers/bookController.js";
import { login, loginApi, logout, register } from "../controllers/userController.js";
import protect from "../middleware/userMiddleware.js"
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

//POST 
router.post("/book", protect, create);

router.get("/book", index);

router.get("/book/:id", indexID);

router.put("/book/:id", update);

router.delete("/book/:id", destroy);

router.get("/dashboard",protect, getAllBooksPage);

//loginAPI
router.post("/login", loginApi);

//register
router.post("/register", register);

//AUTH API

router.get('/login',(req,res) => {
    res.render('login')
})

router.post("/login",login);

router.get('/dashboard', protect, (req,res) => {
    res.render('dashboard', {user: req.user});
});

router.get('/google',passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/google/callback',
    passport.authenticate('google',{failureRedirect: '/login'}),
    async(req,res) => {
        //Jika login berhasil, buat token JWT untuk pengguna
        const token = jwt.sign({ id: req.user._id}, process.env.JWT_SECRET,{ expiresIn: '1h'});
        //simpan token di session
        req.session.token = token; 
        // redirect ke dashboard  
        res.redirect('/dashboard');
    }
);

router.post('/logout',logout);

export default router; 

