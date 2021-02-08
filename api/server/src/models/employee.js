'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Salary, {
        foreignKey: 'employee_id',
      }),
      User.hasOne(models.JobTitle, {
        foreignKey: 'employee_id',
      }),
      User.belongsTo(models.Department, {
        foreignKey: 'department_id',
      })
    }
  };
  Employee.init({
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    city: DataTypes.STRING,
    country: DataTypes.STRING,
    address1: DataTypes.STRING,
    address2: DataTypes.STRING,
    address3: DataTypes.STRING,
    imageurl: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    birthdate: DataTypes.DATE,
    hiredate: DataTypes.DATE,
    email: DataTypes.STRING,
    department_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Employee',
  });
  return Employee;
};

// module.exports = (sequelize, Sequelize) => {
//   const Employee = sequelize.define("employee", {
//     firstname: {
//       type: Sequelize.STRING,
//     },
//     lastname: {
//       type: Sequelize.STRING,
//     },
//     city: {
//       type: Sequelize.STRING,
//     },
//     country: {
//       type: Sequelize.STRING,
//     },
//     address1: {
//       type: Sequelize.STRING,
//     },
//     address2: {
//       type: Sequelize.STRING,
//     },
//     address3: {
//       type: Sequelize.STRING,
//     },
//     imageurl: {
//       type: Sequelize.STRING,
//     },
//     active: {
//         type: Sequelize.BOOLEAN,
//     },
//     birthdate: {
//         type: Sequelize.DATE,
//     },
//     hiredate: {
//       type: Sequelize.DATE,
//     },
//     email: {
//         type: Sequelize.STRING,
//         validate: {
//             isEmail: true
//         }
//     },
//     department_id: {
//       type: Sequelize.INTEGER
//     }
//   });

//   Employee.associate = function(models) {
//     User.hasOne(models.Salary, {
//       foreignKey: 'employee_id',
//     }),
//     User.hasOne(models.JobTitle, {
//       foreignKey: 'employee_id',
//     }),
//     User.belongsTo(models.Department, {
//       foreignKey: 'department_id',
//     })
//   }

//   return Employee;
// };

