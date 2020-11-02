CREATE TABLE conductores(
id                      int(255) auto_increment not null, 
nombre                    varchar(1000) not null, 
apellidos                 varchar(1000) not null, 
foto                     varchar(1000) not null, 
created_at       datetime DEFAULT NULL,    
updated_at       datetime DEFAULT NULL,
CONSTRAINT pk_conductores PRIMARY KEY(id)
)ENGINE=InnoDb;


CREATE TABLE ruta(
id                      int(255) auto_increment not null, 
nombre                    varchar(1000) not null, 

created_at       datetime DEFAULT NULL,    
updated_at       datetime DEFAULT NULL,
CONSTRAINT pk_ruta PRIMARY KEY(id)
)ENGINE=InnoDb;

CREATE TABLE ruta_departamento(
id                      int(255) auto_increment not null, 
id_ruta                 int(255) not null, 
id_departamento         int(255) not null, 

created_at       datetime DEFAULT NULL,    
updated_at       datetime DEFAULT NULL,
CONSTRAINT ruta_departamento PRIMARY KEY(id),
CONSTRAINT fk_rutad_ruta FOREIGN KEY (id_ruta) REFERENCES ruta(id),
CONSTRAINT fk_rutad_departamento FOREIGN KEY (id_departamento) REFERENCES departamentos(id)

)ENGINE=InnoDb;



TRUNCATE TABLE `ruta`;
INSERT INTO `ruta` (`id`, `nombre`, `created_at`, `updated_at`) VALUES (NULL, 'ANTIOQUIA', '2020-10-03 12:16:28', '2020-10-03 12:16:28');
INSERT INTO `ruta` (`id`, `nombre`, `created_at`, `updated_at`) VALUES (NULL, 'BOYACA', '2020-10-03 12:16:28', '2020-10-03 12:16:28');
INSERT INTO `ruta` (`id`, `nombre`, `created_at`, `updated_at`) VALUES (NULL, 'CAUCA', '2020-10-03 12:16:28', '2020-10-03 12:16:28');
INSERT INTO `ruta` (`id`, `nombre`, `created_at`, `updated_at`) VALUES (NULL, 'CUNDINAMARCA', '2020-10-03 12:16:28', '2020-10-03 12:16:28');
INSERT INTO `ruta` (`id`, `nombre`, `created_at`, `updated_at`) VALUES (NULL, 'EJE CAFETERO', '2020-10-03 12:16:28', '2020-10-03 12:16:28');
INSERT INTO `ruta` (`id`, `nombre`, `created_at`, `updated_at`) VALUES (NULL, 'HUILA', '2020-10-03 12:16:28', '2020-10-03 12:16:28');
INSERT INTO `ruta` (`id`, `nombre`, `created_at`, `updated_at`) VALUES (NULL, 'NARIÑO', '2020-10-03 12:16:28', '2020-10-03 12:16:28');
INSERT INTO `ruta` (`id`, `nombre`, `created_at`, `updated_at`) VALUES (NULL, 'SANTANDERES', '2020-10-03 12:16:28', '2020-10-03 12:16:28');
INSERT INTO `ruta` (`id`, `nombre`, `created_at`, `updated_at`) VALUES (NULL, 'TOLIMA', '2020-10-03 12:16:28', '2020-10-03 12:16:28');
INSERT INTO `ruta` (`id`, `nombre`, `created_at`, `updated_at`) VALUES (NULL, 'VALLE DEL CAUCA', '2020-10-03 12:16:28', '2020-10-03 12:16:28');


-- desarrollo

TRUNCATE TABLE `ruta_departamento`;

