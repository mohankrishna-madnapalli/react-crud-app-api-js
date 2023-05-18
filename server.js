const express = require('express');
const req = require('express/lib/request');
const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });


let items = [
    {id : 1 , name: 'Item 1'},
    {id : 2 , name: 'Item 2'},
    {id : 3 , name: 'Item 3'},
];

app.get('/api/items', (req,res) => {
    res.json(items);
});

app.get('/api/items/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const item = items.find(item => item.id === id);
    if(!item) {
        return res.status(404).json({error: 'Item not found'});
    }
    res.json(item);
});

app.post('/api/items', (req,res) => {
    const { name } = req.body;
    const newItem = { id : items.length + 1 , name};
    items.push(newItem);
    res.status(201).json(newItem);
});

app.put('/api/items/:id', (req,res) =>{
    const id = parseInt(req.params.id);
    const { name } = req.body;
    const item = items.find(item => item.id === id);

    if(!item)
    {
        return res.status(404).json({error:'Item not found'});
    }
    item.name = name;
    res.json(item);
});

app.delete('/api/items/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const index = items.findIndex(item => item.id === id);

    if(index === -1)
    {
        return res.status(404).json({error:'Item not found'});
    }

    const deleteItem = items.splice(index,1)[0];
    res.json(deleteItem);
});

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
});