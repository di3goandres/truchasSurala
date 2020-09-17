use api_rest_truchas;
CREATE TABLE mortalidad(
id              int(255) auto_increment not null, 
id_pedido              int(255) not null, 
id_finca 			 int(255) not null, 
temp_bandeja_superior   double(18,2) NOT NULL,
temp_bandeja_intermedia  double(18,2) NOT NULL,
temp_bandeja_inferior   double(18,2) NOT NULL,
hielo_bandeja_superior   double(18,2) NOT NULL,
hielo_bandeja_intermedia  double(18,2) NOT NULL,
hielo_bandeja_inferior   double(18,2) NOT NULL,
created_at       datetime DEFAULT NULL,    
updated_at       datetime DEFAULT NULL,
CONSTRAINT pk_mortalidad PRIMARY KEY(id),
CONSTRAINT fk_mortalidad_pedido FOREIGN KEY (id_pedido) REFERENCES pedidos(id),
CONSTRAINT fk_mortalidad_finca FOREIGN KEY (id_finca) REFERENCES fincas(id)

)ENGINE=InnoDb;



CREATE TABLE mortalidad_preguntas(
id                      int(255) auto_increment not null, 
id_mortalidad           int(255) not null, 
tipo_pregunta           varchar(1000) NOT NULL ,
pregunta                varchar(1000) NOT NULL ,
respuesta               varchar(1000) NOT NULL ,
observaciones           varchar(1000) NOT NULL ,
created_at       datetime DEFAULT NULL,    
updated_at       datetime DEFAULT NULL,
CONSTRAINT pk_mpreguntas PRIMARY KEY(id),
CONSTRAINT fk_mortalidad_preguntas_mortalidad FOREIGN KEY (id_mortalidad) REFERENCES mortalidad(id)
)ENGINE=InnoDb;

CREATE TABLE mortalidad_diario(
id                      int(255) auto_increment not null, 
id_mortalidad           int(255) not null, 
dia                     int(255) not null, 
cantidad                int(255) NOT NULL,
created_at       datetime DEFAULT NULL,    
updated_at       datetime DEFAULT NULL,
CONSTRAINT pk_mdiario PRIMARY KEY(id),
CONSTRAINT fk_mortalidad_diario_mortalidad FOREIGN KEY (id_mortalidad) REFERENCES mortalidad(id)
)ENGINE=InnoDb;

