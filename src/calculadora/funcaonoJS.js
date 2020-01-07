const util = require('util');


let indice = 0;

function lexer(expressao) {

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
            case '/':
                tokens.push({ value: '/', type: 'Op' })
                i++;
                break;
            case ' ':
                i++;
                break;
            default:
                if (isNumber(caracteres[i])) {
                    let lookahead = 0;
                    let numero = '';

                    while (isNumber(caracteres[i + lookahead])) {
                        numero += caracteres[i + lookahead];

                        lookahead++;
                    }

                    tokens.push({ value: numero, type: "Num" });

                    i += lookahead;
                    break;
                }

                throw new Error('não reconhecido');
        }
    }

    return tokens;
}

function parse_b(lexe) {
    let token = lexe[indice];

    if (token.value === "(") {
        indice++;
        const s = parse_s(lexe);
        token = lexe[indice];
        if (token.value === ')') {
            indice++;
            return { s };
        }

        throw new Error('Leu ( mas não leu )');
    } else if (token.type === 'Num') {
        indice++;
        return { num: token };
    }
}

function parse_a(lexe) {
    const b = parse_b(lexe);

    const op = lexe[indice];

    if (op && (op.value === "*" || op.value === '/')) {
        indice++;
        const subs = parse_s(lexe);
        return { b, op, subs };
    }

    return { b };
}


function parse_s(lexe) {
    const a = parse_a(lexe);

    const op = lexe[indice];

    if (op && (op.value === "+" || op.value === '-')) {
        indice++;
        const subs = parse_s(lexe);
        return { a, op, subs };
    }

    return { a };
}


//S -> A (+ || -) S | A
//A -> B (* | /) S | B
//B -> ( S ) | NUM

function arvore(lexe) {

    let resultado = parse_s(lexe);

    return resultado;

}

function isNumber(str) {
    return /[0-9]/.test(str);
}

function interpreta_a(s) {
    return s.a;   
}

function interpreta_subs(s) {
    return s.subs;   
}

function interpreta_b(s){
     return s.subs.b;
}

function interpreta_s(s) {
    const valor_a = interpreta_a(s.a);

    if (s.op) {
        const valor_sub_s = interpreta_a(s.subs);

        switch (s.op.value) {
            case '+':
                return valor_a + valor_sub_s;
            case '-':
                return valor_a - valor_sub_s;
        }
    }

    return valor_a;
}

function main() {
    const tokens = lexer('2 + 3 * 2 - 1');

    const ar = arvore(tokens);

    console.log(util.inspect(ar, { showHidden: false, depth: null }));

    console.log(interpreta_s(ar));
}

main();