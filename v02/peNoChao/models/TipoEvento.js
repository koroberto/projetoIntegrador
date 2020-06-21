module.exports = (sequelize, DataTypes) => {
    const TipoEvento = sequelize.define(
      "TipoEvento",
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
          allowNull: false
        }},
        {
          timestamps: false,
          tableName: 'tipo_evento'
        },
    );
    // TipoEvento.associate = (models) => {
    //     SeguTipoEventoidor.belongsTo(models.Jogador, {
    //         foreignKey: "jogador_id",
    //     });
    //     TipoEvento.belongsTo(models.Jogador, {
    //         foreignKey: "seguidor_id",
    //     });
    // };

    return TipoEvento;
  };
  