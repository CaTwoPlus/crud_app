INSERT INTO ADMIN (email, nev, jelszo, utolso_belepes_datuma) VALUES
('rick@citadel.com', 'Rick Sanchez', 'wubbalubbadubdub', '2024-10-09 14:30:00'),
('morty@citadel.com', 'Morty Smith', 'awjeez123', '2024-10-10 09:15:00'),
('summer@citadel.com', 'Summer Smith', 'keeplooking', '2024-10-08 18:45:00'),
('beth@citadel.com', 'Beth Smith', 'spacehorse22', '2024-10-07 20:00:00'),
('jerry@citadel.com', 'Jerry Smith', 'imloser666', '2024-10-06 10:30:00');

INSERT INTO CSATORNA (nev, kategoria, leiras) VALUES
('Interdimensional Cable', 'Szórakoztató', 'Végtelen dimenziók végtelen TV műsorai'),
('Blips and Chitz', 'Játék', 'Intergalaktikus játékterem és szórakoztató központ'),
('Gazorpazorp TV', 'Dráma', 'A Gazorpazorp bolygó legjobb drámái'),
('Gear World Network', 'Ismeretterjesztő', 'Minden, amit a fogaskerekekről tudni kell'),
('Plumbus Channel', 'Háztartási', 'A galaxis leghasznosabb háztartási eszközének dedikált csatorna');

INSERT INTO SZEREPLO (nev, szul_datum, nemzetiseg, foglalkozas) VALUES
('Ants in my Eyes Johnson', '1960-05-15', 'Földönkívüli', 'TV személyiség'),
('Two Brothers', '1985-08-22', 'Földi', 'Akcióhősök'),
('Stealy', '1995-03-10', 'Földönkívüli', 'Tolvaj'),
('Mr. Poopybutthole', '1980-12-01', 'Földönkívüli', 'Tanár'),
('Krombopulos Michael', '1970-07-30', 'Gromflomit', 'Bérgyilkos'),
('Strong Arm Jones', '1975-04-10', 'Földi', 'Zsoldos'),
('Blaster Bob', '1980-09-20', 'Földönkívüli', 'Robbanószer szakértő'),
('Laser Larry', '1982-06-15', 'Földi', 'Taktikai szakértő'),
('Sneaky Sam', '1978-11-02', 'Földönkívüli', 'Árnyék katona'),
('Roy', '1965-03-25', 'Földi', 'Átlagember'),
('Helen', '1968-02-18', 'Földi', 'Feleség'),
('Roy Jr.', '1990-12-12', 'Földi', 'Diák'),
('Old Man Roy', '1920-05-01', 'Földi', 'Nyugdíjas'),
('Plumbus Expert Zog', '1970-08-14', 'Plumbuszországi', 'Plumbus szakértő'),
('Technician Glorf', '1980-11-22', 'Földönkívüli', 'Gyártási technikus'),
('Instructor Beep', '1995-02-10', 'Gazorpian', 'Műszaki oktató'),
('Gearhead Greg', '1985-07-15', 'Földönkívüli', 'Mechanikai mérnök'),
('Rusty Wrench', '1978-09-10', 'Földi', 'Fogaskerék szakértő'),
('Torque Tina', '1990-11-25', 'Gearian', 'Mechanikai technikus'),
('Professor Plumb', '1962-05-30', 'Földönkívüli', 'Plumbus mester'),
('Master Krilb', '1975-01-22', 'Plumbuszországi', 'Plumbus használati oktató'),
('Dr. Plumbuska', '1988-03-12', 'Gazorpian', 'Plumbus doktor');

