const express = require('express');
const app = express();

app.use(express.json());

const fs = require('fs');

// read the existing data from the JSON file
let data = JSON.parse(fs.readFileSync('/home/ritik/Documents/front_end/crud/client/src/data.json'));




app.post('/my-route', (req, res) => {
  const {name,number,email,hobbies} = req.body ;
  console.log({name,number,email,hobbies});
  // update the data with new information
  data=[...data,{name,number,email,hobbies} ];

// write the updated data back to the JSON file
fs.writeFileSync('/home/ritik/Documents/front_end/crud/client/src/data.json', JSON.stringify(data));
  res.json({ message: 'Data received!' });
});

app.listen(5000, () => {
  console.log('Server listening on port 5000');
});