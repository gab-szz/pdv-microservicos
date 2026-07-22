/**
 * Classe base para erros de regra de negócio (domínio).
 *
 * Todos os erros relacionados às regras da aplicação devem herdar desta classe.
 *
 * Exemplo:
 *  - ErroValidacao
 *  - ErroEntidadeNaoEncontrada
 *  - ErroDuplicidade
 */
export class ErroRegraNegocio extends Error {
  constructor(message: string) {
    // Inicializa a classe Error com a mensagem informada.
    super(message);

    // Define o nome do erro para facilitar logs e depuração.
    this.name = 'ErroRegraNegocio';

    // Mantém a stack iniciando no ponto onde o erro foi lançado (Node.js/V8).
    Error.captureStackTrace?.(this, ErroRegraNegocio);
  }
}

/** 
Depois, quando precisar de erros mais específicos, basta herdar dessa classe:

export class ErroValidacao extends ErroRegraNegocio {
  constructor(message: string) {
    super(message);
    this.name = 'ErroValidacao';
  }
}
*/
