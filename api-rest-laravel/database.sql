/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 * Author:  diegomontealegregarcia
 * Created: 22-Jun-2020
 */

drop datbase api_rest_larabel;
create database  if not EXISTS api_rest_larabel;

use api_rest_larabel;

CREATE TABLE users
 (
id              int(255) auto_increment not null, 
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
CONSTRAINT pk_users PRIMARY KEY(id)
)ENGINE=InnoDb;


CREATE TABLE categories(
id              int(255) auto_increment not null, 
name            varchar(255) NOT NULL ,
created_at       datetime DEFAULT NULL,    
updated_at       datetime DEFAULT NULL,
CONSTRAINT pk_categories PRIMARY KEY(id)

)ENGINE=InnoDb;


CREATE TABLE posts(
id              int(255) auto_increment not null, 
user_id         int(255) not null,
category_id     int(255) not null,
title           varchar(255) NOT NULL ,
content         text NOT NULL,
created_at       datetime DEFAULT NULL,    
updated_at       datetime DEFAULT NULL,
CONSTRAINT pk_posts PRIMARY KEY(id),
CONSTRAINT fk_post_user FOREIGN KEY (user_id) REFERENCES users(id),
CONSTRAINT fk_post_category FOREIGN KEY (category_id) REFERENCES categories(id)

)ENGINE=InnoDb;


