import { Schema, model } from 'mongoose';

const addressSchema = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  postalCode: { type: String, required: true },
});

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  uid: { type: String, required: true },
  password: { type: String },
  role: { type: String, enum: ['admin', 'customer'], required: true },
  phoneNumber: { type: String, required: true },
  deliveryAddress: addressSchema,
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
  },
});

userSchema.statics.isExists = async function (email) {
  const user = await this.findOne({ email });
  return user;
};

const User = model('User', userSchema);
export default User;
