const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});

app.get("/", function(req, res) {
  res.sendfile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;
  console.log(firstName, lastName, email);

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ],
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us8.api.mailchimp.com/3.0/lists/fd862775d6";

  const options = {
    method: "POST",
    auth: "mouin1:fb55f5dccbd84ca7bd86feb6b0a836ab-us8",
    // headers : {
    //   Authorization: "auth fb55f5dccbd84ca7bd86feb6b0a836ab-us8"
    // }
  };

  const request = https.request(url, options, function(response) {
    if (response.statusCode == 200) {
      res.send("Success!");
    } else {
      res.send("Failure!");
    };

    response.on("data", function(data) {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();

});


// const request = https.request(url, options, function(res) {
//
// })


// fb55f5dccbd84ca7bd86feb6b0a836ab-us8
// fd862775d6
