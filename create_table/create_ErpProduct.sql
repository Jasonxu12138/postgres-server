create table Erp_Product(
    product_id varchar(100) not null primary key,
    code varchar(50) unique not null,
    product_name varchar(50) not null,
    bar_code varchar (50)unique not null,
    product_weight varchar(50),
    mid_qty varchar(50),
    props_id varchar(50),
    brand_id varchar(50),
    tax_pct varchar(50),
    unit varchar (50),
    created_At timestamp,
    updated_At timestamp,
    is_Processed boolean,
    is_new boolean
    )


