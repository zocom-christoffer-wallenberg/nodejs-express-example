const express = require('express');
const http = require('http');
const app = express();

app.use(express.static('public'));

app.get('/api/insult', (req, res) => {
    // /api/insult?search=Macbeth
    const searchTerm = req.query.search;
    console.log('SearchTerm is: ', searchTerm);
    let allInsult;
    let result = [];

    http.get('http://shakespeare-insults-generator.herokuapp.com/getAll', (response) => {
        let data = '';

        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            allInsult = JSON.parse(data);
            console.log('All insults: ', allInsult);

            for(insult of allInsult) {
                if (insult.play == searchTerm) {
                    result.push(insult);
                }
            }
            console.log('Result innehåller: ', result);
            res.send(JSON.stringify(result));
        });
    });
});

app.get('/api/getInsult', (req, res) => {
    const insult = {
        insult: 'Have you no wit, manners, nor honesty but to gabble like tinkers at this time of night?',
        play: 'Twelfth Night'
    }

    res.send(JSON.stringify(insult));
});

app.listen(8000);

/*
1. Kolla om url:en är api/insult
2. Hämta sökord
3. Gör anrop mot Shakespeare API och hämta alla insults
4. Sök igenom arraay och ta ut alla insult som matchar sökt pjäs
5. Returnera resultat till klient
*/

/*

const http = require('http');
const fs = require('fs');
const server = http.createServer();


server.on('request', (req, res) => {
    console.log('Requested url: ', req.url);

    if (req.url === '/') {
        console.log('Hello');
        const src = fs.createReadStream('index.html');
        src.pipe(res);
    } else if(req.url === '/client.js') {
        const src = fs.createReadStream('client.js');
        src.pipe(res);
    }

    if (req.url.indexOf('/api/insult') !== -1) {
        // /api/insult?search=Macbeth
        let search = req.url.split('=');
        console.log(search);
        let allInsult;
        let result = [];

        http.get('http://shakespeare-insults-generator.herokuapp.com/getAll', (response) => {
            let data = '';

            response.on('data', (chunk) => {
                data += chunk;
            });

            response.on('end', () => {
                allInsult = JSON.parse(data);
                console.log('All insults: ', allInsult);

                for(insult of allInsult) {
                    console.log('Search[1] ', search[1]);
                    if (insult.play == search[1]) {
                        result.push(insult);
                    }
                }
                res.end(JSON.stringify(result));
                console.log('Result innehåller: ', result);
            });
        });
    } else if (req.url.indexOf('/api/all') !== -1) {
        http.get('http://shakespeare-insults-generator.herokuapp.com/getAll', (response) => {
            let data = '';

            response.on('data', (chunk) => {
                data += chunk;
            });

            response.on('end', () => {
                allInsult = JSON.parse(data);
                res.end(JSON.stringify(allInsult));
            });
        });
    } else if (req.url.indexOf('/api/getInsult') !== -1) {
        const insult = {
            insult: 'Have you no wit, manners, nor honesty but to gabble like tinkers at this time of night?',
            play: 'Twelfth Night'
        }

        res.end(JSON.stringify(insult));
    }
});

server.listen(8000);
*/