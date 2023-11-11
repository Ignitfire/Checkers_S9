    export function showDamier(){
        // create a new div element
        let damier = document.createElement("div");
        damier.id = "damier";
        // and give it some content
        let table = document.createElement("table");
        let tbody = document.createElement("tbody");
        for(let i=0; i<10; i++){
            let tr = document.createElement("tr");
            for(let j=0; j<10; j++){
                let td = document.createElement("td");
                td.id = "case"+i+j;
                td.style.backgroundColor=(i+j)%2==0?"beige":"brown";
                td.style.height = "50px";
                td.style.width = "50px";
                td.className = "case";
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }
        damier.style.display = "block";
        damier.appendChild(table);
        table.appendChild(tbody);
        document.body.appendChild(damier);
    }

    export function showPions(pions){
        pions.forEach(p => {
            let pion = document.createElement("div");
            pion.id = "pion"+p.position.x+p.position.y;
            pion.className = "pion";
            pion.style.borderRadius = "50%";
            pion.style.backgroundColor = p.color;
            pion.style.height = "50px";
            pion.style.width = "50px";
            let casePion = document.getElementById("case"+p.position.x+p.position.y);
            casePion.appendChild(pion);
        });
    }