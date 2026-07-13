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
  timestamp criado_em
  timestamp alterado_em
  timestamp excluido_em
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
}

PRODUTO||--o{DEPARTAMENTO:"pertence"
PRODUTO||--|{ESTOQUE:"contém"

_PRODUTO {}
_DEPARTAMENTO {}
_ESTOQUE {}

_PRODUTO||--o{_DEPARTAMENTO:"pertence"
_PRODUTO||--|{_ESTOQUE:"contém"
```

- Modelagem da
