import mysql from 'mysql2/promise';

console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASS:', process.env.DB_PASS);
console.log('DB_NAME:', process.env.DB_NAME);


// Crear el pool de conexiones
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0, // Sin límite de solicitudes en cola
});

// Probar la conexión al iniciar
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err.code); // Muestra el código del error
        console.error('Detalles del error:', err); // Muestra todo el objeto de error
        return;
    }

    console.log('Conexión a la base de datos exitosa');
    connection.release();
});


// Exportar el pool para su uso en otros archivos
export default pool;