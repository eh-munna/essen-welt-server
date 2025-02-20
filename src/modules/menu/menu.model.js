import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// Schema for a single menu item
const menuItemSchema = new Schema(
  {
    name: { type: String, required: true },
    recipe: { type: String, required: true },
    image: { type: String, required: true },
    category: {
      type: String,
      enum: ['starters', 'mains', 'desserts', 'beverages'],
      required: true,
    },
    price: { type: Number, required: true, min: 0 },
    popular: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

const Menu = model('Menu', menuItemSchema);

export default Menu;
