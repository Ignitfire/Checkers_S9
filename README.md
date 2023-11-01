## Checkers_S9

# Petite doc sur le modele à destination de l'équipe
app.js est la classe test, elle est appelée par le html donc vous pouvez mettre les tests que vous voulez dedans.
On commence par créer le jeu avec 2 users, ce qui sera le cas à terme. Le constructeur créer 2 joueur, leur attribut un users aléatoirement.
Par convention dans ce programme, le joueur 1 est blanc est ses pions commencent en haut avec les indexs de case bas (de 0 à 40), à l'inverse le joeur 2 commence en bas avec les pions noirs et les index haut (60 à 99).
La classe jeu, garde ensuite la main sur le jeu jusqu'à une fin de partie ou une classe appelante reprendra la main j'imagine, pas le sujet pour l'instant.
-> les fins de parties ne sont pas encore implémentés.
Au début de chaque tour le modèle recherche tous les coups que le joueurs peut légalement jouer, il envoie dans possibleMoves, cela prend en compte les potentiels rafle promotion, etc... pas encore tester. Ce serait plus pratique une fois que le déplacement et la prise d'un pion ont un rendu visuel.
Pour le visuel vous avez donc besoin d'avoir accès aux possibleMoves et d'appeler votre fonction depuis la fonction tour du joueur, il est possible qu'à terme cet appel se fasse depuis la fonction tour de jeu ce qui serait plus cohérent niveau serveur.
J'ai créer une classe Move qui décrit les caracteristiques d'un mouvement de la part joueur, utile pour les simulations, les historiques pour se passer des mouvements de classe en classe, etc... hésitez pas à vous en servir. Idem pour les Cases plutot que 2 valeurs pour les coordonnées vu qu'on en a et que le damier est fait comme ca.
Le damier comprend des pions et des cases je l'ai verifier c'est probablement le premier truc à mettre en vue.
Hésitez pas si vous avez des questions, trouvez des erreurs (y en a plein), etc... Sinon il y a des commentaires un peu partout vous devriez vous y retrouver.
