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

describe("GET User Info", function () {
    before(function() {
        const db = new sqlite.Database(path.resolve('database/fundraising.db'));
        db.serialize(function() {
            createDb(db);
            db.serialize(function(){
                db.run("DELETE FROM campaign");
                db.run("DELETE FROM user_info");
                db.run("DELETE FROM campaign_contributor");
                db.run("INSERT INTO campaign (ownerId, title, description, goal, total, startDate, endDate, image) " +
                    "VALUES ($ownerId, $title, $description, $goal, $total, $startDate, $endDate, $image)", testData.campaigns[0]);
                db.run("INSERT INTO user_info (firstName, lastName, email, balance) VALUES ($firstName, $lastName, $email, $balance)", testData.users[0]);
                db.run("INSERT INTO campaign_contributor (campaignId, userId, contribution) VALUES ($campaignId, $userId, $contribution)", testData.campaignContributors[0]);
            });
        });
    });
    after(done => server.close(done));
    this.timeout(5000);
    it("should return the mock data", function () {
        return request
            .get('/api/userInfo?email=superfreak%40gmail%2Ecom')
            .then((res) => {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
            });
    })
});
