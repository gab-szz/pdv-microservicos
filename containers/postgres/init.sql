-- ============================================================
-- PostgreSQL bootstrap - PDV
-- ============================================================
--
-- O usuário "postgres" é criado pela imagem oficial
-- do PostgreSQL através do docker-compose.
--
-- Este arquivo cria os usuários específicos do sistema:
--
--   pdv_migrator -> responsável por migrations / DDL
--   pdv_app      -> utilizado pela aplicação / DML + DQL
--
-- Este arquivo é executado somente na primeira inicialização
-- do volume do PostgreSQL.
-- ============================================================

-- ============================================================
-- 1. Usuário responsável pelas migrations
-- ============================================================

CREATE
ROLE pdv_migrator
LOGIN PASSWORD 'pdv_migrator_dev_password';

-- ============================================================
-- 2. Usuário utilizado pela aplicação
-- ============================================================

CREATE ROLE pdv_app LOGIN PASSWORD 'pdv_app_dev_password';

-- ============================================================
-- 3. Banco de dados
-- ============================================================

-- O banco "pdv_db" já foi criado pelo POSTGRES_DB.
-- Transferimos a propriedade para o migrator.

ALTER DATABASE pdv_db OWNER TO pdv_migrator;

-- ============================================================
-- 4. Permissões no banco
-- ============================================================

-- Por padrão, todos os usuários podem tentar conectar.
-- Removemos esse acesso genérico.

REVOKE CONNECT ON DATABASE pdv_db FROM PUBLIC;

-- Apenas os usuários necessários recebem CONNECT.

GRANT CONNECT ON DATABASE pdv_db TO pdv_migrator;

GRANT CONNECT ON DATABASE pdv_db TO pdv_app;

-- ============================================================
-- 5. Schema public
-- ============================================================

-- O migrator será o dono do schema.

ALTER SCHEMA public OWNER TO pdv_migrator;

-- Ninguém além de quem explicitamente receber permissão
-- poderá criar objetos no schema.

REVOKE CREATE ON SCHEMA public FROM PUBLIC;

-- Migrator pode criar/alterar objetos.

GRANT USAGE, CREATE ON SCHEMA public TO pdv_migrator;

-- Aplicação pode utilizar objetos existentes,
-- mas não pode criar tabelas, alterar schema etc.

GRANT USAGE ON SCHEMA public TO pdv_app;

-- ============================================================
-- 6. Permissões da aplicação sobre tabelas existentes
-- ============================================================

GRANT
SELECT,
INSERT
,
UPDATE,
DELETE ON ALL TABLES IN
SCHEMA public TO pdv_app;

-- ============================================================
-- 7. Permissões da aplicação sobre sequences existentes
-- ============================================================

GRANT USAGE,
SELECT,
UPDATE ON ALL SEQUENCES IN
SCHEMA public TO pdv_app;

-- ============================================================
-- 8. Privilégios padrão para tabelas futuras
-- ============================================================

-- Quando o pdv_migrator criar uma tabela através de uma
-- migration do Drizzle, o pdv_app receberá automaticamente
-- as permissões DQL/DML.

ALTER DEFAULT PRIVILEGES FOR
ROLE pdv_migrator IN
SCHEMA public
GRANT
SELECT,
INSERT
,
UPDATE,
DELETE ON TABLES TO pdv_app;

-- ============================================================
-- 9. Privilégios padrão para sequences futuras
-- ============================================================

ALTER DEFAULT PRIVILEGES FOR
ROLE pdv_migrator IN
SCHEMA public
GRANT USAGE,
SELECT,
UPDATE ON SEQUENCES TO pdv_app;