create table orders(
    order_id varchar(30) primary key not null,
    created_at timestamp not null,
    updated_at timestamp,
    is_active varchar(20) not null,
    wxopen_id varchar(100),
    users_name varchar(10) not null,
    order_status int not null)