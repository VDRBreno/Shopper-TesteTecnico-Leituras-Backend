<div>
  <div align="center">
    <img src="./repository-assets/shopper-logo-light.svg" />
  </div>
  
  <h2>Teste Técnico: Leitura automatizada de água e gás com Inteligência Artificial</h2>
</div>

**Desafio:** Criar API REST utilizando TypeScript + Node tendo 3 endpoints e integração com API do Google Gemini, criar imagem da aplicação com Docker.

<br/>

## Endpoints

**POST /upload**<br/>
> Responsável por receber uma imagem em base 64, consultar o Gemini e retornar a medida lida pela API
- Request Body
```ts
{
  image: "base64",
  customer_code: "string",
  measure_datetime: "datetime",
  measure_type: "WATER" | "GAS"
}
```

**PATCH /confirm**<br/>
> Responsável por confirmar ou corrigir o valor lido pelo LLM
- Request Body
```ts
{
  measure_uuid: "string",
  confirmed_value: "integer"
}
```

**GET /:customer_code/list**<br/>
> Responsável por listar as medidas realizadas por um determinado cliente

- Request Query *( /list?query=value )*
```ts
// opcional
measure_type: "WATER" | "GAS"
```

<br/>

## Instalação ( Docker )

```bash
git clone https://github.com/VDRBreno/Shopper-TesteTecnico-Leituras-Backend.git

cd Shopper-TesteTecnico-Leituras-Backend
```

Crie um novo arquivo .env e coloque uma Chave de API do Gemini https://ai.google.dev/gemini-api/docs/api-key

```ts
// .env
GEMINI_API_KEY="CHAVE"
```

Inicie o contêiner
```bash
docker compose up
# Aplicação rodando em localhost:3333
```

<br/>

## Tecnologias usadas
- Docker
- TypeScript
- Node
- Prisma
- Jest
- Fastify
- Joi