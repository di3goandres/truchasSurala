/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 * Author:  diegomontealegregarcia
 * Created: 29-Jun-2020
 */



/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 * Author:  diegomontealegregarcia
 * Created: 22-Jun-2020
 */

drop database if  EXISTS  api_rest_truchas;
create database  if not EXISTS api_rest_truchas;

use api_rest_truchas;



CREATE TABLE tipo_identificaciones(
id              int(255) auto_increment not null, 
name            varchar(255) NOT NULL ,
abreviatura            varchar(255) NOT NULL ,
created_at       datetime DEFAULT NULL,    
updated_at       datetime DEFAULT NULL,
CONSTRAINT pk_tipoident PRIMARY KEY(id)
)ENGINE=InnoDb;


CREATE TABLE users
 (
id              int(255) auto_increment not null, 
id_identificacion              int(255)  not null, 
numero_identificacion      varchar(255) NOT NULL, 
name            varchar(255) NOT NULL ,
surname         varchar(255),
role            varchar(40),
password        varchar(255) NOT NULL,
email           varchar(255) NOT NULL,
description     text,
image           varchar(255), 
created_at       datetime DEFAULT NULL,    
updated_at       datetime DEFAULT NULL,
remeber_token   varchar(255),
CONSTRAINT pk_users PRIMARY KEY(id),
CONSTRAINT fk_user_ident  FOREIGN KEY (id_identificacion) REFERENCES tipo_identificaciones(id)

)ENGINE=InnoDb;


-- CREATE TABLE departamento(
-- id              int(255) auto_increment not null, 
-- name            varchar(255) NOT NULL ,
-- created_at       datetime DEFAULT NULL,    
-- updated_at       datetime DEFAULT NULL,
-- CONSTRAINT pk_categories PRIMARY KEY(id)
-- 
-- )ENGINE=InnoDb;


CREATE TABLE fincas(
id              int(255) auto_increment not null, 
user_id         int(255) null,
nombre           varchar(255) NOT NULL ,
id_municipio        int(255)   null,
direccion          varchar(255) NULL ,
altura_nivel_mar        int(255)  null,
temperatura_centigrados        int(255)  null,

created_at       datetime DEFAULT NULL,    
updated_at       datetime DEFAULT NULL,
CONSTRAINT pk_fincas PRIMARY KEY(id),
CONSTRAINT fk_fincas_user FOREIGN KEY (user_id) REFERENCES users(id)


)ENGINE=InnoDb;


CREATE TABLE despachos(
id              int(255) auto_increment not null, 
fecha         datetime DEFAULT NULL, 
numero_factura            varchar(255) NOT NULL ,
numero_ovas            varchar(255) NOT NULL ,
created_at       datetime DEFAULT NULL,    
updated_at       datetime DEFAULT NULL,
CONSTRAINT pk_despacho PRIMARY KEY(id)

)ENGINE=InnoDb;


CREATE TABLE lotes(
id              int(255) auto_increment not null, 
id_despacho              int(255) not null, 
fecha_desove        datetime DEFAULT NULL, 
linea_genetica       varchar(255) NOT NULL ,
edad_tcu      int(255) NOT NULL ,
tamanio   double(18,2) NOT NULL ,

numero_bandejas   int(255) NOT NULL ,
ovas_ml   double(18,2) NOT NULL ,
total_lote  int(255) NOT NULL,
tamanio_usado int(255)  NULL,
created_at       datetime DEFAULT NULL,    
updated_at       datetime DEFAULT NULL,
CONSTRAINT pk_lote PRIMARY KEY(id),
CONSTRAINT fk_lote_despacho FOREIGN KEY (id_despacho) REFERENCES despachos(id)

)ENGINE=InnoDb;


CREATE TABLE  bandeja_lote(
id              int(255) auto_increment not null, 
id_lote             int(255) not null, 
tamanio_inicial  int(255) NOT NULL default 0 ,
tamanio_final int(255) NOT NULL default 0 ,
created_at       datetime DEFAULT NULL,    
updated_at       datetime DEFAULT NULL,
CONSTRAINT pk_bandeja PRIMARY KEY(id),
CONSTRAINT fk_lote_bandeja FOREIGN KEY (id_lote) REFERENCES lotes(id)

)ENGINE=InnoDb;

