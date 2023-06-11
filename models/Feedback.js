const mongoose = require("mongoose");
const { Schema } = mongoose;

const feedbackSchema = new Schema({
    survey_id: String,
    feedback: [Object]
});

mongoose.model("feedback", feedbackSchema);