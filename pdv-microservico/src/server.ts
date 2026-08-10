import server from "./app.js";
import { env } from "./config/env.js";

async function main() {
  try {
    await server.listen({ host: "0.0.0.0", port: env.PORTA });
  } catch (error) {
    console.log("Ocorreu um erro ao inicializar a aplicação:", error);
    process.exit(1);
  }
}

await main();
