import mongoose from "mongoose";

const basicDetailsSchema = new mongoose.Schema({
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    dob: {
      type: Date,
      default: null,
    },
    socialCategory: {
      type: String,
      default: 'N/A',
    },
    gender: {
      type: String,
      default: 'N/A',
    },
    maritalStatus: {
      type: String,
      default: 'N/A',
    },
    physicallyChallenged: {
      type: Boolean,
      default: false,
    },
  }, { _id: false });
  
export default basicDetailsSchema;