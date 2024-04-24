API de Cadastros de Usuários
Esta é uma API simples para gerenciar cadastros de usuários. 
Ela permite buscar, criar, editar e deletar usuários em um banco de dados PostgreSQL.

Tecnologias Utilizadas
 - Node.js: Plataforma de execução de código JavaScript.
 - Express.js: Framework web para Node.js que facilita a criação de APIs.
 - PostgreSQL: Banco de dados relacional utilizado para armazenar os dados dos usuários.


A API possui as seguintes rotas:

GET /usuarios: Retorna todos os usuários cadastrados.
GET /usuarios/:id: Retorna um usuário específico com base no ID fornecido.
POST /usuarios: Cria um novo usuário com os dados fornecidos no corpo da requisição.
PUT /usuarios/:id: Atualiza os dados de um usuário existente com base no ID fornecido.
DELETE /usuarios/:id: Deleta um usuário existente com base no ID fornecido.
