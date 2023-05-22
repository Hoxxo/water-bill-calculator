const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // This is crucial for allowing cross-origin requests
app.use(express.json()); // This is needed to parse JSON request bodies

app.post('/data', (req, res) => {
    const data = req.body;
    console.log(data);

    res.json({ message: 'Data received!' });
});

app.listen(5200, () => console.log('Server started on port 5000'));
