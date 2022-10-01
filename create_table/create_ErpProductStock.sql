create table Erp_product_stock(
    product_id varchar(100) not null,
    branch_id varchar(100) not null,
    stock int not null,
    primary key(product_id,branch_id)
    )