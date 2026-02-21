
/*CRIAR O BANCO DE DADOS CHAMADO denatran (Departamento Nacional de Trânsito) */
CREATE DATABASE denatran;

/* USAR O BANCO CRIADO PARA GERENCIAR AS TABELAS */
USE denatran;

/* CRIAR TABELA ESTADO */
CREATE TABLE estado (
	id INT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL
);

/* CRIAR TABELA ENDEREÇO: bairro alterado para NULL */
CREATE TABLE endereco (
	id INT PRIMARY KEY AUTO_INCREMENT,
    rua VARCHAR(50) NOT NULL,
    numero INT,
    complemento VARCHAR(50),
    bairro VARCHAR(50), /* alterado para NULL */
    cidade VARCHAR(50) NOT NULL,
    estado_id INT NOT NULL
);

/* CRIAR O RELACIONAMENTO ENTRE AS TABELAS ENDERECO e ESTADO */
ALTER TABLE endereco
ADD FOREIGN KEY (estado_id)
REFERENCES estado (id);

/* CRIAR A TABELA MOTORISTA */
CREATE TABLE motorista (
	cnh INT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    data_nascimento DATE NOT NULL,
    endereco_id INT NOT NULL
);

/* CRIAR O RELACIONAMENTO ENTRE AS TABELAS MOTORISTA e ENDERECO */
ALTER TABLE motorista
ADD FOREIGN KEY (endereco_id)
REFERENCES endereco (id);

/* CRIAR A TABELA VEICULO */
CREATE TABLE veiculo (
	placa VARCHAR(7) PRIMARY KEY,
    marca VARCHAR(50) NOT NULL,
    modelo VARCHAR(50) NOT NULL,
    ano YEAR NOT NULL
);

/* CRIAR A TABELA ATUACAO */
CREATE TABLE atuacao (
	id INT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL
);

/* CRIAR A TABELA AGENTE */
CREATE TABLE agente (
	num INT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    atuacao_id INT NOT NULL
);

/* CRIAR O RELACIONAMENTO ENTRE AS TABELAS AGENTE e ATUACAO */
ALTER TABLE agente
ADD FOREIGN KEY (atuacao_id)
REFERENCES atuacao (id);

/* CRIAR A TABELA INFRACAO */
CREATE TABLE infracao (
	numero INT PRIMARY KEY AUTO_INCREMENT,
    data_hora TIMESTAMP NOT NULL,
    descricao TEXT NOT NULL,
    endereco_id INT NOT NULL,
    veiculo_placa VARCHAR(7) NOT NULL,
    agente_num INT NOT NULL,
    motorista_cnh INT NOT NULL
);

/* CRIAR OS RELACIONAMENTOS ENTRE AS TABELAS INFRACAO, AGENTE, VEICULO, ENDERECO e MOTORISTA */
ALTER TABLE infracao
ADD FOREIGN KEY (agente_num)
REFERENCES agente (num);

ALTER TABLE infracao
ADD FOREIGN KEY (veiculo_placa)
REFERENCES veiculo (placa);

ALTER TABLE infracao
ADD FOREIGN KEY (endereco_id)
REFERENCES endereco (id);

ALTER TABLE infracao
ADD FOREIGN KEY (motorista_cnh)
REFERENCES motorista (cnh);