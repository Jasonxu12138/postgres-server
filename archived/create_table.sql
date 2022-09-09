create table client(
    client_id int primary key,
    client_name varchar(20) not null,
    phone_number varchar(20) not null,
    email_address varchar(100),
    client_address varchar(100) not null,
    client_area varchar(100) not null,
    total_amount_ordered decimal(10,2) not null
)
insert into client(client_id,client_name,phone_number,email_address,client_address,client_area, total_amount_ordered)
values(001,'jason','6476461266','1102528186@qq.com','123 coventry crt richmond hill','ON',10000)

insert into client(client_id,client_name,phone_number,email_address,client_address,client_area, total_amount_ordered)
values(002,'sam','6476466677','xujingyao@gmail.com','3 coventry crt richmond hill','ON',1000)

insert into client(client_id,client_name,phone_number,email_address,client_address,client_area, total_amount_ordered)
values(003,'tina','6477098777','tina123@gmail.com','3 cry crt richmond','BC',1000)

insert into client(client_id,client_name,phone_number,email_address,client_address,client_area, total_amount_ordered)
values(004,'yilin','6477993799','elim000321@gmail.com','23 cry crt richmond','BC',3000)

insert into client(client_id,client_name,phone_number,email_address,client_address,client_area, total_amount_ordered)
values(005,'daddy','1594472932','daddy@gmail.com','23 wellsey crt richmond','AB',4999)


create table employee(
    employee_id int ,
    employee_name varchar(10) not null,
    phone_number varchar(20) not null,
    position varchar(20) not null,
    area varchar(100) not null,
    order_id varchar(100) not null,
    total_amount_selling int,
    primary key (employee_id, order_id)
)


insert into employee(employee_id,employee_name,phone_number,position,area,order_id,total_amount_selling)
values(10032,'Sam Huang','6476665111','manager','ON',001,2000)

insert into employee(employee_id,employee_name,phone_number,position,area,order_id,total_amount_selling)
values(10032,'Sam Huang','6476665111','manager','ON',002,2000)

insert into employee(employee_id,employee_name,phone_number,position,area,order_id,total_amount_selling)
values(10033,'Jason Xu','6476611266','sales','BC',1003,200)

insert into employee(employee_id,employee_name,phone_number,position,area,order_id,total_amount_selling)
values(10033,'Jason Xu','6476611266','sales','BC',1002,500)



create table product(
    product_id varchar(100) primary key,
    product_name varchar(100) not null,
    unit_price decimal(10,2) not null,
    brand varchar(10),
    img_url varchar(200),
    stock int not null check (stock >= 0))

insert into product(product_id,product_name,unit_price,brand,img_url,stock)
values('100124','macbook256g black',1000.99,'US','1',10)

insert into product(product_id,product_name,unit_price,brand,img_url,stock)
values('100123','macbook256g pink',1000.99,'US','1',10)

insert into product(product_id,product_name,unit_price,brand,img_url,stock)
values('100144','macair 256g black',800.99,'US','1',10)

insert into product(product_id,product_name,unit_price,brand,img_url,stock)
values('200124','airpos',59.99,'China','1',100)

insert into product(product_id,product_name,unit_price,brand,img_url,stock)
values('201230124','iphone 14 256g blue',1999.99,'China','1',100)

create table projects(
    project_id varchar(500) not null,
    client_id varchar (100) not null,
    sale_id varchar (100) not null,
    product_id varchar(100) not null,
    quantity int,
    project_amount decimal(10,2),
    area varchar (100) not null,
    project_status varchar (100) not null,
    shipped_address varchar (100) not null,
    deliver_employee varchar(100) not null,
    primary key (project_id,product_id)
)

insert into projects(project_id,client_id,sale_id,product_id,quantity,project_amount,area,project_status,shipped_address,deliver_employee)
values('001',001,10032,'100124','10','10009.9','ON','paid','123 coventry richmond hill', 'sam')

insert into projects(project_id,client_id,sale_id,product_id,quantity,project_amount,area,project_status,shipped_address,deliver_employee)
values('002',001,10032,'100123','1','1009.9','ON','paid','123 coventry richmond hill', 'sam')

insert into projects(project_id,client_id,sale_id,product_id,quantity,project_amount,area,project_status,shipped_address,deliver_employee)
values('003',001,10032,'100144','1','800.9','ON','paid','123 coventry richmond hill', 'sam')




insert into projects(project_id,client_id,sale_id,area,project_status,shipped_address,deliver_employee)
values(002,001,10032,'ON','paid','123 coventry richmond hill', 'sam')

insert into projects(project_id,client_id,sale_id,area,project_status,shipped_address,deliver_employee)
values(003,001,10032,'ON','paid','123 coventry richmond hill', 'sam')

