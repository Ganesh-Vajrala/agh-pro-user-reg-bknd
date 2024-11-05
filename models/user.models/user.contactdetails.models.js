import mongoose from "mongoose";

const contactDetailsSchema = new mongoose.Schema({
    phoneNo: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function(v) {
          return /^\d{10}$/.test(v);
        },
        message: props => `${props.value} is not a valid phone number! Phone number should be 10 digits.`
      }
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    city: {
      type: String,
      default: 'N/A',
    },
    state: {
      type: String,
      default: 'N/A',
    },
  }, { _id: false });
  
export default contactDetailsSchema;