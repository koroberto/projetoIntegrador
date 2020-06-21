module.exports = (sequelize, DataTypes) => {
    const Evento = sequelize.define(
      "Evento",
      {
        id:
        {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
          unique: true
        },
        jogo_id:
        {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        jogador_id:
        {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        cronometro:
        {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        tipo_evento_id:
        {
          type: DataTypes.INTEGER,
          allowNull: false,
        }},
        {
          timestamps: false,
          tableName: 'eventos'
        },
    );
    Evento.associate = (models) => {
        Evento.hasMany(models.Jogador, {
            foreignKey: "id",
        });
        Evento.belongsTo(models.Jogo, {
            foreignKey: "id",
        });
        Evento.hasMany(models.TipoEvento, {
            foreignKey: "id",
        });
    };

    return Evento;
  };
  