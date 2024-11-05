import mongoose from "mongoose";
const preferenceDetailsSchema = new mongoose.Schema({
    level: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      default: 'No Preferences',
    },
    location: {
      type: String,
      default: 'No Preferences',
    },
    collegeType: {
      type: String,
      default: 'N/A',
    },
    feeRange: {
      type: String,
      default: 'N/A',
    },
    colleges: {
      type: String,
      default: 'No Preferences',
    },
    studyAbroad: {
      type: Boolean,
      default: false,
    },
    needLoan: {
      type: Boolean,
      default: false,
    },
  }, { _id: false });
  
  const preferenceItemSchema = new mongoose.Schema({
    stream: {
      type: String,
      required: true,
    },
    details: {
      type: preferenceDetailsSchema,
      default: () => ({}),
    }
  }, { _id: false });
  
  const preferencesSchema = new mongoose.Schema({
    items: {
      type: [preferenceItemSchema],
      default: []
    }
  }, { _id: false });
  
export default preferencesSchema;