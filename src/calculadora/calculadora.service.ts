import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculadoraService {

    async scanner(expressao: string) {

        //separando a expressa em caracteres 
        const caracteres = expressao.split('');

        const expressaoNumerosAgrupados: string[]=[];
        var j = 0;


        // verificando para o primeiro caracter 
        var checar0 = await this.isNumber(caracteres[0]); 
        
        if(checar0===true){
            expressaoNumerosAgrupados[0]=caracteres[0];
        
        }else{ (checar0===false)        
            expressaoNumerosAgrupados[0]=caracteres[0];
            j++;
        }    

        //entrando no for para o restante:
        for (var i = 1; i < caracteres.length; i++) {

            var checar = await this.isNumber(caracteres[i]);

            if (checar === true){
                if (expressaoNumerosAgrupados[j] == null || expressaoNumerosAgrupados[j] == undefined ){
                    expressaoNumerosAgrupados[j]= caracteres[i];     
                }else{
                    expressaoNumerosAgrupados[j]+= caracteres[i];
                }
            
            } else{ (checar === false) 
                if (expressaoNumerosAgrupados[j] == null || expressaoNumerosAgrupados[j] == undefined ){
                    expressaoNumerosAgrupados[j]= caracteres[i];
                    j++
                }else{
                    j++
                    expressaoNumerosAgrupados[j]= caracteres[i];     
                    j++;
                }    
            }
        }
    
        return {expressaoNumerosAgrupados}; 

    }


    async lexer (aray: string[]) {
        return;
    }

    async arvore(expressao: string) {
        return ;
    }


    async isNumber(str) {
        return !isNaN(str)
    }


}
