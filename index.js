const express = require("express");
const cors = require("cors");
const data = require("./data/humans");
const index = express();
let PORT = process.env.PORT || 3000;

function findById(data, id){
    for (let i = 0; i < data.length; i++){
        if (data[i].id == id){
            return data[i];
        }
    }
    return null;
}

index.use(cors());

index.get("/", function (request, response) {
    response.json({data});
});

index.get("/:id", function (request, response) {
    var record = findById(data, request.params.id);
    if (!record){
        response.status(404).json({
            error: {
                message: "No record found!"
            }
        });
    } else {
        response.json({data: record});
    }
});

index.listen(PORT);