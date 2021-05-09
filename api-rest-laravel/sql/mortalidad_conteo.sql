use api_rest_truchas;



CREATE TABLE metodo_conteo(
id                       int(255) auto_increment not null, 
Nombre                   varchar(500) NOT NULL ,
Descripcion              varchar(5000) NOT NULL ,
esOvacon                 boolean,
esOtro                   boolean,
created_at               datetime DEFAULT NULL,    
updated_at               datetime DEFAULT NULL,
CONSTRAINT pk_metodo_conteo PRIMARY KEY(id)

)ENGINE=InnoDb;




CREATE TABLE mortalidad_conteo(
id                       int(255) auto_increment not null, 
id_pedido                int(255) not null, 
id_finca 			           int(255) not null, 
id_metodoConteo			     int(255) not null, 
MetodoConteo             varchar(500) NOT NULL ,
NumeroConteoRealizado	   int(255) not null DEFAULT 0, 

Estado                   varchar(500) NOT NULL DEFAULT 'Pendiente',
aprobado_Troutlodge 	   int(255) not null DEFAULT 0, 
aprobado_Surala 	 	     int(255) not null DEFAULT 0, 
Observaciones            varchar(500) NOT NULL DEFAULT '',


created_at               datetime DEFAULT NULL,    
updated_at               datetime DEFAULT NULL,
CONSTRAINT pk_mortalidad_conteo PRIMARY KEY(id),
CONSTRAINT fk_mortalidad_conteo_pedido FOREIGN KEY (id_pedido) REFERENCES pedidos(id),
CONSTRAINT fk_mortalidad_conteo_finca FOREIGN KEY (id_finca) REFERENCES fincas(id),
CONSTRAINT fk_mortalidad_conteo_metodo FOREIGN KEY (id_metodoConteo) REFERENCES metodo_conteo(id)


)ENGINE=InnoDb;



insert into metodo_conteo (Nombre, Descripcion, created_at,updated_at,esOtro, esOvacon)
VALUES (
        'PALETA OVACONT',
         'Es una paleta para el conteo manual de ovas de trucha. Es un equipo práctico, sencillo y fácil de usar, brinda cantidades absolutas, lo cual es de gran ayuda para una adecuada gestión de inventarios', 
         CURRENT_TIMESTAMP(),
         CURRENT_TIMESTAMP(), FALSE, TRUE ),
         
        (
        'VON BAYER',
         'Esto se recomienda ya que es rápido, simple y preciso. Utiliza una canaleta de medición de ovas de trucha, fácil de hacer, pero también disponible desde Troutlodge bajo petición', 
         CURRENT_TIMESTAMP(),
         CURRENT_TIMESTAMP(), FALSE, FALSE )
