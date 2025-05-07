const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const multer = require('multer');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const users = {
    'patient1': 'password123',
    'patient2': 'password456'
};

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (users[username] && users[username] === password) {
        res.json({ success: true, username });
    } else {
        res.json({ success: false });
    }
});

app.get('/api/patient-data', (req, res) => {
    fs.readFile(path.join(__dirname, 'patient-data.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading patient data');
            return;
        }
        res.json(JSON.parse(data));
    });
});

app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }
    res.send('File uploaded successfully');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});