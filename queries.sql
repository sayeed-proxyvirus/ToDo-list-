CREATE TABLE todolist (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100)
);


select * from todolist
Update todolist set title = 'Noodles' Where id = 1;
Delete from todolist where id = 3;
Insert into todolist (title) values ('Food')