DROP DATABASE IF EXISTS car;
CREATE DATABASE car ;
USE car ;
CREATE TABLE user (
user_id int AUTO_INCREMENT  , 
email varchar (255) , 
password  varchar(255) , 
ip varchar(50) , 
login_time DATETIME , 
last_time_logged DATETIME , 
PRIMARY KEY(user_id)
) ; 
CREATE TABLE mechanic (
mechanic_id int AUTO_INCREMENT ,
email varchar (255) , 
namePlace varchar(200) , 
address varchar(200)
password  varchar(255) , 
ip varchar(50) , 
login_time DATETIME ,   
subscription int  , 
stars  int , 
countPoeple int , 
location varchar(200),  

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

CREATE TABLE favorite(
id int AUTO_INCREMENT , 
fav JSON , 
PRIMARY KEY(id) 
);


// prices is for the price of our subscription because the prices not fixed