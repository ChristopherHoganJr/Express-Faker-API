const { faker } = require("@faker-js/faker");

const express = require("express");
const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

class User {
  constructor(password, email, phoneNumber, lastName, firstName, _id) {
    this.password = password;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.lastName = lastName;
    this.firstName = firstName;
    this._id = _id;
  }
}

class Company {
  constructor(_id, name, address) {
    this._id = _id;
    this.name = name;
    this.address = address;
  }
}

const createUser = () => {
  let newUser = new User(
    faker.internet.password(),
    faker.internet.email(),
    faker.phone.number(),
    faker.name.firstName(),
    faker.name.lastName(),
    faker.datatype.uuid()
  );
  return newUser;
};

const createCompany = () => {
  let newCompany = new Company(faker.datatype.uuid(), faker.company.name(), [
    faker.address.streetAddress(),
    faker.address.city(),
    faker.address.stateAbbr(),
    faker.address.zipCode(),
    faker.address.county(),
  ]);
  return newCompany;
};

app.get("/api", (req, res) => {
  res.send("Our express api server is now sending this over the browser");
});

app.get("/api/users/new", (req, res) => {
  res.json(createUser());
});

app.get("/api/companies/new", (req, res) => {
  res.json(createCompany());
});

app.get("/api/user/company", (req, res) => {
  let bothData = {};
  bothData["User"] = createUser();
  bothData["Company"] = createCompany();
  res.json(bothData);
});

const server = app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
