const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors()); // Permite que o React acesse este servidor
app.use(express.json()); // Permite receber JSON no corpo das requisições

// Caminho para o arquivo de persistência
const DATA_FILE = path.join(__dirname, 'database', 'students.json');

// Garante que a pasta e o arquivo existam
if (!fs.existsSync(path.dirname(DATA_FILE))) {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    fs.writeFileSync(DATA_FILE, '[]');
}

// --- Helper Functions (Funções Auxiliares) ---

// Ler dados do arquivo JSON
const readData = () => {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading file:", error);
        return [];
    }
};

// Escrever dados no arquivo JSON
const writeData = (data) => {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        console.error("Error writing file:", error);
        return false;
    }
};

// --- Routes (Rotas) ---

// GET: Listar todos os alunos
app.get('/students', (req, res) => {
    const students = readData();
    res.json(students);
});

// POST: Criar um novo aluno
app.post('/students', (req, res) => {
    const students = readData();
    const newStudent = {
        id: Date.now().toString(), // ID simples baseado em timestamp
        name: req.body.name,
        email: req.body.email,
        course: req.body.course,
        registration: req.body.registration // Matrícula
    };

    students.push(newStudent);
    writeData(students);
    
    res.status(201).json(newStudent);
});

// PUT: Atualizar um aluno
app.put('/students/:id', (req, res) => {
    const { id } = req.params;
    const students = readData();
    const index = students.findIndex(student => student.id === id);

    if (index !== -1) {
        // Atualiza apenas os campos enviados
        students[index] = { ...students[index], ...req.body };
        writeData(students);
        res.json(students[index]);
    } else {
        res.status(404).json({ message: "Student not found" });
    }
});

// DELETE: Remover um aluno
app.delete('/students/:id', (req, res) => {
    const { id } = req.params;
    let students = readData();
    const initialLength = students.length;

    // Filtra removendo o ID solicitado
    students = students.filter(student => student.id !== id);

    if (students.length < initialLength) {
        writeData(students);
        res.status(204).send(); // 204 = No Content
    } else {
        res.status(404).json({ message: "Student not found" });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
