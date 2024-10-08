CREATE TABLE institutions_publications (
  institution_id INTEGER NOT NULL,
  publication_id INTEGER NOT NULL,
  CONSTRAINT fk_institution FOREIGN KEY (institution_id) REFERENCES institutions (institution_id),
  CONSTRAINT fk_publication FOREIGN KEY (publication_id) REFERENCES publications (publication_id)
);

INSERT INTO institutions_publications (institution_id, publication_id) VALUES
  ((SELECT institution_id FROM institutions WHERE institution_name = 'Smithsonian Institution'), (SELECT publication_id FROM publications WHERE title = 'The World of Warcraft'));
