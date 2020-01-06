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

  b() {

  }

  a() {

  }
  
  s(lexe: Array<{ value: string, type: string }>) {
    const a = this.a();

    const op = lexe[this.indice];

    if (op.value === "+" || op.value === '-') {
      this.indice++;
      const subs = this.s(lexe);
      return { a, op, subs };
    }

    return { a };
  }

  indice = 0;

  arvore(lexe: Array<{ value: string, type: string }>) {

    //S -> A (+ || -) S | A
    //A -> B (* | /) A | B
    //B -> ( S ) | NUM

    return lexe;

  }

  isNumber(str) {
    return !isNaN(str)
  }


}
