import { Decimal } from 'decimal.js';
import { ErroRegraNegocio } from '../../../error/custom/regra-negocio.error.js';

export class Preco {
  private constructor(private readonly valor: Decimal) {}

  static criar(valor: number | string): Preco {
    return new Preco(this.converterParaDecimalValido(valor));
  }

  toString(): string {
    return this.valor.toString();
  }

  somar(outro: Preco): Preco {
    return Preco.criarDeDecimal(this.valor.add(outro.valor));
  }

  subtrair(outro: Preco): Preco {
    return Preco.criarDeDecimal(this.valor.minus(outro.valor));
  }

  multiplicar(quantidade: number): Preco {
    return Preco.criarDeDecimal(this.valor.mul(quantidade));
  }

  igual(outro: Preco): boolean {
    return this.valor.equals(outro.valor);
  }

  maiorQue(outro: Preco): boolean {
    return this.valor.greaterThan(outro.valor);
  }

  menorQue(outro: Preco): boolean {
    return this.valor.lessThan(outro.valor);
  }

  maiorOuIgual(outro: Preco): boolean {
    return this.valor.greaterThanOrEqualTo(outro.valor);
  }

  menorOuIgual(outro: Preco): boolean {
    return this.valor.lessThanOrEqualTo(outro.valor);
  }

  /**
   * Cria um novo Preço a partir de uma instânca da classe Decimal
   */
  private static criarDeDecimal(valor: Decimal): Preco {
    this.validarSePrecoEhMaiorQueZero(valor);
    return new Preco(valor);
  }

  /**
   * Converte um valor em number ou string para um decimal
   * Valida as regras de negócio para criar um preço válido
   */
  private static converterParaDecimalValido(valor: number | string): Decimal {
    try {
      const valorNumerico = new Decimal(valor);

      this.validarSePrecoEhMaiorQueZero(valorNumerico);

      return valorNumerico;
    } catch (erro) {
      if (erro instanceof ErroRegraNegocio) {
        throw erro;
      }

      throw new ErroRegraNegocio('Preço inválido');
    }
  }

  private static validarSePrecoEhMaiorQueZero(valor: Decimal): void {
    if (valor.lessThanOrEqualTo(0)) {
      throw new ErroRegraNegocio(
        'O valor informado para criação de Preço não pode ser igual ou menor do que zero',
      );
    }
  }
}
