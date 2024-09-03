const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs'); // Importa bcryptjs para encriptar y comparar contraseñas

module.exports = (sequelize) => {
  // Define el modelo de Usuario
  const Usuario = sequelize.define('Usuario', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Genera un UUIDv4 por defecto
      primaryKey: true, // Establece el ID como clave primaria
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false, // El campo 'nombre' es obligatorio
    },
   googleID: {
      type: DataTypes.STRING,
      allowNull: true, // El campo 'nombre' es obligatorio
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false, // El campo 'apellido' es obligatorio
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false, // El campo 'email' es obligatorio
      unique: true, // El email debe ser único en la base de datos
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true, // El campo 'password' es obligatorio
    },
    imagen: { 
      type: DataTypes.STRING,
      allowNull: true, // El campo 'imagen' es opcional
    },
    rol: {
      type: DataTypes.ENUM('usuario', 'admin', "socio"),
      allowNull: false, // El campo 'rol' es obligatorio
      defaultValue: 'usuario', // Valor por defecto para 'rol'
    },
  }, {
    paranoid: true, // Habilita el borrado lógico (registro de eliminaciones)
    timestamps: true, // Deshabilita los timestamps (createdAt y updatedAt)
  });

  // Método para comparar la contraseña proporcionada con la almacenada en la base de datos
  Usuario.prototype.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  };

  // Hook para encriptar la contraseña antes de guardar el usuario en la base de datos
  Usuario.beforeCreate(async (usuario) => {
    if (usuario.password) {
      // Genera un salt para la encriptación
      const salt = await bcrypt.genSalt(10);
      // Encripta la contraseña antes de guardarla en la base de datos
      usuario.password = await bcrypt.hash(usuario.password, salt);
    }
  });

  return Usuario;
};
