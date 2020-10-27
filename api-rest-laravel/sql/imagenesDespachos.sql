CREATE TABLE despachos_imagenes(
id                 int(255) auto_increment not null, 
id_despacho        int(255) not null, 
tipo               varchar(1000)  null, 
archivo            varchar(1000)  null, 
created_at         datetime DEFAULT NULL,    
updated_at         datetime DEFAULT NULL,
CONSTRAINT pk_despacho_imagenes PRIMARY KEY(id),
CONSTRAINT fk_di_despacho FOREIGN KEY (id_despacho) REFERENCES despachos(id),
)ENGINE=InnoDb;