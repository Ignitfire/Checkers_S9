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

Pour lancer le serveur du jeu, suivez les étapes suivantes :

1. Se positionner au sein du projet dans le répertoire `Serveur`
2. Exécuter la commande `node app.js`

Le serveur se lancera dans votre terminal. Il est important de noter qu'il faudra impérativement garder le terminal ouvert pour que le serveur soit actif.