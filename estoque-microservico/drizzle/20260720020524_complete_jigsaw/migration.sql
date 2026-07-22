ALTER TABLE "produto" ADD COLUMN "nome" varchar(150) NOT NULL;--> statement-breakpoint
ALTER TABLE "produto" ADD COLUMN "codigo_barras" varchar(50);--> statement-breakpoint
ALTER TABLE "produto" ADD COLUMN "sku" varchar(50);--> statement-breakpoint
ALTER TABLE "produto" ADD COLUMN "preco_custo" numeric(10,2) NOT NULL;--> statement-breakpoint
ALTER TABLE "produto" ADD COLUMN "preco_venda" numeric(10,2) NOT NULL;--> statement-breakpoint
ALTER TABLE "produto" ADD COLUMN "ativo" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "produto" ADD COLUMN "departamento_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "produto" ADD COLUMN "criado_em" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "produto" ADD COLUMN "alterado_em" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "produto" ADD COLUMN "excluido_em" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "produto" ADD CONSTRAINT "ck_produto_preco_custo_positivo" CHECK ("preco_custo" > 0);--> statement-breakpoint
ALTER TABLE "produto" ADD CONSTRAINT "ck_produto_preco_venda_positivo" CHECK ("preco_venda" > 0);--> statement-breakpoint
ALTER TABLE "produto" ADD CONSTRAINT "ck_preco" CHECK ("preco_venda" >= "preco_custo");