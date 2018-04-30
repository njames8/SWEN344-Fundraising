const app = require('../app');
const chai = require('chai');
const expect = chai.expect;
const http = require('http');
const sqlite = require('sqlite3');
const path = require('path');
const createDb = require('./setupDb');
const testData = require('./testdata');

chai.use(require('chai-http'));

const server = http.createServer(app);
const request = chai.request(server);

describe("POST Create Campaign", function () {
    before(function () {
        const db = new sqlite.Database(path.resolve('database/fundraising.db'));
        db.serialize(function () {
            createDb(db);
            db.serialize(function () {
                db.run("DELETE FROM campaign");
                db.run("DELETE FROM user_info");
                db.run("DELETE FROM campaign_contributor");
            });
        });
    });
    after(done => server.close(done));
    this.timeout(5000);
    it("should return the mock data", function () {
        let body = {
            firstName: testData.users[2].$firstName,
            lastName: testData.users[2].$lastName,
            email: testData.users[2].$email,
        };
        return request
            .post('/api/createUser')
            .send(body)
            .then((res) => {
                expect(res).to.have.status(200);
            });
    })
});