const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    content: String,
    user: String,
    createdAt: String
});

module.exports = mongoose.model('Post', PostSchema);