INSERT INTO `ruta_departamento` (`id`, `id_ruta`, `id_departamento`, `created_at`, `updated_at`) VALUES (NULL, '1', '34', '2020-10-03 12:56:59', '2020-10-03 12:56:59');
INSERT INTO `ruta_departamento` (`id`, `id_ruta`, `id_departamento`, `created_at`, `updated_at`) VALUES (NULL, '2', '38', '2020-10-03 12:56:59', '2020-10-03 12:56:59');
INSERT INTO `ruta_departamento` (`id`, `id_ruta`, `id_departamento`, `created_at`, `updated_at`) VALUES (NULL, '3', '41', '2020-10-03 12:56:59', '2020-10-03 12:56:59');
INSERT INTO `ruta_departamento` (`id`, `id_ruta`, `id_departamento`, `created_at`, `updated_at`) VALUES (NULL, '4', '36', '2020-10-03 12:56:59', '2020-10-03 12:56:59');
INSERT INTO `ruta_departamento` (`id`, `id_ruta`, `id_departamento`, `created_at`, `updated_at`) VALUES (NULL, '4', '44', '2020-10-03 12:56:59', '2020-10-03 12:56:59');
INSERT INTO `ruta_departamento` (`id`, `id_ruta`, `id_departamento`, `created_at`, `updated_at`) VALUES (NULL, '5', '39', '2020-10-03 12:56:59', '2020-10-03 12:56:59');
INSERT INTO `ruta_departamento` (`id`, `id_ruta`, `id_departamento`, `created_at`, `updated_at`) VALUES (NULL, '5', '52', '2020-10-03 12:56:59', '2020-10-03 12:56:59');
INSERT INTO `ruta_departamento` (`id`, `id_ruta`, `id_departamento`, `created_at`, `updated_at`) VALUES (NULL, '5', '53', '2020-10-03 12:56:59', '2020-10-03 12:56:59');
INSERT INTO `ruta_departamento` (`id`, `id_ruta`, `id_departamento`, `created_at`, `updated_at`) VALUES (NULL, '6', '40', '2020-10-03 12:56:59', '2020-10-03 12:56:59');
INSERT INTO `ruta_departamento` (`id`, `id_ruta`, `id_departamento`, `created_at`, `updated_at`) VALUES (NULL, '6', '46', '2020-10-03 12:56:59', '2020-10-03 12:56:59');
INSERT INTO `ruta_departamento` (`id`, `id_ruta`, `id_departamento`, `created_at`, `updated_at`) VALUES (NULL, '7', '50', '2020-10-03 12:56:59', '2020-10-03 12:56:59');
INSERT INTO `ruta_departamento` (`id`, `id_ruta`, `id_departamento`, `created_at`, `updated_at`) VALUES (NULL, '8', '51', '2020-10-03 12:56:59', '2020-10-03 12:56:59');
INSERT INTO `ruta_departamento` (`id`, `id_ruta`, `id_departamento`, `created_at`, `updated_at`) VALUES (NULL, '8', '54', '2020-10-03 12:56:59', '2020-10-03 12:56:59');
INSERT INTO `ruta_departamento` (`id`, `id_ruta`, `id_departamento`, `created_at`, `updated_at`) VALUES (NULL, '9', '56', '2020-10-03 12:56:59', '2020-10-03 12:56:59');
INSERT INTO `ruta_departamento` (`id`, `id_ruta`, `id_departamento`, `created_at`, `updated_at`) VALUES (NULL, '10', '57', '2020-10-03 12:56:59', '2020-10-03 12:56:59');




-- produccion

TRUNCATE TABLE `ruta_departamento`;

