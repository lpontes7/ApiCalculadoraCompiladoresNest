import { Injectable } from '@nestjs/common';
import { PeekingIterator } from './index-class';

type Token = { value: string; type: string };

@Injectable()
export class CalculadoraService {
  lexer(expressao: string): Token[] {
    const caracteres = expressao.split('');

    //const token = { value: String, type: String };
    const tokens = [];

    for (let i = 0; i < caracteres.length; ) {
      switch (caracteres[i]) {
        case '(':
          tokens.push({ value: '(', type: 'OP' });
          i++;
          break;

        case ')':
          tokens.push({ value: ')', type: 'Op' });
          i++;
          break;

        case '{':
          tokens.push({ value: '{', type: 'Op' });
          i++;
          break;

        case '}':
          tokens.push({ value: '}', type: 'Op' });
          i++;
          break;

        case ',':
          tokens.push({ value: ',', type: 'Op' });
          i++;
          break;

        case '.':
          tokens.push({ value: '.', type: 'Op' });
          i++;
          break;

        case '-':
          tokens.push({ value: '-', type: 'Op' });
          i++;
          break;

        case '+':
          tokens.push({ value: '+', type: 'Op' });
          i++;
          break;

        case '*':
          tokens.push({ value: '*', type: 'Op' });
          i++;
          break;
        case '/':
          tokens.push({ value: '/', type: 'Op' });
          i++;
          break;
        case ' ':
          i++;
          break;
        default:
          if (this.isNumber(caracteres[i])) {
            let lookahead = 0;
            let numero = '';

            while (this.isNumber(caracteres[i + lookahead])) {
              numero += caracteres[i + lookahead];

              lookahead++;
            }

            tokens.push({ value: parseInt(numero), type: 'Num' });

            i += lookahead;
            break;
          }

          throw new Error('não reconhecido');
      }
    }

    return tokens;
  }

  //S -> A (+ || -) S | A
  //A -> B (* | /) S | B
  //B -> ( S ) | NUM

  arvore(lexe: Token[]) {
    const index = new PeekingIterator(lexe);

    let resultado = this.parse_s(index);

    return resultado;
  }

  resultado(arvore) {
    let resultado = this.interpreta_s(arvore);

    return resultado;
  }

  parse_s(it: PeekingIterator<Token>) {
    const a = this.parse_a(it);

    const op = it.peek(); //it[indice];

    if (!op.done && (op.element!.value === '+' || op.element!.value === '-')) {
      it.consume();
      const subs = this.parse_s(it);
      return { a, op, subs };
    }

    return { a };
  }

  parse_a(it: PeekingIterator<Token>) {
    const b = this.parse_b(it);

    const op = it.peek();

    if (!op.done && (op.element!.value === '*' || op.element!.value === '/')) {
      it.consume();
      const subs = this.parse_s(it);
      return { b, op, subs };
    }

    return { b };
  }

  parse_b(it: PeekingIterator<Token>) {
    let token = it.peek();

    if (token.element!.value === '(') {
      it.consume();
      const s = this.parse_s(it);

      token = it.peek();

      if (token.element.value === ')') {
        it.consume();
        return { s };
      }

      throw new Error('Leu "(" mas não leu ")"');
    } else if (token.element!.type === 'Num') {
      it.consume();
      return { num: token.element! };
    }
  }

  interpreta_s(s) {
    const valor_a = this.interpreta_a(s.a);

    if (s.op) {
      const valor_sub_s = this.interpreta_s(s.subs);

      switch (s.op.element.value) {
        case '+':
          return valor_a + valor_sub_s;
        case '-':
          return valor_a - valor_sub_s;
      }
    }

    return valor_a;
  }

  interpreta_a(a) {
    const valor_b = this.interpreta_b(a.b);

    if (a.op) {
      const valor_sub_b = this.interpreta_s(a.subs);

      switch (a.op.element.value) {
        case '/':
          return valor_b / valor_sub_b;
        case '*':
          return valor_b * valor_sub_b;
      }
    }

    return valor_b;
  }

  interpreta_b(b) {
    if (b.num) {
      return b.num.value;
    } else {
      return this.interpreta_s(b.s);
    }
  }

  isNumber(str) {
    return /[0-9]/.test(str);
  }
}
