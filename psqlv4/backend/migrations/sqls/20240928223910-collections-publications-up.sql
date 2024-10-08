CREATE TABLE collections_publications (
  collection INTEGER NOT NULL,
  publication INTEGER NOT NULL,
  CONSTRAINT fk_collection FOREIGN KEY (collection) REFERENCES collections (collection_id),
  CONSTRAINT fk_publication FOREIGN KEY (publication) REFERENCES publications (publication_id)
);


INSERT INTO collections_publications (collection, publication) 
VALUES 
  ((SELECT collection_id FROM collections WHERE collection_name = 'Tundra'), (SELECT publication_id FROM publications WHERE title = 'The Social Structure of Penguin Colonies')),
  ((SELECT collection_id FROM collections WHERE collection_name = 'Tundra'), (SELECT publication_id FROM publications WHERE title = 'Polar Bears in the Arctic Circle')),
  
  ((SELECT collection_id FROM collections WHERE collection_name = 'Tundra'), (SELECT publication_id FROM publications WHERE title = 'The Adaptation of Arctic Foxes to Harsh Environments')),
  ((SELECT collection_id FROM collections WHERE collection_name = 'Jungle'), (SELECT publication_id FROM publications WHERE title = 'The Mating Habits of Jungle Frogs')),
  ((SELECT collection_id FROM collections WHERE collection_name = 'Domestic'), (SELECT publication_id FROM publications WHERE title = 'Whisker Development in Feline Species')),

  ((SELECT collection_id FROM collections WHERE collection_name = 'Desert'), (SELECT publication_id FROM publications WHERE title = 'Study of the diet of the Felis Margarita'))
;