INSERT INTO MUSOR (csatorna_nev, cim, ismerteto, epizod) VALUES
('Interdimensional Cable', 'Ball Fondlers', 'Az első epizódban a fondozók bemutatkoznak, és egy különleges küldetést vállalnak.', 'S01E01'),
('Interdimensional Cable', 'Ball Fondlers', 'A fondozók egy veszélyes ellenséggel találkoznak, akinek titkai vannak.', 'S01E02'),
('Interdimensional Cable', 'Ball Fondlers', 'A fondozók egy új csapattagot szereznek, aki váratlan fordulatot hoz.', 'S01E03'),
('Blips and Chitz', 'Roy: A Life Well Lived', 'Roy gyerekként felfedezi a világot, és először megy iskolába.', 'S01E01'),
('Blips and Chitz', 'Roy: A Life Well Lived', 'Roy tinédzserként nehéz döntések elé kerül az életben.', 'S01E02'),
('Blips and Chitz', 'Roy: A Life Well Lived', 'Roy felnőtté válik, családot alapít és karrierjét építi.', 'S01E03'),
('Gazorpazorp TV', 'How They Do It: Plumbus', 'Részletesen bemutatjuk a Plumbus alapanyagait.', 'S01E01'),
('Gazorpazorp TV', 'How They Do It: Plumbus', 'Megmutatjuk, hogyan szerelik össze a Plumbust.', 'S01E02'),
('Gazorpazorp TV', 'How They Do It: Plumbus', 'Végső simítások: hogyan használjuk a Plumbust otthon.', 'S01E03'),
('Gear World Network', 'Gear Talk with Rick', 'Rick bemutatja a fogaskerekek alapvető működési elvét.', 'S01E01'),
('Gear World Network', 'Gear Talk with Rick', 'Rick elmagyarázza a fogaskerekek történelmi fejlődését.', 'S01E02'),
('Gear World Network', 'Gear Talk with Rick', 'Rick megvitatja, hogyan használjuk a fogaskerekeket a mindennapokban.', 'S01E03'),
('Plumbus Channel', 'Plumbus Master Class', 'Alapvető Plumbus-kezelési tippek kezdőknek.', 'S01E01'),
('Plumbus Channel', 'Plumbus Master Class', 'Haladó technikák a Plumbus hatékonyabb használatához.', 'S01E02'),
('Plumbus Channel', 'Plumbus Master Class', 'Profi tanácsok a Plumbus mestereitől.', 'S01E03');

INSERT INTO SZEREPLOK (musor_cim, szereplo) VALUES
('Ball Fondlers', 'Two Brothers'),
('Roy: A Life Well Lived', 'Ants in my Eyes Johnson'),
('How They Do It: Plumbus', 'Stealy'),
('Gear Talk with Rick', 'Mr. Poopybutthole'),
('Plumbus Master Class', 'Krombopulos Michael');

/* Tesztelni kell, hogy ide kerülnek-e az adminok műveletei, ha nem, kell trigger logika
INSERT INTO FELVETTE_CSATORNA (email, csatornanev) VALUES
('jerry@citadel.com', 'Interdimensional Cable'),
('morty@citadel.com', 'Blips and Chitz'),
('summer@citadel.com', 'Gazorpazorp TV'),
('jerry@citadel.com', 'Gear World Network'),
('jerry@citadel.com', 'Plumbus Channel');

INSERT INTO FELVETTE_MUSOR (email, musor_cim) VALUES
('morty@citadel.com', 'Ball Fondlers'),
('morty@citadel.com', 'Roy: A Life Well Lived'),
('summer@citadel.com', 'How They Do It: Plumbus'),
('jerry@citadel.com', 'Gear Talk with Rick'),
('jerry@citadel.com', 'Plumbus Master Class');

INSERT INTO FELVETTE_SZEREPLO (email, szereplo_id) VALUES
('summer@citadel.com', 'Two Brothers'),
('summer@citadel.com', 'Ants in my Eyes Johnson'),
('summer@citadel.com', 'Stealy'),
('jerry@citadel.com', 'Mr. Poopybutthole'),
('jerry@citadel.com', 'Krombopulos Michael');
*/

INSERT INTO SZEREPLESEK (szereplo_id, epizod, musor_cim, csatorna_nev) VALUES
(2, 'S01E01', 'Ball Fondlers', 'Interdimensional Cable'),
(1, 'S01E01', 'Roy: A Life Well Lived', 'Blips and Chitz'),
(3, 'S01E01', 'How They Do It: Plumbus', 'Gazorpazorp TV'),
(4, 'S01E01', 'Gear Talk with Rick', 'Gear World Network'),
(5, 'S01E01', 'Plumbus Master Class', 'Plumbus Channel');

