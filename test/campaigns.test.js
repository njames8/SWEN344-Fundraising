const app = require('../app');
const chai = require('chai');
const expect = chai.expect;
const http = require('http');

chai.use(require('chai-http'));

const server = http.createServer(app);
const request = chai.request(server);
after(done => server.close(done));
describe("GET Campaigns", function () {
    this.timeout(5000);
    it("should return the mock data", function () {
        return request
            .get('/api/campaigns')
            .then((res) => {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.a('array');
            });
    })
});
