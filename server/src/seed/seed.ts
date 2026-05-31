import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { connectDB } from "../config/db";
import { Plan } from "../models/Plan";
import { User } from "../models/User";
import { planRepository } from "../repositories/plan.repository";

const plans = [
  {
    name: "Starter",
    price: 499,
    duration: 30,
    features: ["Basic dashboard", "Single active subscription", "Email support"]
  },
  {
    name: "Professional",
    price: 999,
    duration: 30,
    features: ["Advanced dashboard", "Priority support", "Usage insights"]
  },
  {
    name: "Business",
    price: 1999,
    duration: 90,
    features: ["Team-ready access", "Quarterly subscription", "Priority onboarding"]
  },
  {
    name: "Enterprise",
    price: 4999,
    duration: 365,
    features: ["Annual access", "Dedicated support", "Custom reporting"]
  }
];

const seed = async () => {
  await connectDB();

  for (const plan of plans) {
    await planRepository.upsertByName(plan);
  }

  const adminEmail = "admin@test.com";
  const existingAdmin = await User.findOne({ email: adminEmail });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("Admin@123", 10);
    await User.create({
      name: "Admin User",
      email: adminEmail,
      password: hashedPassword,
      role: "admin"
    });
  }

  const planCount = await Plan.countDocuments();
  console.log(`Seed completed. Plans: ${planCount}. Admin: ${adminEmail}`);

  await mongoose.disconnect();
};

seed().catch(async (error) => {
  console.error("Seed failed", error);
  await mongoose.disconnect();
  process.exit(1);
});
