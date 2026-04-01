require('dotenv').config();
const pool = require('./src/config/database');

async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Conexão com MySQL estabelecida!');
        console.log(`📊 Banco: ${process.env.DB_NAME}`);
        console.log(`🔌 Porta: ${process.env.DB_PORT}`);
        connection.release();
    } catch (error) {
        console.error('❌ Erro ao conectar:', error.message);
    }
}

testConnection();