import chai from "chai";
import chatHttp from "chai-http";
import "chai/register-should";
import app from "../server";
import employee from "../server/src/models/employee";

chai.use(chatHttp);
const { expect } = chai;

describe("Testing the employee api endpoints:", () => {
  it("Employee should be created", (done) => {
    const employee = {
      firstname: "TestEmpFirstName",
      lastname: "TestEmpLastName",
      city: "TestEmpCity",
      country: "TestEmpCountry",
      address1: "TestEmpAddress1",
      address2: "TestEmpAddress2",
      address3: "TestEmpAddress2",
      imageurl: "TestEmpImageURL",
      active: "1",
      birthdate: "2020-11-25 00:00:01",
      hiredate: "2020-11-25 00:00:01",
      email: "email@email.com",
      department_id: 1,
      salary: "60000",
      jobtitle: "Team Leader",
    };
    chai
      .request(app)
      .post("/api/v1/employees")
      .set("Accept", "application/json")
      .send(employee)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data.data).to.include({
          firstname: employee.firstname,
          lastname: employee.lastname,
        });
        done();
      });
  });

  it("It should not create an employee with missing parameters", (done) => {
    const employee = {
      firstname: "TestFirstname",
    };
    chai
      .request(app)
      .post("/api/v1/employees")
      .set("Accept", "application/json")
      .send(employee)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it("It should get all employees", (done) => {
    chai
      .request(app)
      .get("/api/v1/employees")
      .set("Accept", "application/json")
      .end((err, res) => {
        expect(res.status).to.equal(200);
        res.body.data.data[0].should.have.property("id");
        res.body.data.data[0].should.have.property("firstname");
        res.body.data.data[0].should.have.property("lastname");
        done();
      });
  });

  it("It should get a particular employee", (done) => {
    const employeeId = 1;
    chai
      .request(employee)
      .get(`/api/v1/employees/${employeeId}`)
      .set("Accept", "application/json")
      .end((err, res) => {
        expect(res.status).to.equal(200);
        res.body.data.data.should.have.property("id");
        res.body.data.data.should.have.property("firstname");
        res.body.data.data.should.have.property("lastname");
        done();
      });
  });

  it("It should not get a particular book with invalid id", (done) => {
    const employeeId = 888;
    chai
      .request(app)
      .get(`/api/v1/employees/${employeeId}`)
      .set("Accept", "application/json")
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have
          .property("message")
          .eql(`Cannot find employee with the id ${employeeId}`);
        done();
      });
  });

  it("It should not get a particular employee with non-numeric id", (done) => {
    const employeeId = "aaa";
    chai
      .request(app)
      .get(`/api/v1/employees/${employeeId}`)
      .set("Accept", "application/json")
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have
          .property("message")
          .eql("Please input a valid numeric value");
        done();
      });
  });

  it("It should update an employee", (done) => {
    const employeeId = 1;
    const updatedEmployee = {
      id: employeeId,
      firstname: "Updated Firstname",
    };
    chai
      .request(app)
      .put(`/api/v1/employees/${employeeId}`)
      .set("Accept", "application/json")
      .send(updatedEmployee)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data.data.id).equal(updatedEmployee.id);
        expect(res.body.data.data.firstname).equal(updatedEmployee.firstname);
        done();
      });
  });

  it("It should not update an employee with invalid id", (done) => {
    const employeeId = "9999";
    const updatedEmployee = {
      id: employeeId,
      firstname: "Updated Firstname",
    };
    chai
      .request(app)
      .put(`/api/v1/employees/${employeeId}`)
      .set("Accept", "application/json")
      .send(updatedEmployee)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have
          .property("message")
          .eql(`Cannot find employee with the id: ${employeeId}`);
        done();
      });
  });

  it("It should not update an employee with non-numeric id value", (done) => {
    const employeeId = "ggg";
    const updatedEmployee = {
      id: employeeId,
      firstname: "Updated Firstname",
    };
    chai
      .request(app)
      .put(`/api/v1/employees/${employeeId}`)
      .set("Accept", "application/json")
      .send(updatedEmployee)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have
          .property("message")
          .eql("Please input a valid numeric value");
        done();
      });
  });

  it("It should delete an employee", (done) => {
    const employeeId = 1;
    chai
      .request(app)
      .delete(`/api/v1/employees/${employeeId}`)
      .set("Accept", "application/json")
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data.data).to.include({});
        done();
      });
  });

  it("It should not delete an employee with invalid id", (done) => {
    const employeeId = 777;
    chai
      .request(app)
      .delete(`/api/v1/employees/${employeeId}`)
      .set("Accept", "application/json")
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have
          .property("message")
          .eql(`Employee with the id ${employeeId} cannot be found`);
        done();
      });
  });

  it("It should not delete a book with non-numeric id", (done) => {
    const employeeId = "bbb";
    chai
      .request(app)
      .delete(`/api/v1/employees/${employeeId}`)
      .set("Accept", "application/json")
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have
          .property("message")
          .eql("Please provide a numeric value");
        done();
      });
  });
});
