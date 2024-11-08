import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import crypto from 'crypto';



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
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken:{
    type:String
    },
  verificationTokenExpires:{
    type: Date
  },
}, { timestamps: true });



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

//method to create email verfication token
userSchema.methods.generateVerificationToken = function() {
  const token = crypto.randomBytes(32).toString('hex');
  this.verificationToken = token;
  this.verificationTokenExpires = Date.now() + 1 * 60 * 60 * 1000; // 1-hour expiration
  return token;
};

//method to create otp
userSchema.methods.generatePasswordResetToken = function() {
  const token = crypto.randomBytes(4).toString('hex').slice(0, 8);
  this.resetPasswordToken = token;
  this.resetPasswordExpires = Date.now() + 5 * 60 * 1000; // 5-min expiration
  return token;
};

export const User = mongoose.model('User', userSchema);







