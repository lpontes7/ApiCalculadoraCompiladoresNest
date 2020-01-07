import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculadoraService {

  lexer(expressao: string) {

    const caracteres = expressao.split('');

    //const token = { value: String, type: String };
    const tokens = [];

    for (let i = 0; i < caracteres.length;) {
      switch (caracteres[i]) {
        case '(':
          tokens.push({ value: "(", type: "OP" });
          i++;
          break;

        case ')':
          tokens.push({ value: ")", type: "Op" });
          i++;
          break;

        case '{':
          tokens.push({ value: "{", type: "Op" });
          i++;
          break;

        case '}':
          tokens.push({ value: "}", type: "Op" });
          i++;
          break;

        case ',':
          tokens.push({ value: ",", type: "Op" });
          i++;
          break;

        case '.':
          tokens.push({ value: ".", type: "Op" });
          i++;
          break;

        case '-':
          tokens.push({ value: "-", type: "Op" });
          i++;
          break;

        case '+':
          tokens.push({ value: "+", type: "Op" });
          i++;
          break;

        case '*':
          tokens.push({ value: "*", type: "Op" });
          i++;
          break;

        default:
          let lookahead = 0;
          let numero = '';

          while (this.isNumber(caracteres[i + lookahead])) {
            numero += caracteres[i + lookahead];

            lookahead++;
          }

          tokens.push({ value: numero, type: "Num" });

          i += lookahead;
      }
    }

    return tokens;
  }

  b(lexe: Array<{ value: string, type: string }>) {
    const s = this.s(lexe);

    const op = lexe[this.indice];

     
    if (op.type === "(" || op.type === ")"  ) {
      this.indice++;
      return { s };
    }

    return { op };

  }

  a(lexe: Array<{ value: string, type: string }>) {
    const b = this.b(lexe);

    const op = lexe[this.indice];

    if (op.value === "*" || op.value === '/') {
      this.indice++;
      const subs = this.a(lexe);
      return { b, op, subs };
    }

    return {b};
  }


  s(lexe: Array<{ value: string, type: string }>) {
    const a = this.a(lexe);

    const op = lexe[this.indice];

    if (op.value === "+" || op.value === '-') {
      this.indice++;
      const subs = this.s(lexe);
      return { a, op, subs };
    }

    return { a };
  }

  indice = 0;

    //S -> A (+ || -) S | A
    //A -> B (* | /) A | B
    //B -> ( S ) | NUM

  arvore(lexe: Array<{ value: string, type: string }>) {

    let resultado = this.s(lexe);

    return resultado ;

  }

  isNumber(str) {
    return !isNaN(str)
  }


}
