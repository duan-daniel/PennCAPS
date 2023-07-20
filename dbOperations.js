/* eslint-disable object-shorthand */
/* eslint-disable no-console */
// import MongoDb Driver
const { MongoClient } = require('mongodb');

// Connect to the database

const connect = async (url) => {
  try {
    const con = (await MongoClient.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
    )).db();
    console.log(`connected to the database: ${con.databaseName}`);
    return con;
  } catch (err) {
    throw new Error('could not connect to database');
  }
};

const getAppointments = async (db, pennid) => {
  try {
    const result = await db.collection('Appointments').find({ pennid: parseInt(`${pennid}`, 10) }).toArray();
    return result;
  } catch (err) {
    throw new Error('could not get this users appointments');
  }
};

const scheduleAppointment = async (db, pennid, appointmentid) => {
  try {
    console.log('scheduling appointment in dbOperations');
    console.log(`${appointmentid}`);
    console.log(`${pennid}`);
    const result = await db.collection('Appointments').updateOne({ appointmentid: parseInt(`${appointmentid}`, 10) }, { $set: { pennid: `${pennid}` } });
    return result;
  } catch (err) {
    throw new Error('could not schedule appointment');
  }
};

const searchAllAppointments = async (db) => {
  try {
    const results = await db.collection('Appointments').find({}).toArray();
    return results;
  } catch (err) {
    throw new Error('could not retreive appointments');
  }
};

const deleteAppointment = async (db, appointmentid) => {
  try {
    const result = await db.collection('Appointments').deleteOne({ appointmentid: parseInt(`${appointmentid}`, 10) });
    return result;
  } catch (err) {
    throw new Error('could not delete appointment');
  }
};

async function usernameExists(db, newUser) {
  try {
    const result = await db.collection('Users').findOne({ pennid: newUser.pennid });
    if (!result) {
      return false;
    }
    return true;
  } catch (err) {
    throw new Error('failed to check username');
  }
}

async function addUser(db, newUser) {
  try {
    await db.collection('Users').insertOne(newUser);
    return newUser;
  } catch (err) {
    throw new Error('failed to add user');
  }
}

async function getUser(db, newUser) {
  try {
    const result = await db.collection('Users').findOne({ pennid: newUser.pennid });
    return result;
  } catch (err) {
    throw new Error('failed to get user');
  }
}

async function getUsers(db) {
  try {
    const result = await db.collection('Users').find({}, { _id: 0, pennid: 1 }).toArray();
    return result;
  } catch (err) {
    throw new Error('failed to get user');
  }
}

const updateUser = async (db, pennid, newPassword) => {
  try {
    await db.collection('Users').find({ pennid });
    const result2 = await db.collection('Users').updateOne({ pennid: pennid }, { $set: { password: newPassword } });
    return result2;
  } catch (err) {
    throw new Error('could not find user');
  }
};

const getChats = async (db) => {
  try {
    const results = await db.collection('Chats').find({}).toArray();
    return results;
  } catch (err) {
    throw new Error('could not retrieve chats');
  }
};

const getChatMessages = async (db) => {
  try {
    const results = await db.collection('ChatMessages').find({}).toArray();
    return results;
  } catch (err) {
    throw new Error('could not retreive chat messages');
  }
};

const sendChatMessages = async (db, message) => {
  try {
    const results = await db.collection('ChatMessages').insertOne(message);
    return results;
  } catch (err) {
    throw new Error('could not add chat messages');
  }
};

const startNewChat = async (db, userChat) => {
  try {
    console.log(userChat);
    const results = await db.collection('Chats').insertOne(userChat);
    return results;
  } catch (err) {
    throw new Error('could not add chat messages');
  }
};

const latestChatId = async (db) => {
  try {
    const results = await db.collection('Chats').find({}).toArray();
    if (results.length === 0) {
      return 0;
    }
    const sortedRes = results.sort((a, b) => b.id - a.id);
    return sortedRes[0].id;
  } catch (err) {
    throw new Error('an error!');
  }
};

const deleteUser = async (db, name) => {
  try {
    await db.collection('Users').deleteOne({ pennid: name });
  } catch (err) {
    throw new Error('could not delete user');
  }
};

module.exports = {
  connect,
  addUser,
  getUser,
  getUsers,
  usernameExists,
  updateUser,
  searchAllAppointments,
  scheduleAppointment,
  getAppointments,
  deleteAppointment,
  getChats,
  getChatMessages,
  sendChatMessages,
  startNewChat,
  latestChatId,
  deleteUser,
};
