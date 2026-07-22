CREATE TABLE "departamento" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "departamento_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"nome" varchar(100) NOT NULL,
	"descricao" text,
	"criado_em" timestamp DEFAULT now() NOT NULL,
	"alterado_em" timestamp with time zone,
	"excluido_em" timestamp with time zone,
	CONSTRAINT "departamento_nome_unique" UNIQUE("nome")
);
--> statement-breakpoint
CREATE TABLE "produto" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "produto_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1)
);
