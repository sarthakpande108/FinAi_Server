module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('FinancialGoals', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      goal: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      targetAmount: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      deadline: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    await queryInterface.dropTable('FinancialGoals');
  },
};
