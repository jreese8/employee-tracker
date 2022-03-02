INSERT INTO departments (name)
VALUES
  ('Managers'),
  ('Salaries');

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
  ('James', 'Fraser', 1, 2),
  ('Jack', 'London', 2, 1),
  ('Robert', 'Bruce', 3, 2),
  ('Peter', 'Greenaway', 1, 2),
  ('Derek', 'Jarman', 2, 2),
  ('Paolo', 'Pasolini', 1, 2),
  ('Heathcote', 'Williams', 2, 1),
  ('Sandy', 'Powell', 1, 2),
  ('Emil', 'Zola', 1, 2);