# Projeto de Portifólio - PDV

Este projeto é um sistema de ponto de venda (PDV) desenvolvido como parte do meu portfólio. O objetivo é demonstrar minhas habilidades em desenvolvimento de backend, docker, mensageria, testes unitários e microserviços.

Eu escolhi utilizar um único repositório para facilitar o desenvolvimento e a manutenção do projeto, e um ponto que eu queria muito estudar: o compartilhamento de código entre diferentes microserviços, o chamado `shared kernel`. Sempre tive um grande interesse em aprender a criar código reaproveitável e aqui coloquei isso em prática e no meio do caminho acabei descobrindo algo interessante, os "workspaces".

Buscando consolidar meu aprendizado em criar código reaproveitável, utilizei não só os workspaces, mas também usei o GitHub Packages para publicar e consumir pacotes privados, o que me permitiu estudar também o versionamento de pacotes e a gestão de dependências.

## Arquitetura do Projeto

Este projeto é estruturado como um monorepo dividido em microserviços, cada um com sua própria responsabilidade e com banco de dados isolado. Dentro de cada microserviço, apliquei arquitetura hexagonal, separando claramente as camadas de domínio, aplicação e infraestrutura, além de aplicar também conceitos de Domain Driven Design.

## Gerenciamento de Pacotes e Dependências

Escolhi utilizar o pnpm para o gerenciamento de pacotes e dependências do projeto. Durante o desenvolvimento, percebi que o pnpm poderia agregar valor em nosso projeto, trazendo — além de mais aprendizado — melhor performance e consistência na resolução de dependências.

Para iniciar o projeto, é necessário instalar as dependências utilizando o comando `pnpm install` na raiz do repositório. Isso garantirá que todas as dependências necessárias para o funcionamento do projeto sejam instaladas corretamente.

A versão mínima do pnpm é a `pnpm@11.21.0`.

No arquivo `pnpm-workspace.yaml`, localizado na raiz do repositório, estão listados os workspaces do projeto, que incluem os microserviços e os pacotes compartilhados. O arquivo `package.json` na raiz do repositório contém os scripts necessários para iniciar e gerenciar o projeto, como:

- `build` para compilar os microserviços;
- `dev-estoque` para iniciar o microserviço de estoque em modo de desenvolvimento;
- `dev-pdv` para iniciar o microserviço de PDV em modo de desenvolvimento;
- `test` para executar os testes unitários.
- `test-integration` para executar os testes de integração.
