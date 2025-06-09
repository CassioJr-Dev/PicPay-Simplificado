# PicPay Simplificado - Desafio Back-end

Este projeto é uma solução para o [desafio técnico de back-end do PicPay](https://github.com/PicPay/picpay-desafio-backend), implementando uma plataforma simplificada de pagamentos, onde é possível realizar depósitos e transferências entre usuários comuns e lojistas.

## 🔗 Link do Deploy

Acesse a documentação interativa (Swagger) e teste a API em produção:
[https://picpay-simplificado.onrender.com/api](https://picpay-simplificado.onrender.com/api)

---

## ✨ Descrição

O PicPay Simplificado permite:

- Cadastro de usuários comuns e lojistas (com CPF/CNPJ e e-mail únicos)
- Transferências entre usuários comuns e para lojistas
- Validação de saldo antes da transferência
- Consulta a serviço externo para autorização de transferências
- Notificação ao recebedor via serviço externo (mock)
- Operações RESTful, seguindo boas práticas de arquitetura e código limpo

---

## 🚀 Principais Tecnologias e Patterns

- **NestJS**: Framework principal para construção da API.
- **TypeScript**: Tipagem estática e robustez no desenvolvimento.
- **Prisma ORM**: Acesso e manipulação do banco de dados relacional.
- **Clean Architecture**: Para organizar a estrutura do sistema.
- **Princípios SOLID**: Para criar códigos de alta qualidade, flexíveis, fáceis de manter e testar.
- **CQRS (Command Query Responsibility Segregation)**: Separação clara entre comandos (escrita) e queries (leitura).
- **Domain-Driven Design (DDD)**: Estrutura de domínios, entidades, repositórios e casos de uso.
- **Eventos de Domínio**: Notificações e integrações desacopladas.
- **Bull + Redis**: Gerenciamento de filas para tarefas assíncronas que nesse caso são para fzer o envio da notificação em segundo plano.
- **Swagger**: Documentação da API.
- **Cluster no Node.js**: Usado para distribuir a carga de trabalho entre múltiplos processos (workers), aproveitando todos os núcleos de CPU disponíveis, e melhorar o desempenho e a escalabilidade da aplicação.

---

## 🛠️ Principais Funcionalidades

- **POST /transfer**
  Realiza uma transferência entre usuários, validando saldo, tipo de usuário e autorização externa.

- **POST /user**
  Realiza a criação de uma conta do usuário seja ela comum ou lojista.

- **Notificações**
  O recebedor é notificado via serviço externo mock após o sucesso da transferência.

- **Regras de negócio**
  - Lojistas só podem receber transferências.
  - Usuários comuns podem enviar e receber.
  - Saldo é validado antes da operação.
  - Toda transferência é transacional.

---

## 🏗️ Arquitetura

- **src/**
  - **users/**: Domínio de usuários, entidades, repositórios e casos de uso.
  - **transaction/**: Domínio de transações, comandos, eventos e integrações.
  - **shared/**: Utilitários, erros, contratos e infraestrutura comum.
  - **main.ts**: Bootstrap da aplicação.
  - **app.module.ts**: Módulo principal, integrações e injeção de dependências.

---

## 📚 Documentação

Acesse a documentação Swagger para explorar todos os endpoints e exemplos de uso:
[https://picpay-simplificado.onrender.com/api](https://picpay-simplificado.onrender.com/api)

---

## 👨‍💻 Autor

- Nome: _Cássio da Silva_
- LinkedIn: _(https://www.linkedin.com/in/c%C3%A1ssio-da-silva/)_

---

## 📝 Licença

Este projeto está sob a licença MIT.