CREATE TABLE trazabilidad(
id              int(255) auto_increment not null, 
id_lote int(255) not null, 
id_pedido int(255) not null, 

id_finca             int(255) not null, 
remision        varchar(255) NOT NULL ,
ovas_facturadas     int(255) NOT NULL DEFAULT 0,
ovas_adicionales     int(255) NOT NULL DEFAULT 0 ,
ovas_reposicion     int(255) NOT NULL DEFAULT 0 ,
total_ovas_enviadas     int(255) NOT NULL  DEFAULT 0,
nombre_reclama      varchar(255)  NULL ,
tipo_identificacion_reclama     int(255)  NULL ,
numero_identificacion_reclama     int(255)  NULL ,
telefono_reclama     int(255)  NULL ,

descripcion_adicionales     varchar(2000)  NULL ,

created_at       datetime DEFAULT NULL,    
updated_at       datetime DEFAULT NULL,
CONSTRAINT pk_trazabilidad PRIMARY KEY(id),
CONSTRAINT fk_traza_lote FOREIGN KEY (id_lote) REFERENCES lotes(id),
CONSTRAINT fk_traza_finca FOREIGN KEY (id_finca) REFERENCES  fincas(id),
CONSTRAINT fk_traza_pedido FOREIGN KEY (id_pedido) REFERENCES  pedidos(id),

CONSTRAINT fk_traza_identquienrclama  FOREIGN KEY (tipo_identificacion_reclama) REFERENCES tipo_identificaciones(id)


)ENGINE=InnoDb;



CREATE TABLE  trazabilidad_bandejas(
id              int(255) auto_increment not null, 
id_trazabilidad           int(255) not null, 
id_bandeja_lote int(255) not null, 
cantidad     varchar(255) NOT NULL DEFAULT 0 ,

created_at       datetime DEFAULT NULL,    
updated_at       datetime DEFAULT NULL,
CONSTRAINT pk_bandeja PRIMARY KEY(id),
CONSTRAINT fk_trazabilidad FOREIGN KEY (id_trazabilidad ) REFERENCES trazabilidad(id)
CONSTRAINT fk_trazabilidad_bandeja FOREIGN KEY (id_bandeja_lote ) REFERENCES bandeja_lote(id)


)ENGINE=InnoDb;

DELIMITER //
CREATE TRIGGER trigger_InsertBandejaLote
AFTER INSERT
   ON lotes FOR EACH ROW

BEGIN

   -- variable declarations
 DECLARE done INT DEFAULT 0;

set done  = new.numero_bandejas;

   -- trigger code

loop_label:  LOOP
            IF  done <=0 THEN 
                    LEAVE  loop_label;
            END  IF;

            SET  done = done - 1;
            INSERT INTO bandeja_lote (id_lote, tamanio_inicial, tamanio_final, created_at, updated_at) 
VALUES (new.id,  new.total_lote/new.numero_bandejas,new.total_lote/new.numero_bandejas, NOW(), NOW());

END LOOP;


END;//
;

CREATE TABLE  pedidos(
id              int(255) auto_increment not null, 
id_despacho           int(255) not null, 
id_finca               int(255) not null, 
pedido  int(255) not null DEFAULT 0, 
porcentaje  int(255) not null DEFAULT 0, 
adicional  int(255) not null DEFAULT 0, 
reposicion  int(255) not null DEFAULT 0, 
total  int(255) not null DEFAULT 0, 
created_at       datetime DEFAULT NULL,    
updated_at       datetime DEFAULT NULL,
CONSTRAINT pk_pedidos PRIMARY KEY(id),
CONSTRAINT fk_pedidos_finca FOREIGN KEY (id_finca) REFERENCES fincas(id),
CONSTRAINT fk_pedidos_despacho FOREIGN KEY (id_despacho) REFERENCES despachos(id)


)ENGINE=InnoDb;




