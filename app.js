const express = require("express");
const request = require("request");
const bodyparser = require("body-parser");
const https = require("https");



const app = express();
app.use(bodyparser.urlencoded({ extended: true }));

//app.use(express.static("public")) this is used to display our static files like images and CSS all of which are placed
//in a folder called public
// mailchimp api key---41a82cb1e37edea56fb0d38db7c01c5a-us21
/// lists id--- 4285ed6824
app.get("/", function (req, res) {
  res.sendFile("signup.html", { root: "." });
});

app.post("/", function (req, res) {
  var name = req.body.n1;
  var email = req.body.e1;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: name,
        },
      },
    ],
  };

  const json = JSON.stringify(data); ///converting js obj to JSON
  const url = "https://us21.api.mailchimp.com/3.0/lists/4285ed6824";
  const options = {
    method: "POST",
    auth: "test:41a82cb1e37edea56fb0d38db7c01c5a-us21",
  }
  const request = https.request(url, options, function (response) {
    //requesting the mailchimp server to post data on their server

    response.on("data", function (data) {
      const x = JSON.parse(data).error_count;
      //  what should be respond to after sending the data
   //console.log(x);
      if (x === 1 ) { // checking for duplicate email address
        res.sendFile("failure.html", { root: "." }); 
        
      }else if(response.statusCode===403){ /// if my api key or api endpoint is wrong
        res.sendFile("failure1.html", { root: "." }); 
      }
       else { // if none of the above go here
        res.sendFile("success.html", { root: "." });
      }
      console.log(JSON.parse(data));
    });
  });
  request.write(json);
  request.end();
});

app.get("/failure", function(req,res){
res.redirect("/")
})

app.listen(process.env.PORT || 3000, () => {
  console.log("server started");
});
