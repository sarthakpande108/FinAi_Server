module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Assets', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      monthlyIncome: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      monthlyExpenditure: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      currentSavings: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      emergencyFund: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      investments: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      insurance: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      loans: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Assets');
  },
};
