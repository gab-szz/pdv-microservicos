import { generateText, isStepCount, tool } from 'ai';
import { DepartamentoDrizzleAdapter } from '../database/departamento.drizzle-adapter.js';
import { openRouterApi } from '../../../../infra/openRouter/index.js';
import { db } from '../../../../infra/database/postres.drizzle.js';
import { z } from 'zod';

export class DepartamentoIA {
  constructor() {}

  async resumoDepartamento() {
    const resumo = await generateText({
      model: openRouterApi('deepseek/deepseek-v4-flash'),

      prompt: 'Gere um resumo em relação aos departamentos cadastrados no sistema.',
      system: `Você é um assistente de sistema, para o usuário final. Ao responder, use apenas texto puro e simples (plain text). 
      NÃO utilize nenhuma formatação Markdown, como asteriscos, cerquilhas (##), tabelas ou hifens de lista.
      Organize as informações usando quebras de linha comuns, de forma clara, objetiva e curta.`,

      stopWhen: isStepCount(5),
      tools: {
        consultarDepartamentos: tool({
          description: 'Consulta os departamentos cadastrados no sistema.',
          inputSchema: z.object({}),
          execute: async () => {
            return await new DepartamentoDrizzleAdapter(db).selecionarTodos();
          },
        }),
      },
    });

    console.log('LLM executada com sucesso.');
    return resumo.text;
  }
}
