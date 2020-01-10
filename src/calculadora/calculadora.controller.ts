import { Controller, Post, Body } from '@nestjs/common';
import {InsertCalculadora} from '../calculadora/insert.interface'
import { CalculadoraService } from './calculadora.service';

@Controller('calculadora')
export class CalculadoraController {

    constructor(private calculadoraService : CalculadoraService) {}

    @Post()
    async create( @Body() insertCalculadora: InsertCalculadora ) {
        const {expressao} = insertCalculadora;

        const lexe = this.calculadoraService.lexer(expressao)

        const arvore = this.calculadoraService.arvore(lexe )

        const resultado = this.calculadoraService.resultado(arvore);

        return {resultado};
    }

}
