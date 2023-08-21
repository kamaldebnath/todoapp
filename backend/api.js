//modules
const express = require('express');
const bodyparser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieparser = require('cookie-parser');
const cors = require('cors');

//app initialize
const app = express();

//middlewares
app.use(bodyparser.json());
app.use(cookieparser());
app.use(cors({
    methods: ["GET", "POST", "DELETE"],
    origin: true,
    credentials: true,
}));


//Data base
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://metacyst:SnWfstc6vXW25OER@cluster0.yka8yj6.mongodb.net/app')

//schema
const UserSchema = mongoose.Schema({
    email: String,
    username: String,
    password: String
})

const TaskSchema = mongoose.Schema({
    email: String,
    task: String
})

//model
const UserModel = mongoose.model('User', UserSchema);
const TaskModel = mongoose.model("Task", TaskSchema)


//routes
app.get('/',(req,res)=>{
    res.json("Hello");
})

app.post('/register', (req, res) => {
    UserModel.findOne({ email: req.body.email }).then((response) => {
        if (response) {
            res.json('email-exists');
        }
        if (!response) {
            UserModel.findOne({ username: req.body.username }).then((response) => {
                if (response) {
                    res.json("username-exists");
                }
                if (!response) {
                    new UserModel({
                        "email": req.body.email,
                        "username": req.body.username,
                        "password": bcrypt.hashSync(req.body.password, 10)
                    }).save().then((e) => res.json("success"));
                }
            })
        }

    });
})

app.post('/login', (req, res) => {

    UserModel.findOne({ email: req.body.email }).then((response) => {
        if (!response) {
            res.json("user-not-found");
        }
        if (response) {

            const user = response.username;
            bcrypt.compare(req.body.password, response.password, (err, response) => {
                if (err) {
                    res.json(err);
                }

                if (!response) {
                    res.json("incorrect-password");
                }
                if (response) {
                    const token = jwt.sign({ "email": req.body.email, "username": user }, "jwt-secret-key", { expiresIn: "1d" });
                    res.cookie("jwt_token", token);
                    res.json({ status: "success", token: token });
                }
            })
        }
    });

})

app.post('/auth', (req, res) => {
    if (req.body.token) {
        const decode = jwt.verify(req.body.token, "jwt-secret-key");
        res.json({ auth: true, data: decode });
    }
    else {
        res.json({ auth: false, data: 'error' });
    }
})

app.post("/addtask", (req, res) => {
    if (req.body.task) {
        const decode = jwt.verify(req.body.token, "jwt-secret-key");
        new TaskModel({ email: decode.email, task: req.body.task }).save().then((e) => {
            res.json("task added");
        });
    }
})

app.post("/gettask", async (req, res) => {
    await TaskModel.find({ email: req.body.email }).then((taskdata) => res.json(taskdata));
})

app.delete('/removetask/:jwttoken/:postId', (req, res) => {

    const decode = jwt.verify(req.params.jwttoken,"jwt-secret-key");
    TaskModel.findOne({ _id: req.params.postId }).then(async(e) => {
        if (e.email === decode.email) {
           await TaskModel.deleteOne({ _id: req.params.postId });
        }
    });
})


//listen to app
app.listen(5000, () => console.log("http://192.168.0.103:5000/"))