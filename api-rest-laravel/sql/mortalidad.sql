use api_rest_truchas;
CREATE TABLE mortalidad(
id              int(255) auto_increment not null, 
id_pedido              int(255) not null, 
id_finca 			 int(255) not null, 
temp_bandeja_superior   double(18,2) NOT NULL,
temp_bandeja_intermedia  double(18,2) NOT NULL,
temp_bandeja_inferior   double(18,2) NOT NULL,
hielo_bandeja_superior   varchar(500) NOT NULL,
hielo_bandeja_intermedia   varchar(500) NOT NULL,
hielo_bandeja_inferior    varchar(500) NOT NULL,

utilizo_transporte       BIT(1) NOT NULL,
demora_llegada           BIT(1) NOT NULL,
danio_cajas              BIT(1) NOT NULL,
cambioGranja             BIT(1) NOT NULL,
similar                  BIT(1) NOT NULL,
distintas                BIT(1) NOT NULL,

temp_ovas_llegar         int(255) not null, 
temp_agua_incubacion     int(255) not null, 

metodo_aclimatacion      varchar(500) NOT NULL ,
fuente_agua_incubacion   varchar(500) NOT NULL ,
origen_agua_incubacion   varchar(500) NOT NULL ,
uso_agua_incubacion      varchar(500) NOT NULL ,
nivel_oxigeno            double(18,2) not null, 
hora_aclimatacion        int(255) not null, 
minutos_aclimatacion     int(255) not null, 

llegada_ovas             datetime DEFAULT NULL,    
llegada_ovas_finca       datetime DEFAULT NULL,    
apertura_cajas           datetime DEFAULT NULL,    
inicio_hidratacion       datetime DEFAULT NULL,    
inicio_siembra           datetime DEFAULT NULL,    
finalizacion_siembra     datetime DEFAULT NULL,    
inicio_eclosion          datetime DEFAULT NULL,    
fin_eclosion             datetime DEFAULT NULL,    
fecha_inicioProblema     datetime DEFAULT NULL,    

created_at       datetime DEFAULT NULL,    
updated_at       datetime DEFAULT NULL,
CONSTRAINT pk_mortalidad PRIMARY KEY(id),
CONSTRAINT fk_mortalidad_pedido FOREIGN KEY (id_pedido) REFERENCES pedidos(id),
CONSTRAINT fk_mortalidad_finca FOREIGN KEY (id_finca) REFERENCES fincas(id)

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