INSERT INTO SUGARZASOK (csatorna_nev, musor_cim, mikor) VALUES
('Interdimensional Cable', 'Intergalactic Sports Show', '2024-10-12 19:00:00'),
('Blips and Chitz', 'Intergalactic Sports Show', '2024-10-12 19:00:00'),
('Gazorpazorp TV', 'Intergalactic Sports Show', '2024-10-12 19:00:00'),
('Interdimensional Cable', 'Ball Fondlers', '2024-10-12 20:00:00'),
('Blips and Chitz', 'Roy: A Life Well Lived', '2024-10-12 21:00:00'),
('Gazorpazorp TV', 'How They Do It: Plumbus', '2024-10-12 19:30:00'),
('Gear World Network', 'Gear Talk with Rick', '2024-10-12 18:00:00'),
('Plumbus Channel', 'Plumbus Master Class', '2024-10-12 22:00:00'),
('Interdimensional Cable', 'Ball Fondlers', '2024-10-13 20:00:00'),
('Blips and Chitz', 'Roy: A Life Well Lived', '2024-10-13 21:00:00'),
('Gazorpazorp TV', 'How They Do It: Plumbus', '2024-10-13 19:30:00'),
('Gear World Network', 'Gear Talk with Rick', '2024-10-13 18:00:00'),
('Plumbus Channel', 'Plumbus Master Class', '2024-10-13 22:00:00');

