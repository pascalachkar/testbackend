'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JobTitle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      JobTitle.belongsTo(models.Employee, {
        foreignKey: 'employee_id',
        onDelete: 'CASCADE'
      })
    }
  };
  JobTitle.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    from_date: DataTypes.DATE,
    to_date: DataTypes.DATE,
    isCurrent: DataTypes.BOOLEAN,
    employee_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'JobTitle',
  });
  return JobTitle;
};