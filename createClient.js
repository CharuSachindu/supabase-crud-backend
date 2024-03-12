
import express from 'express';
import { createClient } from '@supabase/supabase-js';
import morgan from 'morgan'
import bodyParser from "body-parser";

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });


// using morgan for logs
app.use(morgan('combined'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



// Create a single supabase client for interacting with your database
const supabase = createClient('https://sbhxxlzgmreamwqqjaht.supabase.co', 
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNiaHh4bHpnbXJlYW13cXFqYWh0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMDIzNDkwOCwiZXhwIjoyMDI1ODEwOTA4fQ.OjfKVasPFSze8PObP11C9kdxv60ueD6PjSEXV6J3Nns')

app.get('/', async (req, res) => {
    const {data, error} = await supabase
        .from('emplist')
        .select()
    res.send(data);
});

// app.get('/:id', async (req, res) => {
//     const {data, error} = await supabase
//         .from('emplist')
//         .select()
//         .is('id', req.params.id)
//     res.send(data);
// });


app.get('/:id', async (req, res) => {
    const {data, error} = await supabase
        .from('emplist')
        .select()
        .eq('id', req.params.id)
    res.send(data);
});

app.post('/create', async (req, res) => {
    const {error} = await supabase
        .from('emplist')
        .insert({
            name: req.body.name,
            id: req.body.id,
            age: req.body.age,
        })
    if (error) {
        res.send(error);
    }
    res.send("created!!");
});

app.put('/update/:id', async (req, res) => {
    const {error} = await supabase
        .from('emplist')
        .update({
            name: req.body.name,
            // id: req.body.id,
            age: req.body.age
        })
        .eq('id', req.params.id)
    if (error) {
        res.send(error);
    }
    res.send("updated!!");
});

app.delete('/delete/:id', async (req, res) => {
    const {error} = await supabase
        .from('emplist')
        .delete()
        .eq('id', req.params.id)
    if (error) {
        res.send(error);
    }
    res.send("deleted!!")

});

// app.get('/', (req, res) => {
//     res.send("Hello I am working my friend Supabase <3");
// });

// app.get('*', (req, res) => {
//     res.send("Hello again I am working my friend to the moon and behind <3");
// });

app.listen(3005, () => {
    console.log(`> Ready on http://localhost:3005`);
});