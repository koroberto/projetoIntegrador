module.exports = (sequelize, DataTypes) => {
    const Seguidor = sequelize.define(
      "Seguidor",
      {
        id:
        {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
          unique: true
        },
        jogador_id:
        {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        seguidor_id:
        {
          type: DataTypes.INTEGER,
          allowNull: false
        }},
        {
          timestamps: false,
          tableName: 'seguidores'
        },
    );
    Seguidor.associate = (models) => {
        Seguidor.belongsTo(models.Jogador, {
            foreignKey: "jogador_id",
        });
        Seguidor.belongsTo(models.Jogador, {
            foreignKey: "seguidor_id",
        });
    };

    return Seguidor;
  };
  