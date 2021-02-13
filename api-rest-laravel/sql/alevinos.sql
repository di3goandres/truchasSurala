use api_rest_truchas;

DROP TABLE IF EXISTS alevinos_pedido_semana;
DROP TABLE IF EXISTS alevinos_dia_despacho;
DROP TABLE IF EXISTS alevinos_pedidos;

CREATE TABLE alevinos_pedidos(
id                   int(255) auto_increment not null, 
user_id              int(255) not null, 
id_finca 			 int(255) not null, 
es_talla             BIT(1) NOT NULL,
es_peso              BIT(1) NOT NULL,
cantidad             int(255) NOT NULL,
centimetros          double(18,2) NOT NULL,
peso_gramos          double(18,2) NOT NULL,
fecha_probable       datetime DEFAULT NULL,  
numero_semana        int(255) NOT NULL,
dia                  varchar(500) NOT NULL,  
fecha_real           datetime DEFAULT NULL, 
despachado            BIT(1) NOT NULL,
created_at           datetime DEFAULT NULL,    
updated_at           datetime DEFAULT NULL,
CONSTRAINT pk_alevinos_pedidos PRIMARY KEY(id),
CONSTRAINT fk_pa_usuario FOREIGN KEY (user_id) REFERENCES users(id),
CONSTRAINT fk_pa_finca FOREIGN KEY (id_finca) REFERENCES fincas(id)

)ENGINE=InnoDb;



CREATE TABLE alevinos_dia_despacho(
id                      int(255) auto_increment not null, 
fecha_salida            datetime DEFAULT NULL,    
numero_semana           int(255) NOT NULL,
dia                     varchar(500) NOT NULL,
despachado              BIT(1) NOT NULL,

created_at       datetime DEFAULT NULL,    
updated_at       datetime DEFAULT NULL,
CONSTRAINT pk_alevino_dia_despacho PRIMARY KEY(id)
)ENGINE=InnoDb;


CREATE TABLE alevinos_pedido_semana(
id                            int(255) auto_increment not null, 
id_alevinos_pedidos           int(255) not null, 
id_alevinos_dia_despacho      int(255) not null, 
created_at       datetime DEFAULT NULL,    
updated_at       datetime DEFAULT NULL,
CONSTRAINT pk_alevinos_pedido_semana PRIMARY KEY(id),
CONSTRAINT fk_aps_alevinosPedidos FOREIGN KEY (id_alevinos_pedidos) REFERENCES alevinos_pedidos(id),
CONSTRAINT fk_aps_alevinos_dia_despacho FOREIGN KEY (id_alevinos_dia_despacho) REFERENCES alevinos_dia_despacho(id)

)ENGINE=InnoDb;
