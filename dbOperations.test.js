/* eslint-disable no-undef */
// import dbOperations
const dbModule = require('./dbOperations');

// declare db object
let db;

// MongoDB URL
// const url = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.n8nuy.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`;
const url = 'mongodb+srv://cis350projectpenncaps:cis350projectpenncaps@cluster0.n8nuy.mongodb.net/ProjectPennCapsTesting?retryWrites=true&w=majority';
const newUserTest = {
  pennid: '12345678',
  password: '87654321',
  firstname: 'grace',
  lastname: 'le',
};

const newUserTest1 = {
  pennid: '123456789',
  password: '987654321',
  firstname: 'grace',
  lastname: 'le',
};

beforeEach(async () => {
  db = await dbModule.connect(url);
  db.collection('Users').remove({});
});

test('getAppointments get all appointments for one student', async () => {
  db = await dbModule.connect(url);
  await dbModule.scheduleAppointment(db, 1, 2);
  await dbModule.scheduleAppointment(db, 1, 1);
  const appointments = await dbModule.getAppointments(db, 1);
  const appointmentsDB = await db.collection('Appointments').find({ pennid: 1 }).toArray();
  expect(appointments).toEqual(appointmentsDB);
});

test('scheduleAppointments schedule a student appointment', async () => {
  db = await dbModule.connect(url);
  await dbModule.scheduleAppointment(db, 12345678, 1);
  const appointment = await dbModule.getAppointments(db, 12345678);
  const appointmentsDB = await db.collection('Appointments').find({ pennid: 12345678 }).toArray();
  expect(appointment).toEqual(appointmentsDB);
});

test('searchAllAppointments get all appointments in DB', async () => {
  db = await dbModule.connect(url);
  await dbModule.scheduleAppointment(db, 12345678, 0);
  await dbModule.scheduleAppointment(db, 87654321, 1);
  await dbModule.scheduleAppointment(db, 12345678, 2);
  const appointment = await dbModule.searchAllAppointments(db);
  const appointmentDB = await db.collection('Appointments').find({}).toArray();
  expect(appointment).toEqual(appointmentDB);
});

test('deleteAppointments delete an appointment', async () => {
  db = await dbModule.connect(url);
  await dbModule.scheduleAppointment(db, 88888888, 2);
  await dbModule.deleteAppointment(db, 2);
  try {
    await dbModule.getAppointments(db, 88888888);
  } catch (err) {
    expect(err.message).toBe('could not get this users appointments');
  }
});

test('usernameExists return true', async () => {
  db = await dbModule.connect(url);
  await dbModule.addUser(db, newUserTest);
  const testUser = await dbModule.usernameExists(db, newUserTest);
  expect(testUser).toBe(true);
});

test('usernameExists return false', async () => {
  db = await dbModule.connect(url);
  const testUser = await dbModule.usernameExists(db, newUserTest1);
  expect(testUser).toBe(false);
});

test('addUser add a new user', async () => {
  db = await dbModule.connect(url);
  await dbModule.addUser(db, newUserTest1);
  const newUser = await db.collection('Users').findOne({ pennid: '123456789' });
  expect(newUser.pennid).toEqual('123456789');
});

test('addUser throw an error', async () => {
  db = await dbModule.connect(url);
  try {
    await dbModule.addUser(db, newUserTest);
  } catch (err) {
    expect(err.message).toBe('failed to add user');
  }
});

test('getUser get a user', async () => {
  db = await dbModule.connect(url);
  const testUser = {
    pennid: '12345678',
    password: '12345678',
    firstname: 'grace',
    lastname: 'le',
  };
  await dbModule.addUser(db, testUser);
  const testUserDB = await dbModule.getUser(db, testUser);
  expect(testUserDB.pennid).toEqual('12345678');
});

test('getUsers get all users', async () => {
  db = await dbModule.connect(url);
  const testUser = {
    pennid: '12345678',
    password: '12345678',
    firstname: 'grace',
    lastname: 'le',
  };
  const testUser1 = {
    pennid: '123456789',
    password: '123456789',
    firstname: 'sophie',
    lastname: 'chen',
  };
  const testUser2 = {
    pennid: '1234567890',
    password: '1234567890',
    firstname: 'daniel',
    lastname: 'duan',
  };
  await dbModule.addUser(db, testUser);
  await dbModule.addUser(db, testUser1);
  await dbModule.addUser(db, testUser2);
  const users = await dbModule.getUsers(db);
  const usersDB = await db.collection('Users').find({}).toArray();
  expect(users).toEqual(usersDB);
});

test('updateUser update a user password', async () => {
  db = await dbModule.connect(url);
  await dbModule.addUser(db, newUserTest);
  await dbModule.updateUser(db, '12345678', '11111111');
  const result = await db.collection('Users').findOne({ pennid: '12345678' });
  expect(result.password).toBe('11111111');
});

test('updateUser throw an error', async () => {
  db = await dbModule.connect(url);
  try {
    await dbModule.updateUser(db, '00000000', '00000000');
  } catch (err) {
    expect(err.message).toBe('could not find user');
  }
});

test('getChats get all chats', async () => {
  db = await dbModule.connect(url);
  const testUserChat = {
    id: 1,
    members: ['grace', 'shannon'],
  };
  const testUserChat1 = {
    id: 2,
    members: ['grace', 'laila'],
  };
  await dbModule.startNewChat(db, testUserChat);
  await dbModule.startNewChat(db, testUserChat1);
  const chat = await dbModule.getChats(db);
  const chatDB = await db.collection('Chats').find({}).toArray();
  expect(chat).toEqual(chatDB);
});

test('getChatMessages all chat messages', async () => {
  db = await dbModule.connect(url);
  const message = {
    id: 1,
    sender: 'shan',
    message: 'hello',
  };
  const message1 = {
    id: 1,
    sender: 'shan',
    message: 'hi',
  };
  await dbModule.sendChatMessages(db, message);
  await dbModule.startNewChat(db, message1);
  const messageTest = await dbModule.getChatMessages(db);
  const messageDB = await db.collection('ChatMessages').find({}).toArray();
  expect(messageTest).toEqual(messageDB);
});

test('latestChatId return chatid', async () => {
  db = await dbModule.connect(url);
  const testUserChat = {
    id: 1,
    members: ['grace', 'shannon'],
  };
  const testUserChat1 = {
    id: 2,
    members: ['grace', 'laila'],
  };
  const testUserChat2 = {
    id: 10,
    members: ['shannon', 'laila'],
  };
  await dbModule.startNewChat(db, testUserChat);
  await dbModule.startNewChat(db, testUserChat1);
  await dbModule.startNewChat(db, testUserChat2);
  const chatID = await dbModule.latestChatId(db);
  expect(chatID).toEqual(10);
});
