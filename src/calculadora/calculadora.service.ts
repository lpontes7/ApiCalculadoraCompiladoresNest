import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculadoraService {

  async lexer(expressao: string) {

    const caracteres = expressao.split('');

    const token = { value: String, type: String };
    var j = 0;
    var numero = null;

    for (var i = 0; i < caracteres.length; i++) {

      switch (caracteres[i]) {

        case '(':
          j++
          token[j] = { value: "(", type: "OP" };
          j++;
          numero = null;
          break;

        case ')':
          j++
          token[j] = { value: ")", type: "Op" };
          j++;
          numero = null;
          break;

        case '{':
          j++
          token[j] = { value: "{", type: "Op" };
          j++;
          numero = null;
          break;

        case '}':
          j++
          token[j] = { value: "}", type: "Op" };
          j++;
          numero = null;
          break;

        case ',':
          j++
          token[j] = { value: ",", type: "Op" };
          j++;
          numero = null;
          break;

        case '.':
          j++
          token[j] = { value: ".", type: "Op" };
          j++;
          numero = null;
          break;

        case '-':
          j++
          token[j] = { value: "-", type: "Op" };
          j++;
          numero = null;
          break;

        case '+':
          j++
          token[j] = { value: "+", type: "Op" };
          j++;
          numero = null;
          break;

        case '*':
          j++
          token[j] = { value: "*", type: "Op" };
          j++;
          numero = null;
          break;


        default:


          if (this.isNumber(caracteres[i])) {

            if (numero == null) {
              numero = caracteres[i];
            } else {
              numero += caracteres[i]
            }
          }

          token[j] = { value: numero, type: "Num" };
      }
    }

    return token;
  }

  async arvore(lexe: { value: StringConstructor, type: StringConstructor }) {


    //S -> A (+ || -) A | NUM
    //A -> B (* | /) B | NUM
    //B -> ( S ) | NUM


    return lexe;

  }

  async isNumber(str) {
    return !isNaN(str)
  }


}
