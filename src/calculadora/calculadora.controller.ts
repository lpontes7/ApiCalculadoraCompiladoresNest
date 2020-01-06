import { Controller, Post, Body } from '@nestjs/common';
import {InsertCalculadora} from '../calculadora/insert.interface'
import { CalculadoraService } from './calculadora.service';

@Controller('calculadora')
export class CalculadoraController {

    constructor(private calculadoraService : CalculadoraService) {}

    @Post()
    async create( @Body() insertCalculadora: InsertCalculadora ) {
        const {expressao} = insertCalculadora;

        const lexe = await this.calculadoraService.lexer(expressao)

        const arvore = await this.calculadoraService.arvore(lexe)

        return { mensagem: 'Resultado', arvore};
    }

}
