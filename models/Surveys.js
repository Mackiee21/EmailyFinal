const mongoose = require("mongoose");
const { Schema } = mongoose;


const surveySchema = new Schema({
    user: String,
    survey: Object
});

mongoose.model("surveys", surveySchema);