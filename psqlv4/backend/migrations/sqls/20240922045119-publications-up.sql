CREATE TABLE publications (
  publication_id INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author INTEGER NOT NULL,
  date DATE NOT NULL,
  publisher VARCHAR(255) NOT NULL,
  isbn VARCHAR(20) NOT NULL,
  doi VARCHAR(100) NOT NULL,
  country INTEGER,
  institution INTEGER,
  CONSTRAINT fk_country FOREIGN KEY (country) REFERENCES countries (country_id),
  CONSTRAINT fk_author FOREIGN KEY (author) REFERENCES authors (author_id),
  CONSTRAINT fk_institution FOREIGN KEY (institution) REFERENCES institutions (institution_id)
);

INSERT INTO publications (title, author, date, publisher, isbn, doi, country, institution) 
VALUES 
  ('The Social Structure of Penguin Colonies', 
  (SELECT author_id FROM authors WHERE personal_id = '111111111'), 
  '1953-04-25', 'Nature Publishing Group', '978-0-306-44432-0', '10.1038/171737a0', 
  (SELECT country_id FROM countries WHERE country_name = 'United Kingdom'), 
  (SELECT institution_id FROM institutions WHERE institution_name = 'University of Cambridge')),
  
  ('Polar Bears in the Arctic Circle', 
  (SELECT author_id FROM authors WHERE personal_id = '111111111'), 
  '1859-11-24', 'John Murray', '978-0-486-45006-0', '10.5962/bhl.title.48994', 
  (SELECT country_id FROM countries WHERE country_name = 'United Kingdom'), 
  (SELECT institution_id FROM institutions WHERE institution_name = 'Royal Society')),
  
  ('Whisker Development in Feline Species', 
  (SELECT author_id FROM authors WHERE personal_id = '444444444'), 
  '1968-02-01', 'Atheneum', '978-0-689-70602-9', '10.1038/scientificamerican0268-82', 
  (SELECT country_id FROM countries WHERE country_name = 'United States'), 
  (SELECT institution_id FROM institutions WHERE institution_name = 'Harvard University')),
  
  ('Effect of Cats on Rural Ecosystems', 
  (SELECT author_id FROM authors WHERE personal_id = '444444444'), 
  '1988-04-07', 'Atheneum', '978-0-789-70782-9', '10.1038/scientificamerican0268-82', 
  (SELECT country_id FROM countries WHERE country_name = 'United States'), 
  (SELECT institution_id FROM institutions WHERE institution_name = 'University of Cambridge')),

  ('The Mating Habits of Jungle Frogs', 
  (SELECT author_id FROM authors WHERE personal_id = '666666666'), 
  '1941-01-01', 'University of Missouri', '978-0-8165-1224-7', '10.2307/2436473', 
  (SELECT country_id FROM countries WHERE country_name = 'United States'), 
  (SELECT institution_id FROM institutions WHERE institution_name = 'Cornell University')),

  ('Study of the diet of the Felis Margarita', 
  (SELECT author_id FROM authors WHERE personal_id = '444444444'), 
  '2004-06-12', 'Atheneum', '978-0-799-77782-9', '10.1078/scientificamerican0268-82', 
  (SELECT country_id FROM countries WHERE country_name = 'United Kingdom'), 
  (SELECT institution_id FROM institutions WHERE institution_name = 'University of Cambridge')),
  
  ('The Adaptation of Arctic Foxes to Harsh Environments', 
  (SELECT author_id FROM authors WHERE personal_id = '888888888'), 
  '1967-01-01', 'W.W. Norton & Company', '978-0-393-00550-4', '10.1126/science.157.3793.1183', 
  (SELECT country_id FROM countries WHERE country_name = 'United States'), 
  (SELECT institution_id FROM institutions WHERE institution_name = 'University of Massachusetts Amherst'));