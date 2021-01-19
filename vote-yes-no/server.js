const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');

// client gửi lên với header application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// client gửi lên với header application/json
app.use(express.json());


app.use(express.static('public'));
// => sinh ra các đường dẫn như sau
// app.get('/ask/index.html', (req, res) => {  
//   res.sendFile(path.resolve(__dirname, './public/ask/index.html'));
// })
// app.get('/ask/style.css', (req, res) => {  
//   res.sendFile(path.resolve(__dirname, './public/ask/style.html'));
// })
// app.get('/home/index.html', (req, res) => {  
//   res.sendFile(path.resolve(__dirname, './public/home/style.html'));
// })

app.get('/', (req, res) => {  
  res.sendFile(path.resolve(__dirname, './public/ask/index.html'));
})

app.post('/create-question',  (req, res) => {
  let data;
  try {
    data = JSON.parse(fs.readFileSync('data.json'));
  } catch (err) {
    data= [];
  }
  
  const newQuestion = {
    _id: data.length + 1,
    content: req.body.content,
    yes: 0,
    no: 0
  };
  const newData = [...data, newQuestion];
  fs.writeFileSync('data.json', JSON.stringify(newData));
  res.send({
    success: 1,
    data: newQuestion
  })
})

app.get('*',  (req, res) => {  
  res.sendFile(path.resolve(__dirname, './public/404/index.html'));
})

// app.get('/style.css', (req, res) => {  
//   res.sendFile(path.resolve(__dirname, './style.css'));
// })

// url + method
// url: /get-a-question method: get, post, put, delete

app.listen(8080, (err) => {
  if (err) throw err;
  console.log('Server started')
})
