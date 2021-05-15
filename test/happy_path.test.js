const request = require('supertest');
const app = require('../app');

/* ------------- Start of fetch all tickets -------------- */
describe('/tickets (correct credentials)', () => {
  it('Returns a 200 status, if tickets exist', async (done) => {
    const res = await request(app).get('/tickets')
    expect(res.statusCode).toEqual(200);
    done();
  })

  it('Returns > 0 tickets, if tickets exist', async (done) => {
    const res = await request(app).get('/tickets')
    expect(res.body.tickets.length).toBeGreaterThanOrEqual(0);
    done();
  })
})

describe('/tickets (incorrect credentials)', () => {
  it('Returns a error 401, whether if tickets exists or not', async (done) => {
    const res = await request(app)
      .get('/tickets')
      .query({
        login: "example@email.com",
        password: "123123",
      })
      expect(res.body.error.includes(401)).toBeTruthy();
    done();
  })
})
/* -------------- End of fetch all tickets ---------------- */

/* ------------ Start of fetch ticket by id---------------- */
describe('/tickets/:id (correct credentials)', () => {
  const correctId = '2';
  const invalidId = '!!!';
  const nonExistentId = '2000';

  it('Returns a 200 status, if specific ticket exist', async (done) => {
    const res = await request(app).get(`/tickets/${correctId}`)
    expect(res.statusCode).toEqual(200);
    done();
  })

  it('Returns a error 400, if ticket(id) is not valid', async (done) => {
    const res = await request(app).get(`/tickets/${invalidId}`)
    expect(res.body.error.includes(400)).toBeTruthy();
    done();
  })

  it('Returns a error 404, if ticket(id) does not exist', async (done) => {
    const res = await request(app).get(`/tickets/${nonExistentId}`)
    expect(res.body.error.includes(404)).toBeTruthy();
    done();
  })

  it('Returns specific ticket correctly', async (done) => {
    const res = await request(app).get(`/tickets/${correctId}`)
    expect(res.body.ticket.id).toEqual(2);
    done();
  })
})

describe('/tickets/:id (incorrect credentials)', () => {
  it('Returns a error 401, whether if ticket exists or not', async (done) => {
    const res = await request(app)
      .get('/tickets/2')
      .query({
        login: "example@email.com",
        password: "123123",
      })
      expect(res.body.error.includes(401)).toBeTruthy();
    done();
  })
})
/* ------------ End of fetch ticket by id---------------- */