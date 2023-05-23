import express, { Request, Response } from 'express';
import cors from 'cors';
import { load_data_frame, path } from './read_data';
import { generate_data, Coordinate } from './create_data';

const app = express();

app.use(cors()); // This is crucial for allowing cross-origin requests
app.use(express.json()); // This is needed to parse JSON request bodies

let data: Coordinate[] = [];

load_data_frame(path).then((values) => {
    if (values) {
        data = generate_data(values);
    } else {
        return null;
    }

    let send = JSON.stringify(data);

    fetch('http://localhost:5200/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: send
    }).then((response) => {
        response.json().then((data) => {
            console.log(data);
        });
    });
});

app.post('/data', (req, res) => {
    const data = req.body;
    console.log(data);

    res.json({ message: 'Data received!' });
});

app.listen(5200, () => console.log('Server started on port 5200'));