insert into projects(project_id,client_id,sale_id,area,project_status,shipped_address,deliver_employee)
values(004,002,10032,'ON','paid','13 cry crt richmond hill', 'sam')

insert into projects(project_id,client_id,sale_id,area,project_status,shipped_address,deliver_employee)
values(005,002,10032,'ON','paid','13 cry crt richmond hill', 'sam')

CREATE TABLE projects_detail (
    product_id character varying(100),
    quantity integer,
    unit_price numeric(10,2),
    discount numeric(10,2),
    sum_total numeric(10,2)
);
















create table customers(
    customer_number varchar(30) primary key,
    customer_name varchar(30) not null,
    phone varchar(15) not null,
    address_line varchar(100) not null,
    city varchar (10) not null,
    postal_code varchar(20) not null,
    sales_rep_employee_num varchar(30) not null,
    credit decimal(10,2)
)
insert into customers(customer_number,customer_name,phone,address_line,city,postal_code,sales_rep_employee_num,credit)
values ('101','jingyao','6476461266','23 coventry crt','richmond','l4c8b8','12138',100)

insert into customers(customer_number,customer_name,phone,address_line,city,postal_code,sales_rep_employee_num,credit)
values ('102','yilin','6476463799','23 coventry crt','richmond','l4c8b8','12138',200)

insert into customers(customer_number,customer_name,phone,address_line,city,postal_code,sales_rep_employee_num,credit)
values ('103','mumu','6476463799','212313 coventry crt','richmond','l4c8b8','12158',00),
('104','huang','64764123799','21213 coventry crt','richmond','l4c8b8','12158',00),
('105','jason','64764123799','21213 coventry crt','richmond','l4c8b8','121',00),
('106','sam','64764123799','21213 coventry crt','richmond','l4c8b8','121',00)

create table orders(
    order_number varchar(30) primary key,
    order_date timestamp,
    required_date timestamp,
    shipped_date timestamp,
    statues varchar(20),
    customer_number varchar(20)
)
insert into orders(order_number,order_date,required_date,shipped_date,statues,customer_number)
values ('1001','2011-02-12 00:23:19','2011-02-12 23:30:00','2011-02-12 23:45:19','perparing','101')
, ('1002','2011-02-12 00:23:19','2011-02-12 23:30:00','2011-02-12 23:45:19','perparing','101')
,('1003','2011-02-12 00:23:19','2011-02-12 23:30:00','2011-02-12 23:45:19','perparing','102')
 ,('1004','2011-02-12 00:23:19','2011-02-12 23:30:00','2011-02-12 23:45:19','finished','102')
,('1005','2011-02-12 00:23:19','2011-02-12 23:30:00','2011-02-12 23:45:19','finished','103')
,('1006','2011-02-12 00:23:19','2011-02-12 23:30:00','2011-02-12 23:45:19','finished','104')
,('1007','2011-02-12 00:23:19','2011-02-12 23:30:00','2012-07-12 23:45:19','waiting supply','105')
 ,('1008','2011-02-12 00:23:19','2011-02-12 23:30:00','2012-07-12 23:45:19','waiting supply','106')

create table payments(
    customer_number varchar(30),
    payment_time timestamp,
    amount int
)

insert into payments(customer_number,payment_time,amount)
values ('101','2011-12-20 20:23:05',100)

insert into payments(customer_number,payment_time,amount)
values ('106','2011-12-28 21:23:05',299.99)

create table orderdetails(
    order_number varchar(30) primary key,
    product_code varchar(30),
    quantity int,
    unit_price decimal(10,2)
)
insert into orderdetails(order_number, product_code, quantity, unit_price)
values('1001','00001',100,99.99),('1002','00002',90,1000)


create table products(
    product_code varchar(30) primary key,
    product_name varchar(20),
    quantity_in_stock int,
    unit_price decimal(10,2)
)
insert into products(product_code,product_name,quantity_in_stock,unit_price)
values ('00001','ssdlh',12314,123.96),
('00002','dadasss',112,99.99),
('00003','ssdl22h',12314,123.96),
('00004','dada222',10000,100.99)

create table employee(
    employee_num varchar(30) primary key,
    employee_name varchar(20),
    email_address varchar(50),
    phone varchar(15),
    job_title varchar(15),
    office_code varchar(20)
)
insert into employee(employee_num,employee_name,email_address,phone,job_title,office_code)
values ('12138','james','1102528186@qq.com','13121807701','sales','ON')
,('12158','jack','499456213@qq.com','137011217878','sales','ON')
,('121','java','jingyaoxu2@gmail.com','13702122787','manager','BC')