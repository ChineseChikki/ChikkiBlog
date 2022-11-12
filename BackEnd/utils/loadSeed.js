const userModel = require("../server/model/blogUser");

module.exports = () => {
  const seeds = [
    {
      name: "Chikki",
      username: "MissB",
      email: "chikki@gmail.com",
      password: "chikki",
      role: "superAdmin",
    },
    {
      name: "Lucy",
      username: "lulu",
      email: "lucy@gmail.com",
      password: "lucy",
      role: "admin",
    },
  ];

  seeds.map(uploadSeedsToDatabase);

  function uploadSeedsToDatabase(data) {
    userModel.findOne({ email: data.email }).then((user) => {
      if (!user) {
        userModel
          .create(data)
          .then((data) => {
            console.log(data.name.toUpperCase(), "created successfully");
          })
          .catch((err) => {
            console.log("An error occurred", err);
          });
      } else console.log(data.name.toUpperCase(), "already created");
    });
  }
};
