import { eventModel } from "@/models/event-modules";
import { userModel } from "@/models/user-models";
import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data-util";
import mongoose from "mongoose";

async function getAllEvents({query}) {
  let allEvents = [];
  if (query) {
    const regex = new RegExp(query, "i");
    allEvents = await eventModel.find({ name: { $regx: regex } }).lean();
  } else {
    allEvents = await eventModel.find().lean();
  }
  return replaceMongoIdInArray(allEvents);
}

async function getEvent(id) {
  const getEvent = await eventModel.findById(id).lean();
  return replaceMongoIdInObject(getEvent);
}

async function createUser(user) {
  return await userModel.create(user);
}

async function findUserCredentials(credentials) {
  console.log({ credentials });
  const user = await userModel.findOne(credentials).lean();
  if (user) {
    return replaceMongoIdInObject(user);
  }
  return null;
}

async function updateInterest(eventId, authId) {
  console.log(eventId, authId);
  const event = await eventModel.findById(eventId);
  if (event) {
    const foundUsers = event.interested_ids.find(
      (id) => id.toString() === authId
    );
    if (foundUsers) {
      event.interested_ids.pull(new mongoose.Types.ObjectId(authId));
    } else {
      event.interested_ids.push(new mongoose.Types.ObjectId(authId));
    }
    event.save();
  }
}
async function updatedGoinh(eventId, authId) {
  const event = await eventModel.findById(eventId);
  event.going_ids.push(new mongoose.Types.ObjectId(authId));
  event.save();
}

export {
  createUser,
  findUserCredentials,
  getAllEvents,
  getEvent,
  updateInterest,
  updatedGoinh,
};
