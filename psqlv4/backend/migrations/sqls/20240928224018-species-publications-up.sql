CREATE TABLE species_publications (
  species_id INTEGER NOT NULL,
  publication_id INTEGER NOT NULL,
  CONSTRAINT fk_species FOREIGN KEY (species_id) REFERENCES species (species_id),
  CONSTRAINT fk_publication FOREIGN KEY (publication_id) REFERENCES publications (publication_id)
);

INSERT INTO species_publications (species_id, publication_id) VALUES

  ((SELECT species_id FROM species WHERE species_name = 'forsteri'), (SELECT publication_id FROM publications WHERE title = 'The Social Structure of Penguin Colonies')),
  ((SELECT species_id FROM species WHERE species_name = 'maritimus maritimus'), (SELECT publication_id FROM publications WHERE title = 'Polar Bears in the Arctic Circle')),
  
  ((SELECT species_id FROM species WHERE species_name = 'chaus chaus'), (SELECT publication_id FROM publications WHERE title = 'Whisker Development in Feline Species')),
  ((SELECT species_id FROM species WHERE species_name = 'chaus chaus'), (SELECT publication_id FROM publications WHERE title = 'Effect of Cats on Rural Ecosystems')),
  
  ((SELECT species_id FROM species WHERE species_name = 'chaus furax'), (SELECT publication_id FROM publications WHERE title = 'Whisker Development in Feline Species')),
  ((SELECT species_id FROM species WHERE species_name = 'chaus kutas'), (SELECT publication_id FROM publications WHERE title = 'Whisker Development in Feline Species')),
  ((SELECT species_id FROM species WHERE species_name = 'margarita'), (SELECT publication_id FROM publications WHERE title = 'Study of the diet of the Felis Margarita')),

  ((SELECT species_id FROM species WHERE species_name = 'callidryas'), (SELECT publication_id FROM publications WHERE title = 'The Mating Habits of Jungle Frogs')),
  
  ((SELECT species_id FROM species WHERE species_name = 'lagopus'), (SELECT publication_id FROM publications WHERE title = 'The Adaptation of Arctic Foxes to Harsh Environments'))
  ;
