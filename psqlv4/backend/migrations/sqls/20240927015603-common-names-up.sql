CREATE TABLE common_names (
  common_name_id INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  common_name VARCHAR(255) NOT NULL UNIQUE,
  species_id INTEGER NOT NULL,
  CONSTRAINT fk_species FOREIGN KEY (species_id) REFERENCES species (species_id)
);

INSERT INTO common_names (common_name, species_id) VALUES
  ('cat', (SELECT species_id FROM species WHERE species_name = 'silvestris catus')),

  ('polar bear', (SELECT species_id FROM species WHERE species_name = 'maritimus maritimus')),
  ('oso bimbo', (SELECT species_id FROM species WHERE species_name = 'maritimus maritimus')),

  ('pingüino', (SELECT species_id FROM species WHERE species_name = 'forsteri')),

  ('rana', (SELECT species_id FROM species WHERE species_name = 'callidryas'));
