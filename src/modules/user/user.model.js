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
  password: { type: String },
  role: { type: String, enum: ['admin', 'customer'], required: true },
  phoneNumber: { type: String, required: true },
  deliveryAddress: addressSchema,
});

userSchema.statics.isExists = async function (email) {
  const user = await this.findOne({ email });
  return user;
};

const User = model('User', userSchema);
export default User;
