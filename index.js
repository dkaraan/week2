// loading core node http module
const http = require("http");

//loading core node filesystem (fs)
//going to use js promises
const fs = require('fs').promises;

//create function to respond to http requests
let requestListener = (req, res) => {

  console.log(req.url);

  if (req.url === "/"){
    //return back html file
    //__diraname is the absolute directory path of where the index.js lives

    fs.readFile(__dirname + "/thePage.html")

      //fs.readfile() is asynchronus so its going to keep going past this code
      //when readfile finishes and loads the text you need to incept the asynchronus reply using .then() method
        //this gives back the chunk of content after the file was read

      .then(contents => {
        
      //set http header entry
      res.setHeader("Content-Type", "text/html; chartset=UTF-8");
  
      //returning the status code
      res.writeHead(200);

      //sendback file contents
      //res.end("<html><head><title>hello worlds</title></head><body><('o')></body></html>");
      res.end(contents);
      });
  }
  /* was messing with adding another page
  else if(req.url === "/other"){
        //return back html file
    //__diraname is the absolute directory path of where the index.js lives

    fs.readFile(__dirname + "/otherpage.html")

      //fs.readfile() is asynchronus so its going to keep going past this code
      //when readfile finishes and loads the text you need to incept the asynchronus reply using .then() method
        //this gives back the chunk of content after the file was read

      .then(contents => {
        
      //set http header entry
      res.setHeader("Content-Type", "text/html; chartset=UTF-8");
  
      //returning the status code
      res.writeHead(200);

      //sendback file contents
      //res.end("<html><head><title>hello worlds</title></head><body><('o')></body></html>");
      res.end(contents);
      });
  }
  */
  else{
    //if request isnt root send out json file

        fs.readFile(__dirname + "/data.json")

      //fs.readfile() is asynchronus so its going to keep going past this code
      //when readfile finishes and loads the text you need to incept the asynchronus reply using .then() method
        //this gives back the chunk of content after the file was read

      .then(contents => {
      
      //the second argument must be application/json as that is the appropriate header response
      res.setHeader("Content-Type", "application/json; chartset=UTF-8");
  
      res.writeHead(200);

      res.end(contents);
      });
    
  };
};

//defining tcp port and ip address
const host = "0.0.0.0";
const port = "8080";

//creating server instance
const server = http.createServer(requestListener);

//call the listen() method to start listening to http requests
//this will show the absolute url that the server is running on
server.listen(
  port,
  host,
  ()=>{
    console.log(`Server is running on http://${host}:${port}`);
  }
)