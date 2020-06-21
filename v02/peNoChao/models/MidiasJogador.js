module.exports = (sequelize, DataTypes) => {
    const MidiasJogador = sequelize.define(
      "MidiasJogador",
      {
        id:
        {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
          unique: true
        },
        timestamp:
        {
          type: DataTypes.DATE,
          allowNull: false
        },
        tipo: DataTypes.STRING,
        path: DataTypes.STRING,
        jogadores_id:
        {
          type: DataTypes.INTEGER,
          allowNull: false
        }},
        {
          timestamps: false,
          tableName: 'midias_jogadores'
        },
    );

    MidiasJogador.associate = (models) => {
        MidiasJogador.belongsTo(models.Jogador, {
            foreignKey: "jogadores_id",
        });
    };
  
    return MidiasJogador;
};
