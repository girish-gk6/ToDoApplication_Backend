const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(cors());

// const corsOpts = {
//     origin: '*',

//     methods: [
//         'GET',
//         'POST',
//     ],

//     allowedHeaders: [
//         'Content-Type',
//     ],
// };

// app.use(cors(corsOpts));
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// app.use(cors());


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(c1 => {
        console.log("connection open");
    })
    .catch(err => {
        console.log(err);
    })

const listSchema = new mongoose.Schema({
    date: String,
    detail: String
});
app.listen(3000, () => {
    console.log("listening at port 3000");
})


const List = mongoose.model('List', listSchema);

// List.updateOne({ date: '31-07-22', detail: 'work on dsa' })
//     .then(res => console.log(res));

// const newList = new List(
//     { date: '31-07-22', detail: 'work on dsa' }
// )
// let allItems = new List();
// allItems = List.find({});
// console.log(allItems.toJSON);

//let obj = { date: '30-07-22', detail: 'work on algo' };

app.get('/list', (req, res) => {
    List.find({}, (err, result) => {
        if (err) throw err;
        else {
            res.json(result);
        }
    })

})

app.post('/list', (req, res) => {
    let obj = req.body;
    // console.log(req.body);
    List.create(obj, (err, result) => {
        if (err) throw err;
        else {
            console.log(result);
        }
    })
})

app.delete('/list/:id', (req, res) => {
    const { id } = req.params;
    let obj = List.findById(id);
    List.remove(obj, (err, result) => {
        if (err) throw err;
        else {
            console.log(result);
        }
    })
})

app.put('/list/:id', (req, res) => {
    const { id } = req.params;
    let obj = req.body;
    let idObj = { _id: id };
    List.findOneAndUpdate(idObj, obj, (err, result) => {
        if (err) throw err;
        else {
            console.log(result);
        }
    })
})
app.get('/list/:id', (req, res) => {
    const { id } = req.params;
    List.findById(id, (err, result) => {
        if (err) throw err;
        else {
            res.json(result);
        }
    })

})

