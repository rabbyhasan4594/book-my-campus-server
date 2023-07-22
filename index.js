const express = require('express');
const app = express();
const cors = require('cors');

const port = process.env.PORT || 5000


const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions));
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Dancing start')
})
app.listen(port, () => {
    console.log(`Dancing is running on port ${port}`)
})