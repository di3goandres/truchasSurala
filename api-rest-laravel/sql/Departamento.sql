/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 * Author:  diegomontealegregarcia
 * Created: 11-Aug-2020
 */

use  u557099357_api_restrucha;
DROP TABLE IF EXISTS departamentos;

CREATE TABLE departamentos(
id              int(255) auto_increment not null, 
id_departamento int(255) not null,
departamento varchar(255) NOT NULL DEFAULT '',
created_at       datetime DEFAULT NOW(),    
updated_at       datetime DEFAULT NOW(),
CONSTRAINT PK_DEPARTAMENTO PRIMARY KEY(id)
)ENGINE=InnoDb;



INSERT INTO departamentos (id_departamento, departamento)
VALUES
	(5,'ANTIOQUIA'),
	(8,'ATLÁNTICO'),
	(11,'BOGOTÁ, D.C.'),
	(13,'BOLÍVAR'),
	(15,'BOYACÁ'),
	(17,'CALDAS'),
	(18,'CAQUETÁ'),
	(19,'CAUCA'),
	(20,'CESAR'),
	(23,'CÓRDOBA'),
	(25,'CUNDINAMARCA'),
	(27,'CHOCÓ'),
	(41,'HUILA'),
	(44,'LA GUAJIRA'),
	(47,'MAGDALENA'),
	(50,'META'),
	(52,'NARIÑO'),
	(54,'NORTE DE SANTANDER'),
	(63,'QUINDIO'),
	(66,'RISARALDA'),
	(68,'SANTANDER'),
	(70,'SUCRE'),
	(73,'TOLIMA'),
	(76,'VALLE DEL CAUCA'),
	(81,'ARAUCA'),
	(85,'CASANARE'),
	(86,'PUTUMAYO'),
	(88,'ARCHIPIÉLAGO DE SAN ANDRÉS, PROVIDENCIA Y SANTA CATALINA'),
	(91,'AMAZONAS'),
	(94,'GUAINÍA'),
	(95,'GUAVIARE'),
	(97,'VAUPÉS'),
	(99,'VICHADA');

