const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000;

const { Novu } = require("@novu/node");
const novu = new Novu("b8a30a1e7c34f566abb90543dd8968bd");



const generateCode = () => Math.random().toString(36).substring(2, 12);

const sendNovuNotification = async (recipient, verificationCode) => {
    try {
        let response = await novu.trigger("G3CgnqoPbBYQ", {
            to: {
                subscriberId: recipient,
                phone: recipient,
            },
            payload: {
                code: verificationCode,
            },
        });
        console.log(response);
    } catch (err) {
        console.error(err);
    }
};


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const users = [];
let code;

app.get("/api", (req, res) => {
    res.json({ message: "Hello world" });
});

app.post("/api/register", (req, res) => {
    const generateID = ()=>Math.random().toString(36).substring(2,10);
    
    const { email, password, tel, username } = req.body;

    let result = users.filter((user)=>user.email ===email || user.tel === tel);

    if(result.length === 0){
        const newUser = {id:generateID(),email,password,username,tel};
        users.push(newUser);
        return res.json({
            message:"Account created successfullt"
        });
    }

    res.json({
        error_message:"User already exist"
    });
    //👇🏻 Logs the credentials to the console
})

app.post("/api/login", (req, res) => {
  
    //👇🏻 Accepts the user's credentials
    const { email, password } = req.body;
    //👇🏻 Checks for user(s) with the same email and password
    let result = users.filter(
        (user) => user.email === email && user.password === password
    );

    //👇🏻 If no user exists, it returns an error message
    if (result.length !== 1) {
        return res.json({
            error_message: "Incorrect credentials",
        });
    }
    code = generateCode();
    sendNovuNotification(result[0].tel, code);


    //👇🏻 Returns the username of the user after a successful login
    res.json({
        message: "Login successfully",
        data: {
            username: result[0].username,
        },
    });
});

app.post("/api/verification", (req, res) => {
    if (code === req.body.code) {
        return res.json({ message: "You're verified successfully" });
    }
    res.json({
        error_message: "Incorrect credentials",
    });
});


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});