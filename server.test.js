/* eslint-disable object-curly-newline */
/* eslint-disable arrow-body-style */
/* eslint-disable no-undef */
// import supertest
const request = require('supertest');

// import our web app
const webapp = require('./server');

// Import database operations
const dbLib = require('./dbOperations');

// MongoDB URL
const url = 'mongodb+srv://cis350coding:cis350coding@cluster0.if3dm.mongodb.net/Live_Coding?retryWrites=true&w=majority';
let db;

beforeAll(async () => {
  webapp.listen();
  db = await dbLib.connect(url);
  db.collection('Users').remove({});
});

describe('/signup endpoint tests', () => {
  test('/signup endpoint status code and response 401 no id', () => {
    return request(webapp).post('/api/signup/')
      .send({ pennid: '', password: '12345678', firstname: 'grace', lastname: 'le' }).expect(401)
      .then((response) => expect(JSON.parse(response.text).error).toBe('pennid not provided'));
  });

  test('/signup endpoint status code and response 401 no password', () => {
    return request(webapp).post('/api/signup/')
      .send({ pennid: '12345678', password: '', firstname: 'grace', lastname: 'le' }).expect(401)
      .then((response) => expect(JSON.parse(response.text).error).toBe('password not provided'));
  });

  test('/signup endpoint status code and response 401 no firstname', () => {
    return request(webapp).post('/api/signup/')
      .send({ pennid: '12345678', password: '12345678', firstname: '', lastname: 'le' }).expect(401)
      .then((response) => expect(JSON.parse(response.text).error).toBe('firstname not provided'));
  });

  test('/signup endpoint status code and response 401 no lastname', () => {
    return request(webapp).post('/api/signup/')
      .send({ pennid: '12345678', password: '12345678', firstname: 'grace', lastname: '' }).expect(401)
      .then((response) => expect(JSON.parse(response.text).error).toBe('last name not provided'));
  });

  test('status code 200 and response', () => {
    return request(webapp).post('/api/signup')
      .send({ pennid: '12345678', password: '12345678', firstname: 'grace', lastname: 'le' })
      .expect(200)
      .then((response) => {
        expect(JSON.parse(response.text).message).toContain('successfully added user');
        expect(JSON.parse(response.text).data.pennid).toEqual('12345678');
      });
  });

  test('status code 200 and response another user', () => {
    return request(webapp).post('/api/signup')
      .send({ pennid: 'asd', password: 'asd', firstname: 'asd', lastname: 'asd' })
      .expect(200)
      .then((response) => {
        expect(JSON.parse(response.text).message).toContain('successfully added user');
        expect(JSON.parse(response.text).data.pennid).toEqual('asd');
      });
  });
});

describe('/login endpoint tests', () => {
  test('/login endpoint status code and response 401 no id', () => {
    return request(webapp).post('/api/login/')
      .send({ pennid: '', password: '12345678' }).expect(401)
      .then((response) => expect(JSON.parse(response.text).error).toBe('pennid not provided'));
  });

  test('/login endpoint status code and response 401 no id', () => {
    return request(webapp).post('/api/login/')
      .send({ pennid: '12345678', password: '' }).expect(401)
      .then((response) => expect(JSON.parse(response.text).error).toBe('password not provided'));
  });

  test('status code 200 and response', () => {
    return request(webapp).post('/api/login')
      .send({ pennid: 'asd', password: 'asd' })
      .expect(200)
      .then((response) => {
        expect(JSON.parse(response.text).message).toContain('successfully logged in');
        expect(JSON.parse(response.text).data.pennid).toEqual('asd');
        expect(JSON.parse(response.text).data.password).toEqual('asd');
      });
  });
});

describe('/check-user endpoint tests', () => {
  test('/check-user endpoint status code and response 200 exists', () => {
    return request(webapp).post('/api/check-user/')
      .send({ pennid: '12345678' }).expect(200)
      .then((response) => expect(JSON.parse(response.text).message).toBe('username exist'));
  });

  test('/check-user endpoint status code and response 200 not exist', () => {
    return request(webapp).post('/api/check-user/')
      .send({ pennid: '1234' }).expect(200)
      .then((response) => expect(JSON.parse(response.text).message).toBe('username does not exist'));
  });
});

describe('/update-user endpoint tests', () => {
  test('/update-user endpoint status code and response 401', () => {
    return request(webapp).put('/api/update-user/')
      .send({ password: '' }).expect(401)
      .then((response) => expect(JSON.parse(response.text).error).toBe('password not provided'));
  });

  test('/update-user endpoint status code and response 200', () => {
    return request(webapp).put('/api/update-user/')
      .send({ pennid: '12345678', password: '87654321' }).expect(200)
      .then((response) => expect(JSON.parse(response.text).message).toBe('Password updated'));
  });
});

describe('/start-chat endpoint tests', () => {
  test('/start-chat endpoint status code and response 200', () => {
    return request(webapp).post('/api/start-chat/')
      .send({ id: 1, members: 'shannon, grace' }).expect(200)
      .expect(200)
      .then((response) => expect(JSON.parse(response.text).message).toBe('start new chat'));
  });
});

describe('/lestchatId endpoint tests', () => {
  test('/latestchatId endpoint status code and response 200', () => {
    request(webapp).post('/start-chat/').send({ id: 1, members: 'shannon, grace' });
    request(webapp).post('/start-chat/').send({ id: 12, members: 'laila, grace' });
    request(webapp).post('/start-chat/').send({ id: 10, members: 'sophie, grace' });
    return request(webapp).get('/api/latestChatid/')
      .expect(200)
      .then((response) => {
        expect(JSON.parse(response.text).message).toContain('latest chat id retrieved');
      });
  });
});

describe('/get-appointments endpoint tests', () => {
  test('/get-appointment endpoint status code and response 200', () => {
    return request(webapp).get('/api/get-appointments/12345678')
      .expect(200);
  });
});

describe('/search-appointments endpoint tests', () => {
  test('/search-appointment endpoint status code and response 200', () => {
    return request(webapp).get('/api/search-appointments/')
      .expect(200);
  });
});

describe('/schedule-appointments endpoint tests', () => {
  test('/schedule-appointment endpoint status code and response 200', () => {
    return request(webapp).put('/api/schedule-appointments/')
      .send({ pennid: '12345678', appointmentid: '8' })
      .expect(200);
  });
});

describe('/delete-appointments endpoint tests', () => {
  test('/delete-appointments endpoint status code and response 200', () => {
    return request(webapp).delete('/api/delete-appointments/1')
      .expect(200)
      .then((response) => expect(JSON.parse(response.text).message).toContain('deleted appointment with id'));
  });
});

describe('/send-messages endpoint tests', () => {
  test('/send-messages endpoint status code and response 200 exists', () => {
    return request(webapp).post('/api/send-message/')
      .send({ id: '1', timestamp: '2', sender: 'grace', message: 'hi' })
      .expect(200)
      .then((response) => expect(JSON.parse(response.text).message).toBe('post chat messages'));
  });
});
