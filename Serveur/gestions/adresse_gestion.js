// gestionnaire des dépendances Node
const os = require("os")

/* filtre les adresses IPv4 xclut l'adresse "127.0.0.1", 
puis retourne une chaîne de caractères contenant toutes les adresses IP avec le port spécifié.
127.0.0.1 => réserver à la boucle locale du pc donc non nécessaire */
function getAdressesIp(portServeur) {
    const reseau = Object.values(os.networkInterfaces()).reduce((r, a) => {
        r = r.concat(a);
        return r;
    }, []).filter(({family, address }) => {
        return family.toLowerCase().indexOf("v4") >= 0 && address !== "127.0.0.1";
    })
    .map(({ address }) => address + ":" + portServeur);
    return reseau.join(", ");
}

//<----------------- Exports ----------------->
exports.getAdressesIp = getAdressesIp;