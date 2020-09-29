CREATE TABLE dispositivos_usuario(
id                      int(255) auto_increment not null, 
user_id                int(255) not null, 
token                     varchar(1000) not null, 
created_at       datetime DEFAULT NULL,    
updated_at       datetime DEFAULT NULL,
CONSTRAINT pk_dispositivos PRIMARY KEY(id),
CONSTRAINT fk_dispositivo_user FOREIGN KEY (user_id) REFERENCES users(id)
)ENGINE=InnoDb;
