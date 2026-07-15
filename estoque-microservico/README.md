# Microserviço de Estoque

## Introdução

Este presente microserviço tem por objetivo o gerenciamento de produtos e estoque. Com um banco próprio e rotas.

## Arquitetura

### Modelagem do Banco de Dados

- **Diagrama Entidade Relacionamento**

```mermaid
erDiagram
direction TB

PRODUTO {
  int id ""
  string nome ""
  text descricao ""
  string codigo_barras ""
  string sku ""
  decimal preco_custo ""
  decimal preco_venda ""
  boolean ativo ""
  int departamento_id ""
  timestamp criado_em ""
  timestamp alterado_em ""
  timestamp excluido_em ""
}

DEPARTAMENTO {
  int id ""
  varchar nome
  text descricao
  timestamp criado_em
  timestamp alterado_em
  timestamp excluido_em
}

ESTOQUE {
  int id ""
  int produto_id ""
  decimal quantidade ""
  decimal estoque_minimo ""
  decimal estoque_maximo ""
}

MOVIMENTADAO_ESTOQUE {
  int id ""
  int produto_id ""
  int quantidade ""
  int tipo_movimentacao ""
  timestamp criado_em ""
  timestamp alterado_em ""
  timestamp excluido_em ""
}

TIPO_MOVIMENTACAO {
  int id ""
  varchar nome
  text descricao
  timestamp criado_em
  timestamp alterado_em
  timestamp excluido_em ""
}

PRODUTO||--o{DEPARTAMENTO:"pertence"
PRODUTO||--|{ESTOQUE:"contém"
PRODUTO||--o{MOVIMENTADAO_ESTOQUE:"possui"
MOVIMENTADAO_ESTOQUE||--o{TIPO_MOVIMENTACAO:"e"

_PRODUTO {}
_DEPARTAMENTO {}
_ESTOQUE {}
_MOVIMENTADAO_ESTOQUE {}

_PRODUTO||--o{_DEPARTAMENTO:"pertence"
_PRODUTO||--|{_ESTOQUE:"contém"
_PRODUTO||--o{_MOVIMENTADAO_ESTOQUE:"possui"
_MOVIMENTADAO_ESTOQUE||--o{_TIPO_MOVIMENTACAO:"e"

```

Fluxo de cadastro de produto

### TODO: Fluxo de Cadastro de Produto

- Recebimento da requisição
- Validação
- Regras de negócio
- Persistência
- Publicação de evento
- Resposta da API
  Fluxo de movimentação de estoque

### TODO: Fluxo de Movimentação de Estoque

- Entrada
- Saída
- Ajuste
- Atualização do estoque
- Registro da movimentação
  Estrutura do projeto

### TODO: Estrutura de Pastas

Explicar o papel de:

- modules
- domain
- application
- infra
- shared
  Tratamento de erros

### TODO: Error Handler

Documentar:

- Erros de domínio
- Erros do banco
- Erros do Drizzle
- Erros HTTP
  Eventos

### TODO: Eventos publicados

ProdutoCriado

ProdutoAtualizado

EstoqueAtualizado

MovimentacaoRegistrada
Integração com Redis

### TODO: Redis

- Cache
- Pub/Sub
- Filas
  AI SDK

### TODO: Inteligência Artificial

Explicar:

- Onde a IA é utilizada
- Objetivo
- Ferramentas
- Prompts
  Testes

### TODO: Testes

- Unitários
- Integração
- End-to-End

## Roadmap

- [x] CRUD de departamentos
- [ ] CRUD de produtos
- [ ] Movimentação de estoque
- [ ] Publicação de eventos no Redis
- [ ] Consumo de eventos
- [ ] Cache de produtos
- [ ] Autenticação entre microserviços
- [ ] Observabilidade (logs e métricas)
- [ ] IA para classificação de produtos
- [ ] Testes de integração
- [ ] Docker Compose completo
