import { Document, Schema, model } from "mongoose";

export interface IPlan extends Document {
  name: string;
  price: number;
  features: string[];
  duration: number;
  createdAt: Date;
  updatedAt: Date;
}

const planSchema = new Schema<IPlan>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    features: {
      type: [String],
      default: []
    },
    duration: {
      type: Number,
      required: true,
      min: 1
    }
  },
  { timestamps: true }
);

export const Plan = model<IPlan>("Plan", planSchema);
