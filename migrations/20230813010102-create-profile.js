module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('Profiles', {
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
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        age: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        gender: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        maritalStatus: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        occupation: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        address: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        nationality: {
          type: Sequelize.STRING,
          defaultValue: 'India',
        },
        mobileNumber: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        aadharNumber: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        dependents: {
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
      await queryInterface.dropTable('Profiles');
    },
  };
  