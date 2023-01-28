const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
title: String,
author: String,
url: String,
likes: Number,
user: {    
  type: mongoose.Schema.Types.ObjectId,    
  ref: 'User' 
 }
})

// In order to remove __v that is returned by mongoose, the 'toJSON' method of the schema should be modified.
// 
blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        // changes id object to string id to avoid any confusion that it may cause
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('Blog', blogSchema);
