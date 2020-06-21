module.exports = (sequelize, DataTypes) => {
    const Time = sequelize.define(
      "Time",
      {
        id:
        {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
          unique: true
        },
        nome:
        {
          type: DataTypes.STRING,
          allowNull: false
        },
        cep: {
          type: DataTypes.STRING,
          allowNull: false
        }},
        {
          timestamps: false,
          tableName: 'times'
        },
    );
  
    Time.associate = (models) => {
      Time.belongsTo(models.Jogo, {
          foreignKey: "id",
      });
      Time.hasMany(models.Jogador, {
        foreignKey: "times_id",
      });
  }

    return Time;
  };
  