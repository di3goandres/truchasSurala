CREATE TABLE informes_tecnicos(
id                     int(255) auto_increment not null, 
user_id                int(255) not null, 
finca_id               int(255) not null, 
tipo_informe           varchar(100) not null, 
fecha_visita           datetime DEFAULT null,    
observaciones          varchar(1000) not null, 
informeTecnico         varchar(1000) not null, 
archivo_psr            varchar(1000)  null, 
histopatologia         varchar(1000)  null, 

created_at       datetime DEFAULT NULL,    
updated_at       datetime DEFAULT NULL,
CONSTRAINT pk_informestecnicos PRIMARY KEY(id),
CONSTRAINT fk_itecnicos_user FOREIGN KEY (user_id) REFERENCES users(id),
CONSTRAINT fk_itecnicos_finca FOREIGN KEY (finca_id) REFERENCES fincas(id)
)ENGINE=InnoDb;
