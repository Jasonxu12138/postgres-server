create table lv2_category(
    level_2_id varchar(50) primary key,
    level_1_id varchar(50) not null,
    model varchar(50),
    made_year integer
)