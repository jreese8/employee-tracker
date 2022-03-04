INSERT INTO departments (name)
VALUES
  ('Managers'),
  ('Sales');

INSERT INTO roles (title, department_id, salary)
VALUES
  ('CFO', 1, 30),
  ('CTO', 2, 28),
  ('Product Manager', 2, 20),
  ('Project Manager', 2, 22),
  ('Accoutant', 1, 10),
  ('Sales Representitive', 1, 15),
  ('Administrative Assistant', 2, 10),
  ('Customer Service Assistant', 2, 8);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('James', 'Fraser', 1, Null),
  ('Jack', 'London', 2, Null),
  ('Robert', 'Bruce', 2, Null),
  ('Peter', 'Greenaway', 1, Null),
  ('Derek', 'Jarman', 2, Null),
  ('Paolo', 'Pasolini', 1, 1),
  ('Heathcote', 'Williams', 2, 2),
  ('Sandy', 'Powell', 2, 3),
  ('Emil', 'Zola', 1, 4),
  ('Sissy', 'Coalpits', 1, 5);