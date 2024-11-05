import mongoose from "mongoose";
import bcrypt from 'bcrypt';

import basicDetailsSchema from './user.models/user.basicdetails.models.js';
import contactDetailsSchema from './user.models/user.contactdetails.models.js';
import educationDetailsSchema from './user.models/user.educationdetails.models.js';
import preferencesSchema from './user.models/user.preferences.models.js';



const userSchema = new mongoose.Schema({
  basicDetails: {
    type: basicDetailsSchema,
  },
  contactDetails: {
    type: contactDetailsSchema,
  },
  educationDetails: {
    type: educationDetailsSchema,
    default: () => ({}),
  },
  preferences: {
    type: preferencesSchema,
    default: () => ({}),
  },

  password: {
    type: String,
    required: [true, "password required"],
    minlength: [8, "Password must be at least 8 characters"],
  },
  otp: {
    type: String,
  },
  otpExpiry: {
    type: Date,
  },
}, { timestamps: true });



//mongoose pre hook to encrypt the password(before storing into db)
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


// comparing the password
userSchema.methods.isPasswordCorrect = async function(password){
    return bcrypt.compare(password, this.password);
}

userSchema.methods.isOtpValid = function() {
    return this.otp && this.otpExpiry > new Date();
};

export const User = mongoose.model('User', userSchema);







