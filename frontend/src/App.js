import React, { useState, useEffect } from 'react';
import './App.css';

const API_URL = 'http://localhost:3001/students';

function App() {
  // State variables (Variáveis de estado)
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', course: '', registration: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // Load students on component mount (Carregar alunos ao iniciar)
  useEffect(() => {
    fetchStudents();
  }, []);

  // Function to fetch data (Buscar dados da API)
  const fetchStudents = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  // Handle input changes (Gerenciar mudanças no formulário)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Handle form submission (Gerenciar envio do formulário)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        // Update existing student (Atualizar aluno existente)
        await fetch(`${API_URL}/${currentId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
      } else {
        // Create new student (Criar novo aluno)
        await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
      }
      
      // Reset form and reload list
      setForm({ name: '', email: '', course: '', registration: '' });
      setIsEditing(false);
      setCurrentId(null);
      fetchStudents();
      
    } catch (error) {
      console.error("Error saving student:", error);
    }
  };

  // Handle delete action (Gerenciar exclusão)
  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja remover este aluno?")) {
      try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        fetchStudents();
      } catch (error) {
        console.error("Error deleting student:", error);
      }
    }
  };

  // Prepare form for editing (Prepara formulário para edição)
  const handleEdit = (student) => {
    setForm(student);
    setIsEditing(true);
    setCurrentId(student.id);
  };

  return (
    <div className="App">
      <header>
        <h1>Frequentar</h1>
        <p>Sistema de Gestão Acadêmica - Protótipo</p>
      </header>

      <div className="container">
        
        {/* Form Section */}
        <div className="form-card">
          <h2>{isEditing ? 'Editar Aluno' : 'Cadastrar Aluno'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nome Completo:</label>
              <input 
                type="text" name="name" 
                value={form.name} onChange={handleChange} required 
              />
            </div>
            <div className="form-group">
              <label>Matrícula:</label>
              <input 
                type="text" name="registration" 
                value={form.registration} onChange={handleChange} required 
              />
            </div>
            <div className="form-group">
              <label>E-mail:</label>
              <input 
                type="email" name="email" 
                value={form.email} onChange={handleChange} required 
              />
            </div>
            <div className="form-group">
              <label>Curso:</label>
              <input 
                type="text" name="course" 
                value={form.course} onChange={handleChange} required 
              />
            </div>
            
            <button type="submit" className="btn btn-primary">
              {isEditing ? 'Atualizar' : 'Salvar'}
            </button>
            
            {isEditing && (
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={() => {
                  setIsEditing(false);
                  setForm({ name: '', email: '', course: '', registration: '' });
                }}
              >
                Cancelar
              </button>
            )}
          </form>
        </div>

        {/* List Section */}
        <h2>Lista de Alunos</h2>
        {students.length === 0 ? (
          <p>Nenhum aluno cadastrado.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Matrícula</th>
                <th>Curso</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.registration}</td>
                  <td>{student.course}</td>
                  <td>
                    <button 
                      className="btn btn-edit" 
                      onClick={() => handleEdit(student)}
                    >
                      Editar
                    </button>
                    <button 
                      className="btn btn-delete" 
                      onClick={() => handleDelete(student.id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;
