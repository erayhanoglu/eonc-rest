const rest = require('../../..'); // eonc-rest

// Customer table
let customers = {
    1: {
        name: "John Marvell",
        phone: "555-1234567",
        balance: 0,
        note: "Some note"
    }
};

// create the endpoint (api)
let ep = rest.endpoint();

// Handle Http GET method
ep.GET("id:ns1:id", function (req, res) {
    let cust = customers[req.params.id];
    if (!cust)
        throw new rest.HttpError(400, "Record not found");
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(cust));
});

// Handle Http PUT method
ep.PUT("id:ns1:id; name:ns1:name; phone:ns1:phonenumber; node:string", function (req, res) {
    let cust = customers[req.params.id] || {};
    cust.name = req.params.name;
    cust.phone = req.params.phone;
    cust.note = req.params.note;
    customers[req.params.id] = cust;
    res.end("Record created");
});

// Handle Http PATCH method
ep.PATCH({
        id: "ns1:id",
        name: "ns1:name?",
        phone: "ns1:phonenumber?",
        note: {
            type: "string",
            optional: true,
            onvalidate: function (typ, val) {
                // You can validate and modify value here
                return val + " (validated)";
            }
        }
    },
    function (req, res) {
        let cust = customers[req.params.id] || {};
        if (req.params.name)
            cust.name = req.params.name;
        if (req.params.phone)
            cust.phone = req.params.phone;
        if (req.params.note)
            cust.note = req.params.note;
        customers[req.params.id] = cust;
        res.end("Record updated");
    });

// Handle Http DELETE method
ep.DELETE("id:ns1:id", function (req, res) {
    let cust = customers[req.params.id];
    if (!cust)
        throw new rest.HttpError(400, "Record not found");
    delete customers[req.params.id];
    res.end("Record deleted");
});

module.exports = ep;