INSERT INTO MUSOR (csatorna_nev, cim, ismerteto, epizod) VALUES
('Interdimensional Cable', 'Ants in my Eyes Johnson Electronics', 'Elektronikai termékek bemutatója egy különleges házigazdával', 'S01E02'),
('Blips and Chitz', 'Flooby Noob World Championship', 'Galaktikus Flooby Noob bajnokság közvetítése', 'S01E02'),
('Gazorpazorp TV', 'Gazorpazorpfield', 'Egy lusta, lasagne-kedvelő Gazorpazorpian kalandjai', 'S01E02'),
('Gear World Network', 'Gearheads Unite', 'Fogaskerék-rajongók találkozója', 'S01E02'),
('Plumbus Channel', 'Plumbus Extreme Makeover', 'Extrém Plumbus átalakítások', 'S01E02'),
('Interdimensional Cable', 'Strawberry Smiggles', 'Egy gyilkos reggeli gabona reklámja', 'S01E03'),
('Blips and Chitz', 'Slippery Stair Adventures', 'Kalandok egy csúszós lépcsővel', 'S01E03'),
('Gazorpazorp TV', 'Real Fake Doors', 'Egy izgalmas műsor valódi hamis ajtókról', 'S01E03'),
('Gear World Network', 'Gear Wars: The Documentary', 'A nagy fogaskerékháborúk története', 'S01E03'),
('Plumbus Channel', 'Plumbus Cooking Show', 'Főzőműsor, ahol minden ételt Plumbusszal készítenek', 'S01E03'),
('Interdimensional Cable', 'Lil Bits', 'Apró ételek reklámja apró szájú embereknek', 'S01E04'),
('Blips and Chitz', 'Turbulent Juice Gaming Hour', 'Játékóra a népszerű Turbulent Juice-szal', 'S01E04'),
('Gazorpazorp TV', 'Jan Quadrant Vincent 16', 'Akciódús sci-fi Jan Michael Vincent főszereplésével', 'S01E04'),
('Gear World Network', 'Gear or No Gear', 'Izgalmas kvízműsor fogaskerekekről', 'S01E04'),
('Plumbus Channel', 'Extreme Plumbus Sports', 'Extrém sportok Plumbusszal', 'S01E04'),
('Interdimensional Cable', 'Alien Invasion Tomato Monster Mexican Armada Brothers', 'Két testvér... űrlények ellen', 'S01E05'),
('Blips and Chitz', 'Flarga Blarga Blarg', 'Érthetetlen, de lebilincselő idegenek szereplésével', 'S01E05'),
('Gazorpazorp TV', 'Baby Legs', 'Egy rendőr kalandjai, akinek bébi lábai vannak', 'S01E05'),
('Gear World Network', 'Gear Poetry Slam', 'Költészeti est fogaskerekekről', 'S01E05'),
('Plumbus Channel', 'Plumbus After Dark', 'Felnőtt tartalom Plumbusokkal', 'S01E05'),
('Interdimensional Cable', 'Eyeholes', 'Egy veszélyes reggeli gabona reklámja', 'S01E06'),
('Blips and Chitz', 'Glip Glops Got Talent', 'Tehetségkutató műsor Glip Glopoknak', 'S01E06'),
('Gazorpazorp TV', 'Gazorpazorp Master Chef', 'Főzőverseny Gazorpazorpian ételekkel', 'S01E06'),
('Gear World Network', 'Sprocket Science', 'Tudományos műsor lánckerekekről', 'S01E06'),
('Plumbus Channel', 'Plumbus Hoarders', 'Plumbus-gyűjtők extrém esetei', 'S01E06'),
('Interdimensional Cable', 'Hamster in Butt World', 'Egy világ, ahol mindenki fenekében hörcsög él', 'S01E07'),
('Blips and Chitz', 'Numbericon', 'Matematikai játékshow', 'S01E07'),
('Gazorpazorp TV', 'Reverse Giraffe: The Series', 'Egy fordított zsiráf kalandjai', 'S01E07'),
('Gear World Network', 'Cog Talk', 'Beszélgetős műsor híres fogaskerekekkel', 'S01E07'),
('Plumbus Channel', 'Pimp My Plumbus', 'Plumbusok extrém tuningolása', 'S01E07'),
('Interdimensional Cable', 'How Did I Get Here?', 'Emberek random helyeken találják magukat', 'S01E08'),
('Blips and Chitz', 'Interdimensional Mind Benders', 'Agytorna különböző dimenziókból', 'S01E08'),
('Gazorpazorp TV', 'Octopus Man', 'Egy ember, aki félig polip, harcol a bűn ellen', 'S01E08'),
('Gear World Network', 'Gears of Our Lives', 'Szappanopera fogaskerekekről', 'S01E08'),
('Plumbus Channel', 'Plumbus Cribs', 'Luxusotthonok, ahol minden Plumbusból készült', 'S01E08'),
('Interdimensional Cable', 'Funny Songs', 'Robot énekesek vicces dalai', 'S01E09'),
('Blips and Chitz', 'Intergalactic Pinball Masters', 'A legjobb flipperjátékosok versengése', 'S01E09'),
('Gazorpazorp TV', 'Two Brothers in a Van', 'Két testvér... és akkor jön egy meteor', 'S01E09'),
('Gear World Network', 'Extreme Gear Makeover', 'Rozsdás fogaskerekek felújítása', 'S01E09'),
('Plumbus Channel', 'The Real Plumbuses of the Citadel', 'Reality show a Citadella Plumbusairól', 'S01E09'),
('Interdimensional Cable', "Snuffles: A Dog's Tale", 'Egy kutya felemelkedése és bukása', 'S01E10'),
('Blips and Chitz', "Glorzo's Got Game", 'Videojáték bemutató Glorzókkal', 'S01E10'),
('Gazorpazorp TV', 'Ballfondlers: The Animated Series', 'A népszerű film rajzfilmváltozata', 'S01E10'),
('Gear World Network', 'Sprocket to Me', 'Romantikus vígjátéksorozat fogaskerekekről', 'S01E10'),
('Plumbus Channel', 'Keeping Up with the Plumbuses', 'Reality show egy Plumbus család életéről', 'S01E10'),
('Interdimensional Cable', 'Intergalactic News', 'Friss hírek a galaxis minden szegletéből', '2024-10-12'),
('Interdimensional Cable', 'Intergalactic News', 'Friss hírek a galaxis minden szegletéből', '2024-10-13'),
('Blips and Chitz', 'Universal Headlines', 'Naponta friss hírek az univerzumból', '2024-10-12'),
('Blips and Chitz', 'Universal Headlines', 'Naponta friss hírek az univerzumból', '2024-10-13'),
('Gazorpazorp TV', 'Gazorpazorp Evening News', 'A legfontosabb hírek a Gazorpazorpról és azon túl', '2024-10-12'),
('Gazorpazorp TV', 'Gazorpazorp Evening News', 'A legfontosabb hírek a Gazorpazorpról és azon túl', '2024-10-13'),
('Gear World Network', 'Mechanical Daily News', 'Hírek és érdekességek a fogaskerekek világából', '2024-10-12'),
('Gear World Network', 'Mechanical Daily News', 'Hírek és érdekességek a fogaskerekek világából', '2024-10-13'),
('Plumbus Channel', 'Plumbus World Report', 'Globális hírek Plumbus perspektívából', '2024-10-12'),
('Plumbus Channel', 'Plumbus World Report', 'Globális hírek Plumbus perspektívából', '2024-10-13'),
('Interdimensional Cable', 'Intergalactic Sports Show', 'Közvetítések és elemzések a galaktikus sportvilágból', '2024-10-12'),
('Blips and Chitz', 'Flooby Noob World Championship', 'Galaktikus Flooby Noob bajnokság közvetítése', '2024-11-01'),
('Gazorpazorp TV', 'Spaceball Finals', 'Az univerzum legnagyobb Spaceball döntője', '2024-11-07'),
('Gear World Network', 'Gear Olympics', 'A fogaskerék-játékok legnagyobb versenye', '2024-11-21'),
('Plumbus Channel', 'Plumbusball Tournament', 'Plumbusball torna a legjobb csapatokkal', '2024-12-12');