require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const PORT = process.env.SERVER_PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Configuração do banco de dados MySQL
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'projetocrud',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

console.log('📦 Conectando ao banco:', process.env.DB_NAME || 'projetocrud');

// ========== ROTAS CRUD ==========

// Rota de teste (health check)
app.get('/api/health', async (req, res) => {
    try {
        const [result] = await pool.query('SELECT 1 as status');
        res.json({ 
            status: 'ok', 
            database: 'connected',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({ 
            status: 'error', 
            message: error.message 
        });
    }
});

// CREATE - Criar um novo estudante
app.post('/api/students', async (req, res) => {
    try {
        const { id, name, email, course, registration } = req.body;
        
        const [result] = await pool.execute(
            'INSERT INTO students (id, name, email, course, registration) VALUES (?, ?, ?, ?, ?)',
            [id, name, email, course, registration]
        );
        
        res.status(201).json({ 
            success: true, 
            message: 'Estudante criado com sucesso',
            data: { id, name, email, course, registration }
        });
    } catch (error) {
        console.error('Erro:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            res.status(409).json({ 
                success: false, 
                message: 'ID ou email já cadastrado' 
            });
        } else {
            res.status(500).json({ 
                success: false, 
                message: 'Erro ao criar estudante',
                error: error.message 
            });
        }
    }
});

// READ - Listar todos os estudantes
app.get('/api/students', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM students ORDER BY created_at DESC');
        res.json({ success: true, data: rows });
    } catch (error) {
        console.error('Erro:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Erro ao listar estudantes' 
        });
    }
});

// READ - Buscar um estudante por ID
app.get('/api/students/:id', async (req, res) => {
    try {
        const [rows] = await pool.execute(
            'SELECT * FROM students WHERE id = ?',
            [req.params.id]
        );
        
        if (rows.length === 0) {
            return res.status(404).json({ 
                success: false, 
                message: 'Estudante não encontrado' 
            });
        }
        
        res.json({ success: true, data: rows[0] });
    } catch (error) {
        console.error('Erro:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Erro ao buscar estudante' 
        });
    }
});

// UPDATE - Atualizar um estudante
app.put('/api/students/:id', async (req, res) => {
    try {
        const { name, email, course, registration } = req.body;
        const [result] = await pool.execute(
            'UPDATE students SET name = ?, email = ?, course = ?, registration = ? WHERE id = ?',
            [name, email, course, registration, req.params.id]
        );
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ 
                success: false, 
                message: 'Estudante não encontrado' 
            });
        }
        
        res.json({ 
            success: true, 
            message: 'Estudante atualizado com sucesso' 
        });
    } catch (error) {
        console.error('Erro:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Erro ao atualizar estudante' 
        });
    }
});

// DELETE - Deletar um estudante
app.delete('/api/students/:id', async (req, res) => {
    try {
        const [result] = await pool.execute(
            'DELETE FROM students WHERE id = ?',
            [req.params.id]
        );
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ 
                success: false, 
                message: 'Estudante não encontrado' 
            });
        }
        
        res.json({ 
            success: true, 
            message: 'Estudante deletado com sucesso' 
        });
    } catch (error) {
        console.error('Erro:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Erro ao deletar estudante' 
        });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📡 API disponível em http://localhost:${PORT}/api/students`);
    console.log(`💚 Health check: http://localhost:${PORT}/api/health`);
});