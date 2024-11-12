import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true, 
    },
    content: { 
        type: String, 
        required: true, 
    }, 
    pages: {
        type: String, 
        require: true, 
    }, 
    author: {
        type: String, 
        require: true, 
    }, 
    
}, {timestamp: true}); 

const Book = mongoose.model("Book", bookSchema);

export default Book; 