const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    maxlength: 50,
    minlength: 3,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    // minlength: 6,
  }
})

// pre mongoose middleware //
UserSchema.pre('save', async function() {
  const salt = await bcrypt.genSalt(10)
  // console.log(this)
  this.password = await bcrypt.hash(this.password, salt)
})

// Schema.methods.<function name you want to create for the schema> //
// for every new user creating the getToken method to send token to frontend to //
// UserSchema.methods.getToken = function() {
//   console.log(this)
//   // this will point to our document if we don't use arrow value to //
// }

UserSchema.methods.createJWT = function() {
  return jwt.sign({userId : this._id,name : this.name}, 'AjwtSecretA',{expiresIn : '30d', })
}

UserSchema.methods.comparePassword = async function(candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password)
  return isMatch
}

module.exports = mongoose.model('User',UserSchema)