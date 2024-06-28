var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended : true
}))

mongoose.connect('mongodb+srv://shauryatomar184:Rz0J1TXDl3Jc2ITH@cluster1.nrrm9xy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1')
 .then(() => {
    console.log("Connected to Database");
  })
 .catch((err) => {
    console.error("Error connecting to database:", err);
  });

var db = mongoose.connection;
db.on('error', (err) => {
  console.error("Error in connecting to the Database:", err);
});

app.post("/add", (req,res) => {
    var categorySelect = req.body.categorySelect
    var amountInput = req.body.amountInput
    var info = req.body.info
    var dateInput = req.body.dateInput

    var data = {
        "Category": categorySelect,
        "Amount" : amountInput,
        "Info" : info,
        "Date" : dateInput
    }
    db.collection('users').insertOne(data, (err,collection) => {
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully")
    })
})

app.get("/", (req,res) => {
    res.set({
        "Allow-access-Allow-origin" : '*',

    })
    return res.redirect('index.html')
}).listen(5000)

console.log("listening on port 5000")