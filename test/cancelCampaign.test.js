const app = require('../app');
const chai = require('chai');
const expect = chai.expect;
const http = require('http');

chai.use(require('chai-http'));

const server = http.createServer(app);
const request = chai.request(server);

describe("GET Cancel Campaign", function () {
    after(done => server.close(done));
    this.timeout(5000);
    it("should return the mock data", function () {
        return request
            .get('/api/cancelCampaign')
            .then((res) => {
                expect(res).to.have.status(200);
            });
    })
});