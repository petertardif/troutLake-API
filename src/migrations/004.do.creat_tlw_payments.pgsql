CREATE TABLE payments (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  amount MONEY NOT NULL,
  payment_date DATE NOT NULL,
  payment_type TEXT NOT NULL,
  payment_status TEXT NOT NULL,
  paid_by INT
    REFERENCES users(id)  ON DELETE CASCADE,
  bill_id INT 
    REFERENCES bills(id) ON DELETE CASCADE
);