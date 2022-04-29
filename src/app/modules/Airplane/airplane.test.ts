/* eslint-disable quotes */
/* eslint-disable no-undef */
import Chai from 'chai';
import ChaiHTTP from 'chai-http';
import server from '../../app';
import Airplanes from '../../models/Airplanes';

Chai.use(ChaiHTTP);

describe(`Test "Airplane" endpoints`, () => {
  const airplaneNumber = 334;
  const airplaneModel = 'wizzAir';
  const numberOfSeats = 2000;

  describe('Airplane', () => {
    beforeEach((done) => { // Before each test we empty the database
      Airplanes.remove({}, () => {
        done();
      });
    });
  });
  it('Test "POST /airplane"', async () => {
    const body = {
      airplaneNumber,
      airplaneModel,
      numberOfSeats,
    };
    const response = await Chai.request(server)
      .post('/airplane')
      .send(body);

    Chai.expect(response.status).to.equal(201);
  });

  it('Test "Patch /airplane/:id"', async () => {
    const body = {
      airplaneNumber,
      airplaneModel,
      numberOfSeats,
    };
    const response = await Chai.request(server)
      .post('/airplane/:id')
      .send(body);

    Chai.expect(response.status).to.equal(204);
  });
});
