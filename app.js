const express = require("express");
const app = express();

const https = require("https");

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.use(express.static("public"));


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
    const fname = req.body.firstName;
    const lname = req.body.lastName;
    const emailid = req.body.emailId;
    var data = {
        members: [{
            email_address: emailid,
            status: "subscribed",
            merge_fields: {
                FNAME: fname,
                LNAME: lname
            }
        }]
    }
    const url = "https://us6.api.mailchimp.com/3.0/lists/84b6cXXXXX";
    const options = {
        method: "POST",
        auth: "Deepak:d3a0d5c006805caca22c89b2cc6XXXXX-us6"
    }

    var jsondata = JSON.stringify(data);
    const request = https.request(url, options, function (response) {
        if (response.statusCode === 200)
            res.sendFile(__dirname + "/success.html");
        else
         res.sendFile(__dirname + "/failure.html");
       
    });
    request.write(jsondata);
    request.end();
});
app.post("/failure", function (req, res) {
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running on port 3000");
})

