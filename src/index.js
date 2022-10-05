import * as http from "http";
import {readFile} from 'node:fs';

const host = 'localhost';
const port = 8000;

let indexFile;

const books = JSON.stringify([
    {title: "The Alchemist", author: "Paulo Coelho", year: 1988},
    {title: "The Prophet", author: "Kahlil Gibran", year: 1923}
]);

const users = [];

const authors = JSON.stringify([
    {name: "Paulo Coelho", countryOfBirth: "Brazil", yearOfBirth: 1947},
    {name: "Kahlil Gibran", countryOfBirth: "Lebanon", yearOfBirth: 1883}
]);

const requestListener = function (req, res) {
    try {
        switch (req.url) {
            case "/books":
                library(req,res);
                break
            case "/users":
                usersController(req,res)
                break
            // case "/" :
            //     res.setHeader("Content-Type", "text/html");
            //     res.writeHead(200);
            //     res.end(indexFile);
            //     break
            // default:
            //     res.setHeader("Content-Type", "application/json");
            //     res.writeHead(404);
            //     res.end(`{code: 404, message: "Resource not found"}`);
        }
    } catch (e) {
        res.setHeader("Content-Type", "application/json");
        res.writeHead(500);
        res.end(JSON.stringify(e));
    }
}

function library(req, res){
    switch (req.method) {
        case "POST":
            readData(req, (body) => {books.push(JSON.parse(body))})
            res.setHeader("Content-Type", "application/json");
            res.writeHead(200);
            res.end(`{message: "saved"}`);
            break;
        case "GET":
            res.setHeader("Content-Type", "application/json");
            res.writeHead(200);
            res.end(JSON.stringify(books));
        default:
            res.setHeader("Content-Type", "application/json");
            res.writeHead(404);
            res.end(`{code: 404, message: "Resource not found"}`);
            break;
    }
}

function usersController(req, res){
    switch (req.method) {
        case "POST":
            readData(req, (body) => {users.push(JSON.parse(body))})
            res.setHeader("Content-Type", "application/json");
            res.writeHead(200);
            res.end(`{message: "saved"}`);
            break;
        case "GET":
            res.setHeader("Content-Type", "application/json");
            res.writeHead(200);
            res.end(JSON.stringify(users));
        default:
            res.setHeader("Content-Type", "application/json");
            res.writeHead(404);
            res.end(`{code: 404, message: "Resource not found"}`);
            break;
    }
}

let body;
function readData(req, func) {
    body = [];
    req.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        console.log(body);
        func(body);
    });
}

const server = http.createServer(requestListener);


readFile(process.cwd() + "/src/resource/index.html", 'utf8', ((err, data) => {
    if (err) {
        console.error(`Could not read index.html file: ${err}`);
        process.exit(1);
        return;
    }
    indexFile = data;
    server.listen(port, host, () => {
        console.log(`Server is running on http://${host}:${port}`);
    });
}));
