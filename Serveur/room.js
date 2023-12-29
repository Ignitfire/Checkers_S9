// fichier qui s'occupe de la gestion des salles de jeu

async function addRoom(socket) {
    //on va parcourir les rooms
    for (var i =0; i < 100; i++) {
        //on vérifie si la room existe ou pas
        if (socket.adpter.rooms ['room' +i] == undefined) {
            //cas où la room n'existe pas donc on rajoute le joueur
            await socket.join("room" + i);
            break;
        }
        //cas où la room existe
        else {
            //il faut qu'on vérifie si elle ne possède pas déjà 2 joueurs
            if (socket.adapter.rooms['room' + i].length < 2) {
                await socket.join("room" +1);
                break;
            }
            //on continue le parcour des rooms 
        }
    }
}

// Exports
exports.addRoom = addRoom; 