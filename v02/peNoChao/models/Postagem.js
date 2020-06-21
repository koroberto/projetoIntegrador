module.exports = (sequelize, DataTypes) => {
    const Postagem = sequelize.define(
      "Postagem",
      {
        id:
        {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
          unique: true
        },
        descricao:
        {
          type: DataTypes.STRING,
        //   allowNull: false
        },
        jogadores_id:
        {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        create_at: DataTypes.DATE,
        update_at: DataTypes.DATE,
        path:
        {
            type: DataTypes.STRING,
            allowNull: false,
        }},
        {
          timestamps: false,
          tableName: 'postagens'
        },
    );

    Postagem.associate = (models) => {
      Postagem.belongsTo(models.Jogador, {
        foreignKey: "jogadores_id",
      });
      Postagem.hasMany(models.Comentario, {
        foreignKey: "postagens_id",
      });
      Postagem.hasMany(models.Curtida, {
        foreignKey: "postagens_id",
      });
    };
  
    return Postagem;
};
