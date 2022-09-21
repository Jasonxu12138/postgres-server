create table ErpProduct(
    productID varchar(100) not null primary key,
    code varchar(50) not null,
    productName varchar(50) not null,
    productWeight varchar(50),
    mid_qty varchar(50),
    props_id varchar(50),
    brand_id varchar(50),
    tax_pct varchar(50),
    unit varchar (50),
    createdAt timestamp,
    updatedAt timestamp,
    isProcessed boolean
    )