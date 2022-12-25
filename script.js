const startbtn = document.querySelector(".start");
const wisielec = document.querySelector(".wisielec");
const dane = document.querySelector(".dane");
const indane = document.querySelectorAll(".dane *");
let kategoria = document.querySelector("#kategoria");
let haslo = document.querySelector("#haslo");
const gora = document.querySelector(".top");
const alfabet = document.querySelector(".alfabet");
let pom = 0;
let pom2 = 1;
let pom3 = 0;
let pom4 = 0;
let pom5 = 0;
let pom6 = 0;
const buttons = document.getElementsByTagName("button");
const specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=";

function start_poczatek(){
    startbtn.style.animation = "btn-out .5s linear";
    setTimeout(() => {
        startbtn.style.display = "none";
      }, "500")
    dane.style.display = "flex";
    dane.style.animation = "dane .5s linear";
    for(const element of indane){
        element.style.display = "block";
    }
}

function start(){
    document.querySelector(".wisielec").classList.add("wisielec-resp");
    haslo = document.querySelector("#haslo").value;
    for(let i = 0; i < haslo.length; i++){
        if(haslo[i] == Number(haslo[i]) & haslo[i] != " "){
            pom4 = 1;
            break;
        }
    }
    if(pom4 == 1){
        alert("W haśle nie może być cyfr");
        pom4 = 0;
    }
    else if(document.querySelector("#haslo").value == "" || kategoria.value == ""){
        alert("Nie podano kategori lub hasła");
    }else{
        kategoria = kategoria.value;
        for(const element of indane){
            element.style.display = "none";
        }
        wisielec.style.left = "70%";
        kategoria = kategoria.toUpperCase();
        document.querySelector(".kategoria-value").innerHTML = kategoria; 
        gora.style.display = "block";
        for(let i = 0; i < haslo.length; i++){
            check(haslo, i);
            if(haslo[i] == " "){
                const div = document.createElement("div");
                document.querySelector(".haslo h2").appendChild(div);
                div.setAttribute("id", `letter${i + 1}`);
                div.classList.add("spacja");
                pom5++;
            }else if(pom6 == 1){
                const div = document.createElement("div");
                document.querySelector(".haslo h2").appendChild(div);
                div.setAttribute("id", `letter${i + 1}`);
                document.querySelector(`#letter${i + 1}`).innerText = haslo[i];
                pom6 = 0;
                pom5++;
            }else{
                const div = document.createElement("div");
                document.querySelector(".haslo h2").appendChild(div);
                div.classList.add("haslo-border");
                div.setAttribute("id", `letter${i + 1}`);
            }
        }
        alfabet.style.display = "grid";
        document.querySelector(".bledy").style.display = "block";
        const buttonPressed = e => { 
            e.target.classList.add("non-active");
            const value = document.querySelector(`#${e.target.id}`).value;
            for(let i = 0; i < haslo.length; i++){
                if(value == haslo[i].toLowerCase()){
                    document.querySelector(`#letter${i + 1}`).innerText = value.toUpperCase();
                    pom3++;
                    pom++;
                    if(pom == haslo.length || pom == haslo.length - pom5 && pom5 > 0){
                        document.querySelector(".result").style.display = "flex";
                        document.querySelector(".win").style.display = "grid";
                        pom5 = 0;
                    }
                }
            }
            if(pom3 == 0){
                wrong();
            }else{
                pom3 = 0;
            }
        }
        for (let button of buttons) {
            button.addEventListener("click", buttonPressed);
        }
    }
}

function wrong(){
    document.querySelector(`.part-${pom2}`).classList.add("black");
    pom2++;
    if(pom2 == 13){
        document.querySelector(".result").style.display = "flex";
        document.querySelector(".lose").style.display = "grid";
        haslo = haslo.toUpperCase();
        document.querySelector(".lose span").innerText = haslo;
    }
    document.querySelector(".bledy span").innerText = `${pom2 - 1}/12`;
}

function check(string, j){
    for(i = 0; i < specialChars.length;i++){
        if(string[j] == specialChars[i]){
            pom6 = 1;
            return;
        }
    }
}