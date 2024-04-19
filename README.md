# Projet développement WEB

_SINTONI Fabio_
_DUTAUD Alexis_

## Configurer le projet

### Frontend

### Backend

![img](https://www.envie-de-queyras.com/upload/plan-pistes/2015-2016/plan-des-pistes-alpin-molines-saint-veran-domaine-beauregard.jpg)

- Une page de connexion

- liste des pistes de ski, avec leur couleurs et leur état (Ouverte, Fermée)

- liste des remontées avec les pistes qui sont desservies, et leurs états (ouvert, fermé
etc...)

- Tout comme waze, les utilisateurs peuvent changer l'état des pistes et des
remontées.

- possibilité de poster un commentaire sur une piste de ski / remontées
les fonctionnalités avancées (si vous êtes chaud) :

- En donnant la piste de départ, et la piste sur laquelle on veut aller (ou station), proposé les itinéraires avec les remontées qui faut.

- un chat interne pour discuter pendant que l'on est sur le téléski.

- DUMP SQL: `pg_dump -U alexis -d test -f chemin_vers_fichier.dump`

INSERT INTO `piste` (`ppiste`, `nom`, `couleur`, `etat`) VALUES
(1, 'La Monthery', 'Verte', 'ouvert'),
(2, 'Le Forest', 'Verte', 'ouvert'),
(3, 'Bouticari Vert', 'Verte', 'ouvert'),
(4, 'Jonction Basse', 'Verte', 'ouvert'),
(5, 'Les Casses', 'Bleue', 'ouvert'),
(6, 'Les Neiges', 'Bleue', 'ouvert'),
(7, 'Les Atodos', 'Bleue', 'ouvert'),
(8, 'Les Jockeys', 'Rouge', 'ouvert'),
(9, 'Le Chamois', 'Rouge', 'ouvert'),
(10, 'L’Écureuil', 'Rouge', 'ouvert'),
(11, 'Le Tétras', 'Noire', 'ouvert'),
(12, 'Le Lièvre', 'Noire', 'ouvert'),
(13, 'As du Chamois', 'Bleue', 'ouvert'),
(14, 'Les Lampions', 'Bleue', 'ouvert'),
(15, 'Le Gourq', 'Bleue', 'ouvert'),
(16, 'Les Douzeaux', 'Bleue', 'ouvert'),
(17, 'L’Arbre', 'Bleue', 'ouvert'),
(18, 'Bouticari Bleu', 'Bleue', 'ouvert'),
(19, 'L’Inglin', 'Bleue', 'ouvert'),
(20, 'Le Grand Serre', 'Bleue', 'ouvert'),
(21, 'La Gérabio', 'Bleue', 'ouvert'),
(22, 'La Mandarine', 'Rouge', 'ouvert'),
(23, 'Pré Méan', 'Rouge', 'ouvert'),
(24, 'L’Ousselat', 'Rouge', 'ouvert'),
(25, 'Barrigart', 'Rouge', 'ouvert'),
(37, 'La Rouge Bouticari', 'Rouge', 'ouvert'),
(38, 'Les Sagnières', 'Rouge', 'ouvert'),
(39, 'La Draye', 'Rouge', 'ouvert'),
(51, 'Le Gourq', 'Bleue', 'ouvert'),
(52, 'Les Douzeaux', 'Bleue', 'ouvert'),
(53, 'L’Arbre', 'Bleue', 'ouvert'),
(54, 'Bouticari Bleu', 'Bleue', 'ouvert'),
(55, 'L’Inglin', 'Bleue', 'ouvert'),
(56, 'Le Grand Serre', 'Bleue', 'ouvert'),
(57, 'La Gérabio', 'Bleue', 'ouvert'),
(58, 'Les Jockeys', 'Rouge', 'ouvert'),
(59, 'Le Chamois', 'Rouge', 'ouvert'),
(60, 'L’Écureuil', 'Rouge', 'ouvert'),
(61, 'La Mandarine', 'Rouge', 'ouvert'),
(62, 'Pré Méan', 'Rouge', 'ouvert'),
(63, 'L’Ousselat', 'Rouge', 'ouvert'),
(64, 'Barrigart', 'Rouge', 'ouvert'),
(65, 'La Rouge Bouticari', 'Rouge', 'ouvert'),
(66, 'Les Sagnières', 'Rouge', 'ouvert'),
(67, 'La Draye', 'Rouge', 'ouvert'),
(68, 'Le Tétras', 'Noire', 'ouvert'),
(69, 'Le Lièvre', 'Noire', 'ouvert');