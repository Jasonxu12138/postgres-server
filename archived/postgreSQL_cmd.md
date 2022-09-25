brew services
brew services restart
brew services start postgresql

psql: enter db cmd
\l: list db
\q: quite db cmd


psql -d database -U user -W	Connects to a database under a specific user	-d: used to state the database name 
-U: used to state the database user
psql -h host -d database -U user -W	Connect to a database that resides on another host	-h: used to state the host 
-d: used to state the database name 
-U:used to state the database user
psql -U user -h host “dbname=db sslmode=require”	Use SSL mode for the connection	-h: used to state the host 
-U:used to state the database user
\c dbname	Switch connection to a new database	 
\l	List available databases	 
\dt	List available tables	 
\d table_name	Describe a table such as a column, type, modifiers of columns, etc.	 
\dn	List all schemes of the currently connected database	 
\df	List available functions in the current database	 
\dv	List available views in the current database	 
\du	List all users and their assign roles	 
SELECT version();	Retrieve the current version of PostgreSQL server	 
\g	Execute the last command again	 
\s	Display command history	 
\s filename	Save the command history to a file	 
\i filename	Execute psql commands from a file	 
\?	Know all available psql commands	 
\h	Get help	Eg:to get detailed information on ALTER TABLE statement use the \h ALTER TABLE
\e	Edit command in your own editor	 
\a	Switch from aligned to non-aligned column output	 
\H	Switch the output to HTML format	 
\q	Exit psql shell	 

// 1:定义接口名称
// 2：引入SQL language


psql -h localhost -p 5432 -d jason -U jason -W

psql -h 47.104.211.31 -p 5432 -d jason_test1 -U postgres -W

\i + 拖拽加入的query

create UUID
先 create table with uuid ：car_uid uuid not null primary key
之后CREATE EXTENSION IF NOT EXISTS "uuid-ossp"
最后 insert into （uuid_generate_v4()）对应的uuid


postgreSQL_connection: {
"db": "",
"47.104.211.31": "5432",
"初始数据库": "postgres",
"用户名": "postgres",
"密码": "baddbg"
},


javasc
control+c 退出服务器
nodemon index.js 链接服务器api

库存更新 生成订单时 库存减少

control+C 退出command line when javascript crushed



psql -h <IP_Address> -p <port_no> -d <database_name> -U <DB_username> -W