INSERT INTO `ruta_departamento` (`id`, `id_ruta`, `id_departamento`, `created_at`, `updated_at`) VALUES (NULL, '1', '1', '2020-10-03 12:56:59', '2020-10-03 12:56:59');
INSERT INTO `ruta_departamento` (`id`, `id_ruta`, `id_departamento`, `created_at`, `updated_at`) VALUES (NULL, '2', '5', '2020-10-03 12:56:59', '2020-10-03 12:56:59');
INSERT INTO `ruta_departamento` (`id`, `id_ruta`, `id_departamento`, `created_at`, `updated_at`) VALUES (NULL, '3', '8', '2020-10-03 12:56:59', '2020-10-03 12:56:59');
INSERT INTO `ruta_departamento` (`id`, `id_ruta`, `id_departamento`, `created_at`, `updated_at`) VALUES (NULL, '4', '3', '2020-10-03 12:56:59', '2020-10-03 12:56:59');
INSERT INTO `ruta_departamento` (`id`, `id_ruta`, `id_departamento`, `created_at`, `updated_at`) VALUES (NULL, '4', '11', '2020-10-03 12:56:59', '2020-10-03 12:56:59');
INSERT INTO `ruta_departamento` (`id`, `id_ruta`, `id_departamento`, `created_at`, `updated_at`) VALUES (NULL, '5', '6', '2020-10-03 12:56:59', '2020-10-03 12:56:59');
INSERT INTO `ruta_departamento` (`id`, `id_ruta`, `id_departamento`, `created_at`, `updated_at`) VALUES (NULL, '5', '19', '2020-10-03 12:56:59', '2020-10-03 12:56:59');
INSERT INTO `ruta_departamento` (`id`, `id_ruta`, `id_departamento`, `created_at`, `updated_at`) VALUES (NULL, '5', '20', '2020-10-03 12:56:59', '2020-10-03 12:56:59');
INSERT INTO `ruta_departamento` (`id`, `id_ruta`, `id_departamento`, `created_at`, `updated_at`) VALUES (NULL, '6', '7', '2020-10-03 12:56:59', '2020-10-03 12:56:59');
INSERT INTO `ruta_departamento` (`id`, `id_ruta`, `id_departamento`, `created_at`, `updated_at`) VALUES (NULL, '6', '13', '2020-10-03 12:56:59', '2020-10-03 12:56:59');
INSERT INTO `ruta_departamento` (`id`, `id_ruta`, `id_departamento`, `created_at`, `updated_at`) VALUES (NULL, '7', '17', '2020-10-03 12:56:59', '2020-10-03 12:56:59');
INSERT INTO `ruta_departamento` (`id`, `id_ruta`, `id_departamento`, `created_at`, `updated_at`) VALUES (NULL, '8', '18', '2020-10-03 12:56:59', '2020-10-03 12:56:59');
INSERT INTO `ruta_departamento` (`id`, `id_ruta`, `id_departamento`, `created_at`, `updated_at`) VALUES (NULL, '8', '21', '2020-10-03 12:56:59', '2020-10-03 12:56:59');
INSERT INTO `ruta_departamento` (`id`, `id_ruta`, `id_departamento`, `created_at`, `updated_at`) VALUES (NULL, '9', '23', '2020-10-03 12:56:59', '2020-10-03 12:56:59');
INSERT INTO `ruta_departamento` (`id`, `id_ruta`, `id_departamento`, `created_at`, `updated_at`) VALUES (NULL, '10', '24', '2020-10-03 12:56:59', '2020-10-03 12:56:59');












    select u.id, u.name, u.surname, f.nombre Finca,r.nombre ruta   , usm.token
    from u557099357_api_restrucha.fincas f
    left join u557099357_api_restrucha.users u on u.id = f.user_id
    right join u557099357_api_restrucha.users_movil usm on usm.user_id = u.id 
    left join u557099357_api_restrucha.municipios m on m.id = f.id_municipio
    left join u557099357_api_restrucha.departamentos d on d.id_departamento = m.cod_dane_departamento
    left join u557099357_api_restrucha.ruta_departamento rd on rd.id_departamento = d.id
    left join u557099357_api_restrucha.ruta r on r.id = rd.id_ruta

    left join u557099357_api_restrucha.pedidos p on p.id_finca = f.id
    left join u557099357_api_restrucha.despachos des on des.id =p.id_despacho

    where u.role = 'USUARIO'
    and des.id = 7








