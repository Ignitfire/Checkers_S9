# Checkers_S9

## Prérequis

Il est nécessaire d'avoir installer tout l'environnement de développement Cordova.
Pour cela, il faut suivre les différentes étapes décritent à l'adresse suivante : https://cours.univ-grenoble-alpes.fr/course/view.php?id=6775

## Installation

Après avoir installer l'environnement de développement Cordova, suivez les étapes suivantes pour installer le projet :

1. Se positionner à la racine de votre environnement de développement `DevWebDir`
2. Lancer l'environnement de développement
   - [WINDOWS] lancez `.\LaunchCordova.bat` pour démarrer l'environnement
   - [LINUX/MAC OSX] lancez `source ./LaunchCordova.sh` pour démarrer l'environnement
3. Cloner le projet

### Client

1. Se déplacer au sein du projet dans le répertoire `Client`
2. Ajouter les plateformes `browser` et `android`
   - `cordova plateform add browser`
   - `cordova plateform add android`
3. Compiler le projet Client
   - `cordova build browser`
   - `cordova build android`

### Serveur

Côté serveur, il est indispensable d'installer les dépendances npm pour pouvoir run un serveur. Suivez les étapes suivantes pour installer les dépendances : 

1. Se déplacer au sein du projet dans le repertoire `Serveur`
2. Exécuter la commande `npm install`

Toutes les dépendances décrites dans les fichiers `Serveur/package.json` et `Serveur/package-lock.json` seront alors installées.

## Lancer le serveur du jeu

Pour pouvoir jouer à plusieurs en réseau, il est indispensable d'avoir un serveur de jeu qui permet de mettre en relation
les personnes qui veulent jouer.

Il est en fait question de démarrer deux serveur : un serveur de base de données pour gérer la persistence des données 
(utilisateur, historique de partie, etc...) et un serveur NodeJS pour la connexion au jeu et la jouabilité à plusieurs.

Le script `LaunchServers.bat` positionné à la racine du projet permet de lancer ces deux serveurs dans des consoles à part.

Dès que ces deux serveurs ont fini de démarrer. Il est possible pour les joueurs de se connecter. Noter l'adresse IP du serveur NodeJS.
Elle vous sera utile pour que les clients puissent se connecter.

## Jouabilité

Il ne vous reste plus qu'une deux étapes pour pouvoir jouer. La première est de modifier côté Client l'adresse IP de connexion
au serveur Node JS. Suivez les étapes suivantes : 

1. Copier l'adresse IP ou l'une des adresses IP que le serveur NodeJS affiche.
2. Dans le répertoire `Client`, ouvrez le fichier `app.js` et modifier la ligne suivante en prenant soin de copier l'adresse IP `const socket = io("ADRESSE_IP");`

Enfin, la dernière étape est de lancer la commande `cordova run browser` ou `cordova run android`.