const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 4000;

app.use(express.json());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'cadastros',
    password: 'ds564',
    port: 5432,
});


// Buscar todos os usuarios
app.get('/usuarios', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM usuarios');
        res.json({
            total: resultado.rowCount,
            usuarios: resultado.rows
        })
    } catch (error) {
        console.log('Erro ao obter todos os usuarios');
        res.status(500).send({ message: 'Erro ao obter todos os usuarios' });
    }
})


// Criar um novo usuario
app.post('/usuarios', async (req, res) => {


    // Função para calcular a idade do usuario
    const calcularIdade = () => {
        const idade = calcularIdade(req.body.datadenascimento);
        const datadehoje = new Date();
        const anoatual = datadehoje.getFullYear();
        const mesNasc = new Date(idade).getMonth();
        const mesatual = datadehoje.getMonth();
        const anoNasc = new Date(idade).getFullYear();
        if (mesNasc > mesatual) {
            return anoatual - anoNasc - 1;
        } else {
            return anoatual - anoNasc;
        }
    }

    // Função para calcular o signo do usuario
    const calcularSigno = () => {
        const signo = calcularSigno(req.body.datadenascimento);
        const data = new Date(signo);
        const mesNasc = new Date(datadenascimento).getMonth();
        const diaNasc = new Date(datadenascimento).getDate();


    }

    try {
        const { nome, sobrenome, datadenascimento, email } = req.body;

        await pool.query('INSERT INTO usuarios (nome, sobrenome, datadenascimento, email) VALUES ($1, $2, $3, $4)', [nome, sobrenome, datadenascimento, email, calcularIdade(), calcularSigno()]);
        res.status(201).send({ message: 'Sucesso ao criar usuario' });
    }
    catch (error) {
        console.log('Erro ao criar o usuario');
        res.status(500).send({ message: 'Erro ao criar usuario' });
    }
})


// Deletar um usuario
app.delete('/usuarios/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM usuarios WHERE id = $1', [id]);
        res.status(200).send({ message: 'Sucesso ao deletar o usuario' });
    } catch (error) {
        console.log('Erro ao deletar o usuario');
        res.status(500).send({ message: 'Erro ao deletar o usuario' });
    }
})


// Editar um usuario
app.put('/usuarios/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, sobrenome, datadenascimento, email, idade, signo } = req.body;
        await pool.query('UPDATE usuarios SET nome = $1, sobrenome = $2, datadenascimento = $3, email = $4', [nome, email, id]);
        res.status(200).send({ message: 'Sucesso ao atualizar o usuario' });
    } catch (error) {
        console.log('Erro ao editar o usuario');
        res.status(500).send({ message: 'Erro ao editar o usuario' });
    }
})

// Rota de teste
app.get('/', (req, res) => {
    res.send({ message: 'Servidor Funcionando!' });
});

// Iniciando o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});