import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minlength: [1, 'Title must not be empty']
  },
  completed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true, // Add createdAt and updatedAt fields
  toJSON: {
    transform: function(doc, ret) {
      ret.id = ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

// If the model exists, use it; otherwise, create a new one
const Todo = mongoose.models.Todo || mongoose.model('Todo', TodoSchema);

export default Todo;
