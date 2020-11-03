import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module';
import { join } from 'path';
import { CalculadoraModule } from './calculadora/calculadora.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'view'),
    }),
    CalculadoraModule,
  ],
})
export class AppModule {}
