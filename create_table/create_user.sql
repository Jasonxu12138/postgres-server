
create table users(
    users_id varchar(30) primary key,
    users_name varchar(10) not null,
    phone_number varchar(20) not null,
    wxopen_id varchar(100),
    created_at timestamp,
    updated_at timestamp,
    membershiplevel int,
    user_info varchar(30))