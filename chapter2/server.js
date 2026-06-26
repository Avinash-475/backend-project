const express = require('express')
const app = express()
const PORT = 3000
let data = [
    { name: "Avinash" }
];
app.use(express.json());
app.get('/', (req, res) => {
    res.send(`<body style="background:pink;color:blue;">
        <h1>DATA :</h1>
        <p>${JSON.stringify(data)}</p>
        <a href="/dashboard">dashboard</a>
    </body>`);
})


app.listen(PORT, () => console.log(`server has started on: ${PORT}`))


app.get('/dashboard', (req, res) => {
    res.send(`<body style="background:yellow;"> <h1>Hi my own backend dashboard </h1>
         <a href="/">home</a>  </body>
          `)
})


         //API END (non visual)
//CRUD-create-post  ,read-get ,update-put ,delete-delete

app.get('/api/data', (req, res) => {
    res.send(data);
})

app.post('/api/data', (req, res) => {
    const newEntry = req.body;
    console.log("Received:", newEntry);
    data.push(newEntry);
    console.log("Current data:", data);
    res.sendStatus(201);
});
