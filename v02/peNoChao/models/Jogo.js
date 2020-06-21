module.exports = (sequelize, DataTypes) => {
    const Jogo = sequelize.define(
      "Jogo",
      {
        id:
        {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
          unique: true
        },
        time1_id:
        {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        time2_id:
        {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        data:
        {  
          type: DataTypes.INTEGER,
          allowNull: false
        }},
        {
          timestamps: false,
          tableName: 'jogos'
        },
    );

    Jogo.associate = (models) => {
        Jogo.belongsTo(models.Time, {
            foreignKey: "id",
        });
        Jogo.hasMany(models.Evento, {
            foreignKey: "id",
        });
        Jogo.hasMany(models.Jogador, {
          foreignKey: "id",
      });
    };
  
    return Jogo;
};
