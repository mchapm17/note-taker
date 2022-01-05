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

app.get('/api/notes', (req, res) => {
  const data = fs.readFileSync('./db/db.json', 'utf8');
  const notes = JSON.parse(data);
  res.json(notes);
})

app.post('/api/notes', (req, res) => {
  const data = fs.readFileSync('./db/db.json', 'utf8');
  const notes = JSON.parse(data);
  req.body.id = uuidv4();
  notes.push(req.body);
  const newNotes = JSON.stringify(notes, null, 2);
  fs.writeFileSync('./db/db.json', newNotes);
  res.json(req.body);
});

app.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  const data = fs.readFileSync('./db/db.json', 'utf8');
  const notes = JSON.parse(data).filter(n => n.id !== id);
  const newNotes = JSON.stringify(notes, null, 2);
  fs.writeFileSync('./db/db.json', newNotes);
  res.json('sucess');
});

app.listen(PORT, ()  => console.log('listening on http://localhost:' + PORT));

app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
});