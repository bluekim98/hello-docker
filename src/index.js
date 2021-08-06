const express = require('express');
const redis = require('redis');
const {promisify} = require('util');

// express app
const app = express();

// redis 설정
const client = redis.createClient({
    host: 'redis_server',
    port: 6379
});
const getAsync = promisify(client.get).bind(client);

// test data 설정
const NUM_KEY = 'num';
client.set(NUM_KEY, 0);

// router 
app.get('/', async (req, res) => {
    const cur = await getAsync(NUM_KEY);
    console.log(cur);
    const next = parseInt(cur) + 1;
    client.set(NUM_KEY, next);
    
    const str = `Increase by 1 for each refresh : ${cur}`
    res.send(str);
});

// port 설정
const PORT = 3000;
app.listen(PORT);

console.log(`app is running on :${PORT}`);