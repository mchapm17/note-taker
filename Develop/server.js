const fs = require('fs');
const path = require('path');
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/notes', (req,res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'))
});



app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('/api/notes', (req, res) => {
  const data = fs.readFileSync('./db/db,json', 'utf8');
  const notes = JSON.parse(data);
  res.json(notes);
})

app.post('/api/notes', (req, res) => {
  const data = fs.readFileSync('./db/db.json', 'utf8');
  const notes = JSON.parse(data)
  notes.push(req.body);
  const newNotes = JSON.stringify(notes, null, 2);
  fs.writeFileSync('./db/db.json', newNotes);
  res.json(notes);
});

app.listen(PORT, ()  => console.log('listening on http://localhost:' + PORT));

app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
});