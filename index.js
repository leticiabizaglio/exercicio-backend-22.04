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
    port: 7007,
});

// Função para calcular a idade do usuario
const calcularIdade = (datadenascimento) => {
    const datadehoje = new Date();
    const anoatual = datadehoje.getFullYear();
    const mesNasc = datadenascimento.getMonth();
    const mesatual = datadehoje.getMonth();
    const anoNasc = datadenascimento.getFullYear();
    if (mesNasc > mesatual || (mesNasc === mesatual && datadenascimento.getDate() > datadehoje.getDate())) {
        return anoatual - anoNasc - 1;
    } else {
        return anoatual - anoNasc;
    }
}

// Função para calcular o signo do usuario
const calcularSigno = (datadenascimento) => {
    const mesNasc = datadenascimento.getMonth() + 1;
    const diaNasc = datadenascimento.getDate();

    if ((mesNasc === 1 && diaNasc >= 20) || (mesNasc === 2 && diaNasc <= 18)) {
        return "Aquário";
    } else if ((mesNasc === 2 && diaNasc <= 18) || (mesNasc === 3 && diaNasc <= 20)) {
        return "Peixes";
    } else if ((mesNasc === 3 && diaNasc <= 20) || (mesNasc === 4 && diaNasc <= 19)) {
        return "Áries";
    } else if ((mesNasc === 4 && diaNasc <= 19) || (mesNasc === 5 && diaNasc <= 20)) {
        return "Touro";
    } else if ((mesNasc === 5 && diaNasc <= 20) || (mesNasc === 6 && diaNasc <= 20)) {
        return "Gêmeos";
    } else if ((mesNasc === 6 && diaNasc <= 20) || (mesNasc === 7 && diaNasc <= 22)) {
        return "Câncer";
    } else if ((mesNasc === 7 && diaNasc <= 22) || (mesNasc === 8 && diaNasc <= 22)) {
        return "Leão";
    } else if ((mesNasc === 8 && diaNasc <= 22) || (mesNasc === 9 && diaNasc <= 22)) {
        return "Virgem";
    } else if ((mesNasc === 9 && diaNasc <= 22) || (mesNasc === 10 && diaNasc <= 22)) {
        return "Libra";
    } else if ((mesNasc === 10 && diaNasc <= 22) || (mesNasc === 11 && diaNasc <= 21)) {
        return "Escorpião";
    } else if ((mesNasc === 11 && diaNasc <= 21) || (mesNasc === 12 && diaNasc <= 21)) {
        return "Sargitário";
    } else if ((mesNasc === 12 && diaNasc <= 21) || (mesNasc === 1 && diaNasc <= 19)) {
        return "Capricórnio";
    }
}

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
        res.status(500).send({ message: 'Erro ao obter todos os usuários' });
    }
})


// Buscar um usuario especifico
app.get('/usuarios/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);

        if (resultado.rowCount === 0) {
            res.status(404).send({ message: 'Usuário não foi encontrado' });
        } else {
            res.status(200).send({ message: 'Sucesso ao obter esse usuário' });
        }
    } catch (error) {
        console.log('Erro ao obter esse usuário');
        res.status(500).send({ message: 'Erro ao obter esse usuário' });
    }
})

// Criar um novo usuario
app.post('/usuarios', async (req, res) => {
    try {
        const { nome, sobrenome, datadenascimento, email } = req.body;

        const dataNascimento = new Date(datadenascimento);
        const idade = calcularIdade(dataNascimento);
        const signo = calcularSigno(dataNascimento);

        await pool.query('INSERT INTO usuarios (nome, sobrenome, datadenascimento, email, idade, signo) VALUES ($1, $2, $3, $4, $5, $6)', [nome, sobrenome, datadenascimento, email, idade, signo]);
        res.status(201).send({ message: 'Sucesso ao criar usuário' });
    }
    catch (error) {
        console.log('Erro ao criar o usuário');
        res.status(500).send({ message: 'Erro ao criar usuário' });
    }
})

// Deletar um usuario
app.delete('/usuarios/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM usuarios WHERE id = $1', [id]);
        res.status(200).send({ message: 'Sucesso ao deletar o usuário' });
    } catch (error) {
        console.log('Erro ao deletar o usuário');
        res.status(500).send({ message: 'Erro ao deletar o usuário' });
    }
})

// Editar um usuario
app.put('/usuarios/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, sobrenome, datadenascimento, email } = req.body;

        const dataNascimento = new Date(datadenascimento);
        const idade = calcularIdade(dataNascimento);
        const signo = calcularSigno(dataNascimento);

        await pool.query('UPDATE usuarios SET nome = $1, sobrenome = $2, datadenascimento = $3, email = $4, idade = $5, signo = $6 WHERE id = $7', [nome, sobrenome, datadenascimento, email, idade, signo, id]);
        res.status(200).send({ message: 'Sucesso ao atualizar o usuário' });
    } catch (error) {
        console.log('Erro ao editar o usuário');
        res.status(500).send({ message: 'Erro ao editar o usuário' });
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
