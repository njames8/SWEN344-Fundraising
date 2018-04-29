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
            userId: testData.campaigns[0].$ownerId,
            title: testData.campaigns[0].$title,
            description: testData.campaigns[0].$description,
            goal: testData.campaigns[0].$goal,
            startDate: testData.campaigns[0].$startDate,
            endDate: testData.campaigns[0].$endDate,
            image: testData.campaigns[0].$image
        };
        return request
            .post('/api/createCampaign')
            .send(body)
            .then((res) => {
                expect(res).to.have.status(200);
            });
    })
});