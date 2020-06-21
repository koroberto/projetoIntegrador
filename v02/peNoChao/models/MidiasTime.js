module.exports = (sequelize, DataTypes) => {
    const MidiasTime = sequelize.define(
      "MidiasTime",
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
        times_id:
        {
          type: DataTypes.INTEGER,
          allowNull: false
        }},
        {
          timestamps: false,
          tableName: 'midias_times'
        },
    );

    MidiasTime.associate = (models) => {
        MidiasTime.belongsTo(models.Time, {
            foreignKey: "times_id",
        });
    };
  
    return MidiasTime;
};
