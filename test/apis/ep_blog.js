const rest = require('../../');

// Customer table
let blogs = {
    1: {
        name: "Batman",
        text: "Description here"
    },
    2: {
        name: "Superman",
        text: "Another description here"
    }
};

// create the endpoint (api)
let ep = rest.endpoint();

// Handle Http GET method
ep.GET("id:long", function (req, res) {
    let rec = blogs[req.params.id];
    if (!rec)
        throw new rest.HttpError(400, "Record not found");
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(rec));
});

// Handle Http PUT method
ep.PUT("id:long; name:string; text:string", function (req, res) {
    let rec = blogs[req.params.id] || {};
    rec.name = req.params.name;
    rec.text = req.params.text;
    blogs[req.params.id] = rec;
    res.end("Record created");
});

// Handle Http PATCH method
ep.PATCH("id:long; name:string; text:string",
    function (req, res) {
        let rec = blogs[req.params.id] || {};
        if (req.params.name)
            rec.name = req.params.name;
        if (req.params.text)
            rec.phone = req.params.text;
        blogs[req.params.id] = rec;
        res.end("Record updated");
    });

// Handle Http DELETE method
ep.DELETE("id:long", function (req, res) {
    let rec = blogs[req.params.id];
    if (!rec)
        throw new rest.HttpError(400, "Record not found");
    delete blogs[req.params.id];
    res.end("Record deleted");
});

module.exports = ep;