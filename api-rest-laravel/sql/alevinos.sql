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

DROP TABLE IF EXISTS alevinos_pedido_semana;
CREATE TABLE alevinos_pedido_semana(
id                            int(255) auto_increment not null, 
id_alevinos_pedidos           int(255) not null, 
id_alevinos_dia_despacho      int(255) not null, 
id_despacho                   int(255) not null, 
id_lote_numero                int(255) not null, 
referencia_alimento      	  varchar(255) NULL ,
tratamientos_veterinarios     varchar(255) NULL ,
duracion_tratamiento          int(255)  NULL ,
temp_cargue             	  double(18,2)  NULL , 

created_at       datetime DEFAULT NULL,    
updated_at       datetime DEFAULT NULL,
CONSTRAINT pk_alevinos_pedido_semana PRIMARY KEY(id),
CONSTRAINT fk_aps_alevinosPedidos FOREIGN KEY (id_alevinos_pedidos) REFERENCES alevinos_pedidos(id),
CONSTRAINT fk_aps_alevinos_dia_despacho FOREIGN KEY (id_alevinos_dia_despacho) REFERENCES alevinos_dia_despacho(id),
CONSTRAINT fk_aps_alevinos_semana_despacho FOREIGN KEY (id_despacho) REFERENCES despachos(id),
CONSTRAINT fk_aps_alevinossd_lote_numero FOREIGN KEY (id_lote_numero) REFERENCES lote_numero(id)
)ENGINE=InnoDb;


DROP TABLE IF EXISTS lote_numero;

CREATE TABLE lote_numero(
id                       int(255) auto_increment not null, 
id_despacho              int(255) not null, 
numero_lote           varchar(255) NOT NULL ,
fecha_desove             datetime DEFAULT NULL, 
linea_genetica       varchar(255) NOT NULL ,
ovas_ml                  double(18,2) NOT NULL ,
edad_tcu                 int(255) NOT NULL ,
tamanio                  double(18,2) NOT NULL ,
total_lote               int(255) NOT NULL,
tamanio_usado_alevinos   int(255)  NULL,

fecha_incubacion         	datetime DEFAULT NULL,  
fecha_eclosion           	datetime DEFAULT NULL, 
fecha_fin_aborcion       	datetime DEFAULT NULL,  
fecha_primer_alimento    	datetime DEFAULT NULL,  
temp_eclosion            	double(18,2)  NULL , 

created_at       datetime DEFAULT NULL,    
updated_at       datetime DEFAULT NULL,
CONSTRAINT pk_lote_numero PRIMARY KEY(id),
CONSTRAINT fk_lote_numero_despacho FOREIGN KEY (id_despacho) REFERENCES despachos(id)

)ENGINE=InnoDb;



ALTER TABLE `api_rest_truchas`.`lotes` 

ADD COLUMN `id_lote_numero` INT(255) NULL DEFAULT 0 AFTER `id_despacho`,



INSERT INTO `u557099357_api_restrucha`.`lote_numero`
(
`id_despacho`,
`fecha_desove`,
`linea_genetica`,
`edad_tcu`,
`numero_lote`,
`tamanio`,
`ovas_ml`,
`total_lote`,
`tamanio_usado_alevinos`,
`created_at`,
`updated_at`)
SELECT distinct d.id,
 lotes.fecha_desove,
 lotes.linea_genetica,
  lotes.edad_tcu,
 lotes.numero_lote,

 lotes.tamanio,
 lotes.ovas_ml,
 lotes.total_lote,
 0,
 NOW(),
 NOW()
 
FROM u557099357_api_restrucha.despachos d 
left join u557099357_api_restrucha.lotes lotes on d.id = lotes.id_despacho
left join u557099357_api_restrucha.bandeja_lote bl on lotes.id = bl.id_lote
left join u557099357_api_restrucha.trazabilidad_bandejas tb on tb.id_bandeja_lote = bl.id_lote  
left join u557099357_api_restrucha.trazabilidad t on  tb.id_trazabilidad = t.id
left join   u557099357_api_restrucha.fincas f  on t.id_finca = f.id
-- where f.propia = true
group by d.id,
 lotes.fecha_desove,
 lotes.linea_genetica,
 lotes.numero_lote,
 lotes.edad_tcu,
 lotes.tamanio,
 lotes.ovas_ml;


update  u557099357_api_restrucha.lotes lo
inner join u557099357_api_restrucha.lote_numero lotnumero on lo.id_despacho = lotnumero.id_despacho
set  id_lote_numero = lotnumero.id
where lotnumero.fecha_desove  = lo.fecha_desove 
	and lotnumero.ovas_ml = lo.ovas_ml
    and lotnumero.edad_tcu = lo.edad_tcu
     and lotnumero.tamanio = lo.tamanio