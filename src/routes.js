const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title><head>");
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send </button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    // req.on(data) is event listener
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    // req.on(end) is event listener
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      // writeFileSync block code execution untill file done its block
      // code execution if file is large
      // fs.writeFileSync("message.txt", message);

      // another option is writeFile which is eventListner
      fs.writeFile("message.txt", message, (err) => {
        console.log(err);
      });
      res.statusCode = 302;
      res.setHeader("Location", "/");
      res.end();
    });
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title><head>");
  res.write("<body><h1>Hello from my Node.js Server!</h1></body>");
  res.write("</html>");
  res.end();
};
module.exports = {
  handler: requestHandler,
  someText: "Dummy Text"
};
