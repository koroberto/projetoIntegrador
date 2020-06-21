module.exports = (sequelize, DataTypes) => {
    const Comentario = sequelize.define(
      "Comentario",
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
        postagens_id:
        {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        create_at: DataTypes.DATE,
        update_at: DataTypes.DATE,
        },
        {
          timestamps: false,
          tableName: 'comentarios'
        },
    );

    Comentario.associate = (models) => {
        Comentario.belongsTo(models.Postagem, {
            foreignKey: "postagens_id",
        });
        Comentario.belongsTo(models.Jogador, {
            foreignKey: "jogadores_id",
        });
    };
  
    return Comentario;
};
