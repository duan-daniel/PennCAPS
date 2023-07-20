import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const rootURL = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
  ? 'http://localhost:8080' : '';

export async function usernameExists(pennid) {
  const response = await axios.post(`${rootURL}/api/check-user`, { pennid: `${pennid}` });
  if (response.data.message === 'username exist') {
    return true;
  }
  return false;
}

export async function addUser(pennid, password, firstname, lastname) {
  const response = await axios.post(`${rootURL}/api/signup`, {
    pennid: `${pennid}`,
    password: `${password}`,
    firstname: `${firstname}`,
    lastname: `${lastname}`,
  });
  return response.data.data;
}

export async function userLogout() {
  await axios.get(`${rootURL}/api/logout`);
}

export async function getUser(pennid, password) {
  const response = await axios.post(`${rootURL}/api/login`, {
    pennid: `${pennid}`,
    password: `${password}`,
  });
  return response.data.data;
}

export async function getUserId() {
  try {
    const l = JSON.parse(await AsyncStorage.getItem('users'));
    const elem = l.at(-1);
    return elem.pennid;
  } catch (err) {
    throw new Error('an error!');
  }
}

export async function getUsers() {
  const response = await axios.get(`${rootURL}/api/users`);
  const users = response.data;
  const usersList = [];
  for (let i = 0; i < users.length; i += 1) {
    usersList.push(users[i].pennid);
  }
  return usersList;
}

export async function updateUser(pennid, password) {
  await axios.put(`${rootURL}/api/update-user`, { pennid: `${pennid}`, password: `${password}` });
}

export async function searchAppointments() {
  const response = await axios.get(`${rootURL}/api/search-appointments`);
  return response.data;
}

export async function scheduleAppointments(pennid, appointmentid) {
  await axios.put(`${rootURL}/api/schedule-appointments`, { pennid: `${pennid}`, appointmentid: `${appointmentid}` });
}

export async function checkPassword(pennid, password) {
  const response = await axios.post(`${rootURL}/api/checkPassword`, {
    pennid: `${pennid}`,
    password: `${password}`,
  });
  if (response.data.message === 'username exist') {
    return true;
  }
  return false;
}

export async function getUserChats(user) {
  const response = await axios.get(`${rootURL}/api/chat`);
  const chat = response.data.data;
  const userChats = [];
  for (let i = 0; i < chat.length; i += 1) {
    if (chat[i].members.includes(user)) {
      if (chat[i].members[0] !== user) {
        userChats.push(chat[i].members[0]);
      } else {
        userChats.push(chat[i].members[1]);
      }
    }
  }
  // userChats - ['Bob', 'Franklin', 'Gabe']
  return userChats;
}

export async function getUserChatIds(user) {
  const response = await axios.get(`${rootURL}/api/chat`);
  const chat = response.data.data;
  const userChatIds = [];
  for (let i = 0; i < chat.length; i += 1) {
    if (chat[i].members.includes(user)) {
      userChatIds.push(chat[i].id);
    }
  }
  // console.log(userChatIds);
  return userChatIds;
}

export async function getChats(user) {
  const response = await axios.get(`${rootURL}/api/chat`);
  const chat = response.data.data;
  const chats = [];
  for (let i = 0; i < chat.length; i += 1) {
    if (chat[i].members.includes(user)) {
      if (chat[i].members[0] !== user) {
        chats.push({ key: chat[i].members[0], value: chat[i].id });
      } else {
        chats.push({ key: chat[i].members[1], value: chat[i].id });
      }
    }
  }
  // chats -
  // 0: {key: 'Bob', value: 1}
  // 1: {key: 'Franklin', value: 3}
  // 2: {key: 'Gabe', value: 4}
  return chats;
}

export async function getChatMessages(id) {
  const response = await axios.get(`${rootURL}/api/chat-messages`);
  const chatMessages = response.data.data;
  const messages = [];
  for (let i = 0; i < chatMessages.length; i += 1) {
    if (chatMessages[i].id === id) {
      messages.push(chatMessages[i]);
    }
  }
  return messages;
}

export async function getAllChatMessages() {
  const response = await axios.get(`${rootURL}/api/chat-messages`);
  const chatMessages = response.data.data;
  return chatMessages;
}

export async function sendChatMessage(id, sender, message) {
  const response = await axios.post(`${rootURL}/api/send-message`, {
    id: `${id}`,
    sender: `${sender}`,
    message: `${message}`,
  });
  return response.data.data;
}

export async function startNewChat(id, members) {
  const response = await axios.post(`${rootURL}/api/start-chat`, {
    id: `${id}`,
    members: `${members}`,
  });
  return response.data.data;
}

export async function latestChatId() {
  const response = await axios.get(`${rootURL}/api/latestChatId`);
  return response.data.data;
}

export async function deleteUser(pennid) {
  const response = await axios.delete(`${rootURL}/api/delete-user`, {
    pennid: `${pennid}`,
  });
  if (response.data.message === 'deleted User!') {
    return true;
  }
  return false;
}

export async function checkUserSession() {
  const response = await axios.get(`${rootURL}/api/check`);
  return response.data;
}
