module.exports = (sequelize, DataTypes) => {
    const Jogador = sequelize.define(
      "Jogador",
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
        dataNascimento:
        {
          type: DataTypes.DATE,
          allowNull: false
        },
        sexo:
        {
          type: DataTypes.STRING,
          allowNull: false
        },
        estado:
        {
          type: DataTypes.STRING,
          allowNull: false
        },
        cidade:
        {
          type: DataTypes.STRING,
          allowNull: false
        },
        bairro:
        {
          type: DataTypes.STRING,
          allowNull: false
        },
        cep: {
          type: DataTypes.STRING,
          allowNull: false
        },
        telefone: {
          type: DataTypes.STRING,
          allowNull: false
        },
        posicaoJogador:
        {
          type: DataTypes.STRING,
          allowNull: false
        },
        email:
        {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        password:
        {
          type: DataTypes.STRING,
          allowNull: false
        },
        passwordResetToken:
        {
          type: DataTypes.STRING,
          allowNull: true
        },
        passwordResetExpires:
        {
          type: DataTypes.STRING,
          allowNull: false
        },
        photo_id:
        {
          type: DataTypes.INTEGER,
          allowNull: true,
        }},
        {
          timestamps: false,
          tableName: 'jogadores'
        },
    );
  
    return Jogador;
  };
  