module.exports = (sequelize, DataTypes) => {
    const Curtida = sequelize.define(
      "Curtida",
      {
        id:
        {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
          unique: true
        },
        jogadores_id:
        {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        postagens_id:
        {
          type: DataTypes.INTEGER,
          allowNull: false
        }},
        {
          timestamps: false,
          tableName: 'curtidas'
        },
    );

    Curtida.associate = (models) => {
        Curtida.belongsTo(models.Postagem, {
            foreignKey: "postagens_id",
        });
        Curtida.belongsTo(models.Jogador, {
            foreignKey: "jogadores_id",
        });
    };
  
    return Curtida;
};
