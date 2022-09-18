create table product(
    created_at timestamp,
    updated_at timestamp,
    product_uid UUID not null primary key,
    product_name varchar(20),
    ProductCategoryID varchar(50),
    brand varchar(30),
    quantity_in_stock int,
    unit_price decimal(10,2),
    mainimgurl varchar(50),
    descimg varchar(50),
    level_1_id varchar(50),
    level_2_id varchar(50),
    color varchar(20),
    size varchar(20)
)

create EXTENSION IF NOT EXISTS "uuid-ossp"
