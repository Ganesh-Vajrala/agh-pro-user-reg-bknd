import mongoose from "mongoose";

const educationSchema = new mongoose.Schema({
    board: { type: String, default: 'N/A' },
    school: { type: String, default: 'N/A' },
    passingYear: { type: String, default: 'N/A' },
    marksType: { type: String, default: 'N/A' },
    marks: { type: String, default: 'N/A' },
  }, { _id: false });
  
  const educationDetailsSchema = new mongoose.Schema({
    classX: { type: educationSchema, default: () => ({}) },
    classXII: { type: educationSchema, default: () => ({}) },
    graduation: {
      college: { type: String, default: 'N/A' },
      passingYear: { type: String, default: 'N/A' },
      degree: { type: String, default: 'N/A' },
      marksType: { type: String, default: 'N/A' },
      marks: { type: String, default: 'N/A' },
    },
  }, { _id: false });
 
 export default educationDetailsSchema;
  