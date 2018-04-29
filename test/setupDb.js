function createDb(db) {
    const userInfo = `
        CREATE TABLE IF NOT EXISTS user_info (
            userId     INTEGER PRIMARY KEY AUTOINCREMENT,
            firstName  TEXT NOT NULL,
            lastName   TEXT NOT NULL,
            email       TEXT NOT NULL UNIQUE,
            balance     REAL DEFAULT 0 NOT NULL,
            isAdmin    BOOLEAN DEFAULT 0
        );
    `;

    const campaign = `
         CREATE TABLE IF NOT EXISTS campaign (
            campaignId INTEGER PRIMARY KEY AUTOINCREMENT,
            ownerId    INTEGER NOT NULL,
            title       TEXT NOT NULL,
            description TEXT,
            goal        REAL NOT NULL,
            total       REAL DEFAULT 0 NOT NULL,
            startDate  TIMESTAMP NOT NULL,
            endDate    TIMESTAMP NOT NULL,
            image       TEXT,
            isPending  BOOLEAN DEFAULT 1,
            FOREIGN KEY (ownerId) REFERENCES userInfo(userId)
        );
    `;

    const campaignContributor = `
        CREATE TABLE IF NOT EXISTS campaign_contributor (
            campaignContributorId INTEGER PRIMARY KEY AUTOINCREMENT,
            campaignId             INTEGER NOT NULL,
            userId                 INTEGER NOT NULL,
            contribution            REAL NOT NULL,
            isLive                 BOOLEAN DEFAULT 1,
            FOREIGN KEY (campaignId) REFERENCES campaign(campaignId),
            FOREIGN KEY (userId) REFERENCES user_info(userId)
        );
    `;
    db.serialize(function () {
        db.run(userInfo, function(err) {
            if (err) console.error(err)
        });
        db.run(campaign, function(err) {
            if (err) console.error(err)
        });
        db.run(campaignContributor, function(err) {
            if (err) console.error(err)
        });
    });
}

module.exports = createDb;