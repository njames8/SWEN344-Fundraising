CREATE TABLE user_info (
    user_id     INT PRIMARY KEY,
    first_name  TEXT NOT NULL,
    last_name   TEXT NOT NULL,
    email       TEXT NOT NULL,
    balance     REAL DEFAULT 0,
    is_admin    BOOLEAN DEFAULT FALSE
);

CREATE TABLE campaign (
    campaign_id INT PRIMARY KEY,
    owner_id    INT NOT NULL,
    title       TEXT NOT NULL,
    description TEXT,
    goal        REAL NOT NULL,
    total       REAL DEFAULT 0,
    start_date  DATE NOT NULL,
    end_date    DATE NOT NULL,
    image       TEXT,
    is_pending  BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (owner_id) REFERENCES user_info(user_id)
);

CREATE TABLE campaign_contributor (
    campaign_contributor_id INT PRIMARY KEY,
    campaign_id             INT NOT NULL,
    user_id                 INT NOT NULL,
    contribution            REAL NOT NULL,
    FOREIGN KEY (campaign_id) REFERENCES campaign(campaign_id),
    FOREIGN KEY (user_id) REFERENCES user_info(user_id)
);
