const express = require('express');

const webapp = express();

const cors = require('cors');

const session = require('cookie-session');

require('dotenv').config();
const path = require('path');

const lib = require('./dbOperations');

let db;

const url = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.n8nuy.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`;
// const url = 'mongodb+srv://cis350projectpenncaps:cis350projectpenncaps@cluster0.n8nuy.mongodb.net/ProjectPennCaps?retryWrites=true&w=majority';

webapp.use(express.json());
webapp.use(
  express.urlencoded({
    extended: true,
  }),
);

webapp.use(cors({ credentials: true, origin: true }));

// tell express where to find static files
webapp.use(express.static(path.join(__dirname, './penn-caps/build')));

webapp.use(session({
  name: 'session',
  keys: ['key1', 'key2'],
  maxAge: 3600000,
}));

// addUser login endpoint
webapp.post('/api/signup', async (req, resp) => {
  if (!req.body.pennid || req.body.pennid.length === 0) {
    resp.status(401).json({ error: 'pennid not provided' });
    return;
  }
  if (!req.body.password || req.body.password.length === 0) {
    resp.status(401).json({ error: 'password not provided' });
    return;
  }
  if (!req.body.firstname || req.body.firstname.length === 0) {
    resp.status(401).json({ error: 'firstname not provided' });
    return;
  }
  if (!req.body.lastname || req.body.lastname.length === 0) {
    resp.status(401).json({ error: 'last name not provided' });
    return;
  }
  try {
    const result = await lib.addUser(db, {
      pennid: req.body.pennid,
      password: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });
    req.session.pennid = result.pennid;
    req.session.firstname = result.firstname;
    req.session.lastname = result.lastname;
    resp.status(200).json({ message: 'successfully added user', data: result });
  } catch (err) {
    resp.status(401).json({ error: 'could not add user' });
  }
});

// addUser signup endpoint
webapp.post('/api/login', async (req, resp) => {
  if (!req.body.pennid || req.body.pennid.length === 0) {
    resp.status(401).json({ error: 'pennid not provided' });
    return;
  }
  if (!req.body.password || req.body.password.length === 0) {
    resp.status(401).json({ error: 'password not provided' });
    return;
  }
  try {
    const result = await lib.getUser(db, { pennid: req.body.pennid });
    req.session.pennid = result.pennid;
    req.session.firstname = result.firstname;
    req.session.lastname = result.lastname;
    resp.status(200).json({ message: 'successfully logged in', data: result });
  } catch (err) {
    resp.status(401).json({ error: 'could not find user' });
  }
});

webapp.get('/api/logout', async (req, resp) => {
  req.session.pennid = null;
  req.session.firstname = null;
  req.session.lastname = null;
  resp.status(200).json({ message: 'successfully logged out' });
});

// check if user in session
webapp.get('/api/check', (req, res) => {
  if (req.session.pennid === undefined || req.session.pennid === null) {
    res.send('user not logged in');
  } else {
    res.send(req.session.pennid);
  }
});

// check if username exists
webapp.post('/api/check-user', async (req, resp) => {
  try {
    const exists = await lib.usernameExists(db, { pennid: req.body.pennid });
    if (exists) {
      resp.status(200).json({ message: 'username exist' });
    } else {
      resp.status(200).json({ message: 'username does not exist' });
    }
  } catch (err) {
    resp.status(500).json({ error: 'try again later' });
  }
});

// update user endpoint
webapp.put('/api/update-user', async (req, resp) => {
  if (!req.body.password || req.body.password.length === 0) {
    resp.status(401).json({ error: 'password not provided' });
    return;
  }
  try {
    const result = await lib.updateUser(db, req.body.pennid, req.body.password);
    resp.status(200).json({ result, message: 'Password updated' });
  } catch (err) {
    resp.status(401).json({ error: 'could not update password' });
  }
});

webapp.get('/api/users', async (req, resp) => {
  try {
    const results = await lib.getUsers(db);
    return resp.status(200).json(results);
  } catch (err) {
    return resp.status(401).json({ error: 'could not get users' });
  }
});

// Get a user's appointments endpoint
webapp.get('/api/get-appointments/:pennid', async (req, res) => {
  try {
    const results = await lib.getAppointments(db, req.params.pennid);
    return res.status(200).json(results);
  } catch (err) {
    return res.status(401).json({ error: 'could not retrieve user appointments' });
  }
});

// Search All Appointments endpoint
webapp.get('/api/search-appointments', async (_req, res) => {
  try {
    const results = await lib.searchAllAppointments(db);
    return res.status(200).json(results);
  } catch (err) {
    return res.status(401).json({ error: 'could not search for all appointments' });
  }
});

// Schedule Appointment endpoint
webapp.put('/api/schedule-appointments', async (req, res) => {
  try {
    const result = await lib.scheduleAppointment(db, req.body.pennid, req.body.appointmentid);
    res.status(200).json(result);
    return;
  } catch (err) {
    res.status(401).json({ error: 'could not scheudle appointment' });
  }
});

// Delete appointment endpoint
webapp.delete('/api/delete-appointments/:appointmentid', async (req, res) => {
  try {
    const result = await lib.deleteAppointment(db, req.params.appointmentid);
    res.status(200).json({ message: `deleted appointment with id ${JSON.stringify(result)}` });
  } catch (err) {
    res.status(401).json({ error: 'could not delete appointment' });
  }
});

// Search All Appointments endpoint
webapp.get('/api/chat', async (_req, res) => {
  try {
    const results = await lib.getChats(db);
    // console.log(results);
    return res.status(200).json({ data: results });
  } catch (err) {
    return res.status(401).json({ error: 'could not get chat' });
  }
});

webapp.get('/api/chat-messages', async (_req, res) => {
  try {
    const results = await lib.getChatMessages(db);
    return res.status(200).json({ data: results });
  } catch (err) {
    return res.status(401).json({ error: 'could not get chat messages' });
  }
});

webapp.post('/api/send-message', async (req, resp) => {
  try {
    await lib.sendChatMessages(db, {
      id: parseInt(req.body.id, 10),
      sender: req.body.sender,
      message: req.body.message,
    });
    resp.status(200).json({ message: 'post chat messages' });
  } catch (err) {
    resp.status(500).json({ error: 'could not post message' });
  }
});

webapp.post('/api/start-chat', async (req, resp) => {
  try {
    const members = req.body.members.split(',');
    await lib.startNewChat(db, {
      id: parseInt(req.body.id, 10),
      members,
    });
    resp.status(200).json({ message: 'start new chat' });
  } catch (err) {
    resp.status(500).json({ error: 'could not start new chat' });
  }
});

webapp.get('/api/latestChatId', async (req, resp) => {
  try {
    const latestId = await lib.latestChatId(db);
    resp.status(200).json({ message: 'latest chat id retrieved', data: latestId });
  } catch (err) {
    resp.status(500).json({ error: 'try again later' });
  }
});

// Default response for any other request
webapp.use((_req, res) => {
  res.status(404);
});

// wildcard endpoint - send react app
webapp.get('*', (req, resp) => {
  resp.sendFile(path.join(__dirname, './penn-caps/build/index.html'));
});

// Start server
const port = process.env.PORT || 8080;
webapp.listen(port, async () => {
  try {
    db = await lib.connect(url);
    console.log(`Server running on port:${port}`);
  } catch (err) {
    throw new Error('server will not start');
  }
});

module.exports = webapp;
