CREATE TABLE authors_publications (
  author SERIAL NOT NULL,
  publication SERIAL NOT NULL,
  CONSTRAINT fk_author FOREIGN KEY (author) REFERENCES authors (author_id),
  CONSTRAINT fk_publication FOREIGN KEY (publication) REFERENCES publications (publication_id)
);

INSERT INTO authors_publications (author, publication) 
VALUES ((SELECT author_id FROM authors WHERE first_name = 'Blizzard' AND last_name_1 = 'Entertainment'), (SELECT publication_id FROM publications WHERE title = 'The World of Warcraft'));

INSERT INTO authors_publications (author, publication) 
VALUES 
  ((SELECT author_id FROM authors WHERE first_name = 'Charles' AND last_name_1 = 'Darwin'), (SELECT publication_id FROM publications WHERE title = 'The Social Structure of Penguin Colonies')),
  ((SELECT author_id FROM authors WHERE first_name = 'Charles' AND last_name_1 = 'Darwin'), (SELECT publication_id FROM publications WHERE title = 'Polar Bears in the Arctic Circle')),
  ((SELECT author_id FROM authors WHERE first_name = 'James' AND last_name_1 = 'Watson'), (SELECT publication_id FROM publications WHERE title = 'Whisker Development in Feline Species')),
  ((SELECT author_id FROM authors WHERE first_name = 'Barbara' AND last_name_1 = 'McClintock'), (SELECT publication_id FROM publications WHERE title = 'The Mating Habits of Jungle Frogs')),
  ((SELECT author_id FROM authors WHERE first_name = 'Lynn' AND last_name_1 = 'Margulis'), (SELECT publication_id FROM publications WHERE title = 'The Adaptation of Arctic Foxes to Harsh Environments'));