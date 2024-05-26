"use server";
import EmailTemplate from "@/components/payments/EmailTemplate";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";
const {
  createUser,
  findUserCredentials,
  updateInterest,
  updatedGoinh,
  getEvent,
} = require("@/db/queries");
const { redirect } = require("next/navigation");

async function registerUser(formData) {
  const user = Object.fromEntries(formData);
  const created = await createUser(user);
  redirect("/login");
}

async function performLogin(formData) {
  try {
    const credentail = {};
    credentail.email = formData.get("email");
    credentail.password = formData.get("password");
    const found = await findUserCredentials(credentail);
    return found;
  } catch (err) {
    throw error;
  }
}

async function addInterestedEvent(eventId, authId) {
  try {
    await updateInterest(eventId, authId);
  } catch (error) {
    throw error.message;
  }
  revalidatePath("/");
}

async function addGoingEvent(eventId, user) {
  try {
    await updatedGoinh(eventId, user?.id);
    sendEmail(eventId, user);
  } catch (error) {
    throw error;
  }
  revalidatePath("/");
  redirect("/");
}

async function sendEmail(eventId, user) {
  try {
    const event = await getEvent(eventId);
    const resend = new Resend(process.env.EMAIL_RESEND_KEY);
    console.log(resend);
    const message = `Dear ${user?.name}, you  have been successfully registered for the event, ${event?.name}. Please carry this email and yourofficial id to the vanue. We are excited to have you here.`;
    const send = await resend.emails.send({
      from: "noreply@noreply.tapascript.io",
      to: user?.email,
      subject: "Successfully Registered for the event",
      react: EmailTemplate({ message }),
    });
  } catch (error) {
    throw error;
  }
}

export {
  addGoingEvent,
  addInterestedEvent,
  performLogin,
  registerUser,
  sendEmail,
};
