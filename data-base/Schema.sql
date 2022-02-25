DROP DATABASE IF EXISTS car;
CREATE DATABASE car ;
USE car ;
CREATE TABLE user (
user_id int AUTO_INCREMENT  , 
   username varchar (200) COLLATE utf8mb4_unicode_ci NOT NULL ,
email varchar (255) COLLATE utf8mb4_unicode_ci NOT NULL , 
password  varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL , 
ip varchar(50) ,
last_login datetime , 
login_time datetime , 
last_time_logged datetime , 
PRIMARY KEY(user_id),
UNIQUE KEY email (email)
)ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;




CREATE TABLE mechanic (
mechanic_id int AUTO_INCREMENT ,
email varchar (255) , 
password  varchar(255) , 
ip varchar(50) , 
login_time DATETIME ,   
subscription int  , 
PRIMARY KEY(mechanic_id)

); 
CREATE TABLE admin  (
admin_id  int AUTO_INCREMENT ,
email varchar (255) , 
password  varchar(255) , 
ip varchar(50) , 
login_time DATETIME ,
PRIMARY KEY(admin_id)

) ; 
CREATE TABLE reservation (
    id int AUTO_INCREMENT , 
    mechanic_id  int , 
    reservation JSON  ,  
PRIMARY KEY(id)

) ; 

CREATE TABLE prices (
     id int AUTO_INCREMENT , 
     price JSON ,
PRIMARY KEY(id)

) ; 

CREATE TABLE last_github(
id int AUTO_INCREMENT , 
last DATETIME , 
PRIMARY KEY(id)


);

CREATE TABLE  reviews (
id int AUTO_INCREMENT , 
review longtext   , 
PRIMARY KEY(id)
);
-- // prices is for the price of our subscription because the prices not fixed