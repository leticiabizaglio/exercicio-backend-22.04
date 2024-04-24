CREATE DATABASE cadastros;

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    sobrenome VARCHAR(100) NOT NULL,
    datadenascimento DATE NOT NULL,
    email VARCHAR(100) NOT NULL,
    idade INTEGER NOT NULL,
    signo VARCHAR(100) NOT NULL
)


INSERT INTO usuarios (nome, sobrenome, datadenascimento, email, idade, signo) VALUES ('Letícia', 'Bizaglio', '2007-01-25', 'leticia.bizaglio@aluno.senai.br', 17, 'Aquário');