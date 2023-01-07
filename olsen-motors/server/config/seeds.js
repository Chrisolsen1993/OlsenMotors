const db = require("../config/connection");

const { faker } = require("@faker-js/faker");
const {
  User,
  Comment,
  Category,
  Conditions,
  Conversation,
  Message,
  Vehicules,
} = require("../models");

db.once("open", async () => {
  // Category
  // delete any previous Categories entries
  await Category.deleteMany();
  // create 6 categories
  const categories = await Category.insertMany([
    { catName: "SEDANS" },
    { catName: "SUVs" },
    { catName: "TRUCKS" },
    { catName: "VANS" },
    { catName: "MOTORCYCLES" },
    { depName: "BOATS" },
  ]);
  console.log("categories seeded");

  // USERS
  await User.deleteMany();

  const fakeUsers = [];

  const testUser = {
    firstName: "test",
    middleName: "test",
    lastName: "test",
    avatar: "",
    email: "testemail@gmail.com",
    password: "12345678",
    address: "123 Test St, Test",
    phoneNumber: "123-456-7890",
  };
  fakeUsers.push(testUser);

  for (let i = 0; i < 20; i++) {
    firstname = faker.name.firstName();
    lastname = faker.name.lastName();

    const fakeUser = {
      firstName: firstname,
      middleName: faker.name.middleName(),
      lastName: lastname,
      avatar: "",
      email: firstname + lastname + "@gmail.com",
      password: "12345678",

      phoneNumber: faker.phone.number(),
      address: faker.address.streetAddress(),
    };

    fakeUsers.push(fakeUser);
  }

  const users = await User.create(fakeUsers);

  console.log("users seeded");
  // REACTIONS
  await Reaction.deleteMany();

  const fakeReactions = [];

  for (let i = 0; i < 20; i++) {
    let randomUser = Math.floor(Math.random() * users.length);
    fakeLike = { like: true, noLike: false, userId: users[randomUser]._id };
    fakeReactions.push(fakeLike);
  }

  const conditions = await Conditions.insertMany([
    { conditionType: "MECHANICAL" },
    { conditionType: "RUN AND DRIVE" },
    { conditionType: "ENGINE START" },
  ]);
  console.log("Vehicules Conditions seeded");
  // COMMENTS
  await Comment.deleteMany();
  const comments = await Comment.insertMany([
    {
      comment: "Nice car, let's get in touch!",
      userId: users[Math.floor(Math.random() * users.length)]._id,
    },
    {
      comment:
        "I  messaged you about your post please respond at your soonest convenience.",
      userId: users[Math.floor(Math.random() * users.length)]._id,
    },
    {
      comment: "Nice bike!",
      userId: users[Math.floor(Math.random() * users.length)]._id,
    },
    {
      comment: "Hey do this car has a mechanical problem",
      userId: users[Math.floor(Math.random() * users.length)]._id,
    },
  ]);

  console.log("comments seeded");
  // POSTS
  await Vehicules.deleteMany();

  //   let applyAllGrades = [];
  //   grades.map((grade) => applyAllGrades.push(grade._id));

  const vehicules = await Vehicules.insertMany([
    {
      make: "Toyota",
      year: "2010",
      model: "Camry xle",
      color: "Gold",
      vin: "JHIDIDD12525ETX",
      photo: "",
      price: "$12000",
      categoryId: categories[0].id,
      conditionId:
        conditions[Math.floor(Math.random() * conditions.length)]._id,
      description: "Car in good shape but need a little work ",
      userId: users[Math.floor(Math.random() * users.length)]._id,
      commentId: comments[Math.floor(Math.random() * comments.length)]._id,
    },

    {
      make: "Toyota",
      year: "2018",
      model: "Rav4",
      color: "Silver",
      vin: "JHIDI31525ETX",
      photo: "",
      price: "$15000",
      categoryId: categories[1].id,
      conditionId:
        conditions[Math.floor(Math.random() * conditions.length)]._id,
      description: "Price negociable ",
      userId: users[Math.floor(Math.random() * users.length)]._id,
      commentId: comments[Math.floor(Math.random() * comments.length)]._id,
    },
    {
      make: "Chevrolet",
      year: "2005",
      model: "Silverado 1500",
      color: "White",
      vin: "JHIDIEX525ETX",
      photo: "",
      price: "$7000",
      categoryId: categories[2].id,
      conditionId: conditions[0]._id,
      description: "Nice pick up truck but needs some work ",
      userId: users[Math.floor(Math.random() * users.length)]._id,
      commentId: comments[Math.floor(Math.random() * comments.length)]._id,
    },
    {
      make: "Chevrolet",
      year: "2006",
      model: "Express cargo van ",
      color: "Black",
      vin: "JHIDI12525ETX",
      photo: "",
      price: "$3000",
      categoryId: categories[3].id,
      conditionId: conditions[1]._id,
      description: "Van will not move for some reason shoot your offer ",
      userId: users[Math.floor(Math.random() * users.length)]._id,
      commentId: comments[Math.floor(Math.random() * comments.length)]._id,
    },
    {
      make: "Venom X22R",
      year: "2022",
      model: "250CC MOTORCYCLE",
      color: "Red",
      vin: "123456QGHBDY",
      photo: "",
      price: "$3000",
      categoryId: categories[4].id,
      conditionId:
        conditions[Math.floor(Math.random() * conditions.length)]._id,
      description: "Good one ",
      userId: users[Math.floor(Math.random() * users.length)]._id,
      commentId: comments[Math.floor(Math.random() * comments.length)]._id,
    },
    {
      make: "MasterCraft ",
      year: "2017",
      model: "XT23",
      color: "Black",
      vin: "JHIDIDD12525ETX",
      photo: "",
      price: "$120000",
      categoryId: categories[5].id,
      conditionId: conditions[1]._id,
      description: "I love this boat ready to be shipped ",
      userId: users[Math.floor(Math.random() * users.length)]._id,
      commentId: comments[Math.floor(Math.random() * comments.length)]._id,
    },
  ]);
  console.log("Vehicules seeded");

  process.exit();
});
