const campaigns = [
    {
        $ownerId: 1,
        $title: "Clubbin Money",
        $description: "Give me money so I can get Superfreak-y.",
        $goal: 10000.00,
        $total: 3.00,
        $startDate: 1525015671398,
        $endDate: 1534595460000,
        $image: "https://comedycentral.mtvnimages.com/images/shows/chappelle/videos/season_2/CHAPPELLE_02_0204_RICKJAMES_640x360.jpg"
    },
    {
        $ownerId: 2,
        $title: "Purple Rainy Day Fund",
        $description: "I only want to have some money in the purple rain.",
        $goal: 2500.25,
        $total: 601.78,
        $startDate: 1525015671398,
        $endDate: 1534595460000,
        $image: "https://s3.envato.com/files/238469955/Purple%20Rain%2001_preview1%20.JPG"
    }
];

const users = [
    {
        $firstName: "Rick",
        $lastName: "James",
        $email: "superfreak@gmail.com",
        $balance: 3.00
    },
    {
        $firstName: "Prince",
        $lastName: "and The Revolution",
        $email: "purplerain@gmail.com",
    },
    {
        $firstName: "Billy",
        $lastName: "Joel",
        $email: "thestranger@gmail.com",
        $isAdmin: 1
    }
];

const campaignContributors = [
    {
        $campaignId: 1,
        $userId: 1,
        $contribution: 3.00
    }
];

module.exports = {
    campaigns,
    users,
    campaignContributors
};