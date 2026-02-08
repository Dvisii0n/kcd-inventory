import { Client } from "pg";

const SQL = `

CREATE TABLE categories (
    id integer NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name character varying(25),
    imageurl text
);

CREATE TABLE items (
    id integer NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name character varying(255) NOT NULL,
    quantity integer DEFAULT 0 NOT NULL,
    power integer DEFAULT 0 NOT NULL,
    quality integer DEFAULT 100 NOT NULL,
    weight numeric(10,1) DEFAULT 0.0 NOT NULL,
    value numeric(10,1) DEFAULT 0.0 NOT NULL,
    category_id integer NOT NULL REFERENCES categories(id)
); 

INSERT INTO categories (name, imageurl) VALUES
  ('Armour', '/images/categories/armour.png'),
  ('Weapons', '/images/categories/weapons.png'),
  ('Food', '/images/categories/food.png'),
  ('Books', '/images/categories/books.png'),
  ('Materials', '/images/categories/materials.png'),
  ('Other', '/images/categories/other.png'),
  ('Horse', '/images/categories/horse.png');

INSERT INTO items (name, quantity, power, quality, weight, value, category_id) VALUES
  ('Longsword', 1, 75, 80, 1.8, 450.0, (SELECT id FROM categories WHERE name = 'Weapons')),
  ('Chainmail Hauberk', 1, 0, 85, 15.5, 850.0, (SELECT id FROM categories WHERE name = 'Armour')),
  ('Hunting Bow', 1, 60, 70, 0.9, 320.0, (SELECT id FROM categories WHERE name = 'Weapons')),
  ('Roasted Meat', 5, 0, 50, 0.3, 15.0, (SELECT id FROM categories WHERE name = 'Food')),
  ('Saviour Schnapps', 3, 0, 100, 0.2, 120.0, (SELECT id FROM categories WHERE name = 'Other')),
  ('Leather Boots', 1, 0, 60, 1.2, 180.0, (SELECT id FROM categories WHERE name = 'Armour')),
  ('Iron Ore', 10, 0, 40, 2.5, 25.0, (SELECT id FROM categories WHERE name = 'Materials')),
  ('Warhorse Jenda', 1, 0, 90, 0.0, 2500.0, (SELECT id FROM categories WHERE name = 'Horse')),
  ('Herbalism Codex', 1, 0, 75, 0.5, 200.0, (SELECT id FROM categories WHERE name = 'Books')),
  ('Mace', 1, 65, 70, 2.1, 380.0, (SELECT id FROM categories WHERE name = 'Weapons')),
  ('Padded Coif', 1, 0, 55, 0.8, 95.0, (SELECT id FROM categories WHERE name = 'Armour')),
  ('Dried Mushrooms', 8, 0, 45, 0.1, 8.0, (SELECT id FROM categories WHERE name = 'Food')),
  ('Lockpicks', 15, 0, 60, 0.1, 5.0, (SELECT id FROM categories WHERE name = 'Other')),
  ('Cuman Axe', 1, 70, 65, 1.5, 290.0, (SELECT id FROM categories WHERE name = 'Weapons'));
`;

async function populateDb() {
	console.log("populating database...");
	const client = new Client({
		connectionString: process.env.DATABASE_URL,
	});

	await client.connect();
	await client.query(SQL);
	await client.end();
	console.log("all set");
}

populateDb();
