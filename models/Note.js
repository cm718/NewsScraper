// Require mongoose and set up the Schema method
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
var NoteSchema = new Schema({
  // `title` is of type String
  title: String,
  // `body` is of type String
  body: String
});

// This creates our model from the above schema, using mongoose's model method
var Note = mongoose.model('Note', NoteSchema);

// Export the Note model
module.exports = Note;
