import { Injectable } from '@nestjs/common';
import { cornsilk } from 'color-name';

@Injectable()
export class CalculadoraService {

    async scanner(expressao: string) {

        //separando a expressa em caracteres 
        const caracteres = expressao.split('');

        const expressaoNumerosAgrupados: string[]=[];
        var j = 0;


        // verificando se é o primeiro caracter 
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
    
        return expressaoNumerosAgrupados; 

    }


    async lexer (array: string[]) {
        

        const token= { value: String, type: String};

        for (var i = 0; i < array.length; i++) {                            

            switch  ( array[i] )  {                                    

              case  '(' :  
                token [i] = {  value: "(" , type: "OP"}; 
                
              break ;      
              
              case  ')' :  
                token [i] = {  value: ")" , type: "Op"};  
              break ;     
              
              case  '{' :  
                token [i] = {  value: "{" , type: "Op"};  
              break ;      
              
              case  '}' :  
                token [i] = {  value: "}" , type: "Op"};  
              break ;    
              
              case  ',' :  
                token [i] = {  value: "," , type: "Op"};  
              break ;           
              
              case  '.' :  
                token [i] = {  value: "." , type: "Op"};  
              break ;             
              
              case  '-' :  
                token [i] = {  value: "-" , type: "Op"};  
              break ;           
              
              case  '+' :  
                token [i] = {  value: "+" , type: "Op"}; 
              break ;            
            
              case  '*' :  
                token [i] = { value: "*" , type: "Op"}; 
              break ;
              
              default:

                token[i] = { value: array[i] , type: "Num"}; 
                    
            }

        }      

        return token ;
    }

    async arvore(lexe : { value: StringConstructor, type: StringConstructor} ) {
       
      const resultado = lexe;
      
      return resultado;
    }


    //S -> A (+ | -) A | NUM
    //A -> B (* | /) B | NUM
    //B -> ( S ) | NUM

    async isNumber(str) {
        return !isNaN(str)
    }


}
