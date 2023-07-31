-- projeto definition

CREATE TABLE projeto (
	id INTEGER PRIMARY KEY AUTOINCREMENT
, nome TEXT, local_dev TEXT, local_prod TEXT);


-- tipo_comando definition

CREATE TABLE tipo_comando (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	nome TEXT
);


-- comando definition

CREATE TABLE comando (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	tipo_comando_id INTEGER,
	comando TEXT,
	CONSTRAINT comando_FK FOREIGN KEY (tipo_comando_id) REFERENCES tipo_comando(id)
);


-- projeto_interacao definition

CREATE TABLE projeto_interacao (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	nome TEXT,
	projeto_id INTEGER,
	CONSTRAINT projeto_interacao_FK FOREIGN KEY (projeto_id) REFERENCES projeto(id)
);


-- projeto_interacao_comando definition

CREATE TABLE projeto_interacao_comando (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	comando_id INTEGER,
	projeto_interacao_id INTEGER,
	ordem INTEGER,
	CONSTRAINT projeto_interacao_comando_FK FOREIGN KEY (comando_id) REFERENCES comando(id),
	CONSTRAINT projeto_interacao_comando_FK_1 FOREIGN KEY (projeto_interacao_id) REFERENCES projeto_interacao(id)
);



INSERT INTO comando (tipo_comando_id,comando) VALUES
	 (1,'pull'),
	 (3,'{dev} {prod}'),
	 (4,'install'),
	 (5,'{dev}'),
	 (5,'{prod}');


INSERT INTO tipo_comando (nome) VALUES
	 ('git'),
	 ('node'),
	 ('cp'),
	 ('composer'),
	 ('local'),
	 ('npm');
