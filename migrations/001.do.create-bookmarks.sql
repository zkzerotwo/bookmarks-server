

-- Create the table anew
create table bookmarks (
  id INTEGER primary key generated by default as identity,
  title VARCHAR(255),
  url VARCHAR(255),
  rating INTEGER,
  description text
);

-- insert some test data
