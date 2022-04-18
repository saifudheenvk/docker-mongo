import 'jest';
import app from "./index"
import request from 'supertest';
import {
  StatusCodes,
} from 'http-status-codes';
import mongoose from 'mongoose';


describe('Get locations Api tests', () => {
  it('get locations server response type', async () => {
    await request(app)
      .get('/locations')
      .set('Accept', 'application/json')
      .expect((res: request.Response) => Array.isArray(res.body))
      .expect(StatusCodes.OK);
  });
});

afterAll(done => {
  // Closing the DB connection allows Jest to exit successfully.
  mongoose.connection.close()
  app.close();
  done()
})