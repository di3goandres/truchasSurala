use api_rest_truchas;

DROP TABLE IF EXISTS alevinos_pedido_semana;
DROP TABLE IF EXISTS alevinos_dia_despacho;
DROP TABLE IF EXISTS alevinos_pedidos;

CREATE TABLE alevinos_pedidos(
id                   int(255) auto_increment not null, 
user_id              int(255) not null, 
conductor_id         int(255) null, 
id_finca 			 int(255) not null, 
id_lote_numero       int(255)  null, 

es_talla             BIT(1) NOT NULL,
es_peso              BIT(1) NOT NULL,
cantidad             int(255) NOT NULL,
centimetros          double(18,2) NOT NULL,
peso_gramos          double(18,2) NOT NULL,
fecha_probable       datetime DEFAULT NULL,  
numero_semana        int(255) NOT NULL,
dia                  varchar(500) NOT NULL,  

lote_alevinos        varchar(500) NULL,

referencia_alimento      	  varchar(255) NULL ,
tratamientos_veterinarios     varchar(255) NULL ,
duracion_tratamiento          int(255)  NULL ,
cantidad_alevinos             int(255) DEFAULT 0 ,
talla_promedio                double(18,2)  DEFAULT 0 ,
peso_promedio                 double(18,2) DEFAULT 0 ,
temp_cargue             	  double(18,2)  NULL , 

despachado            BIT(1) NOT NULL,

created_at           datetime DEFAULT NULL,    
updated_at           datetime DEFAULT NULL,
CONSTRAINT pk_alevinos_pedidos PRIMARY KEY(id),
CONSTRAINT fk_pa_usuario FOREIGN KEY (user_id) REFERENCES users(id),
CONSTRAINT fk_pa_conductor FOREIGN KEY (conductor_id) REFERENCES users(id),
CONSTRAINT fk_pa_finca FOREIGN KEY (id_finca) REFERENCES fincas(id),
CONSTRAINT fk_aps_alevinossd_lote_numero FOREIGN KEY (id_lote_numero) REFERENCES lote_numero(id)
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



ALTER TABLE `api_rest_truchas`.`alevinos_pedidos` 

ADD COLUMN `conductor_id` INT(255) NULL DEFAULT 0 AFTER `user_id`,



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



     ---- consulta de la suma por propio

update 
  
 u557099357_api_restrucha.lote_numero l_n
	inner join (
    
		select  l_n.id, sum(tb.cantidad) 'suma'

		FROM u557099357_api_restrucha.lote_numero l_n
			left join u557099357_api_restrucha.lotes lotes on l_n.id = lotes.id_lote_numero
			left join u557099357_api_restrucha.bandeja_lote bl on bl.id_lote = lotes.id
			left join u557099357_api_restrucha.trazabilidad_bandejas tb on tb.id_bandeja_lote = bl.id  
			left join u557099357_api_restrucha.trazabilidad t on tb.id_trazabilidad =  t.id 
			left join u557099357_api_restrucha.pedidos p on  t.id_pedido = p.id

			inner join u557099357_api_restrucha.despachos d on d.id = l_n.id_despacho
			left join   u557099357_api_restrucha.fincas f  on t.id_finca = f.id
			where f.propia = true
		group by
		--  d.fecha_salida,
		-- d.fecha_salida,
			lotes.fecha_desove,
			lotes.id_lote_numero,
			lotes.linea_genetica,
			lotes.numero_lote,
			lotes.edad_tcu,
			lotes.tamanio,
			lotes.ovas_ml
			order by 1
    ) i on l_n.id = i.id
    set l_n.total_lote_propios = i.suma
    where l_n.id = i.id

---- suma total


