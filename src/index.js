import * as http from "http";
import fs from 'fs'

const host = "localhost";
const port = 8000;
const filePath = process.cwd() + "/src/resource/contacts.json";

const requestListener = function (req, res) {
  let rawData = fs.readFileSync(filePath);
  let contacts = JSON.parse(rawData);
  res.end(JSON.stringify(contacts));

  // console.log(student);
};


const server = http.createServer(requestListener);


server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});