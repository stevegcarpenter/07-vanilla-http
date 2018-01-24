'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

describe('Server module', () => {
  beforeAll(() => server.start(5555));
  afterAll(() => server.stop());

  describe('Valid Request to the API', () => {
    describe('GET /', () => {
      it('should respond with a status 200', () => {
        return superagent.get(':5555/')
          .then(res => {
            expect(res.status).toBe(200);
          });
      });

      it('should respond with the message "Hello from my server!"', () => {
        return superagent.get(':5555/')
          .then(res => {
            expect(res.text).toBe('Hello from my server!');
          });
      });

      it('should respond with a header containing Content-Type: text/plain', () => {
        return superagent.get(':5555/')
          .then(res => {
            expect(res.header['content-type']).toBe('text/plain');
          });
      });
    });

    describe('GET /cowsay', () => {
      it('should respond with a status 200', () => {
        return superagent.get(':5555/')
          .then(res => {
            expect(res.status).toBe(200);
          });
      });

      it('should result in a cowsay Bad Request', () => {
        return superagent.get(':5555/cowsay')
          .catch(err => expect(err.response.text).toMatch(/Bad Request/))
      });

      it('should respond with a header containing Content-Type: text/plain', () => {
        return superagent.get(':5555/')
          .then(res => {
            expect(res.header['content-type']).toBe('text/plain');
          });
      });

      it('should display the message the user requests', () => {
        return superagent.get(':5555/cowsay?text=Yikes!')
          .then(res => expect(res.text).toMatch(/Yikes!/));
      });
    });

    // change to be POST /cowsay
    // describe('GET /', () => {
    //   it('should respond with a status 200', () => {
    //     return superagent.get(':5555/')
    //       .then(res => {
    //         expect(res.status).toBe(200);
    //       });
    //   });
    // });
  });
});
