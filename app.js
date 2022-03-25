//const url = "http://localhost:8081/api/teams";
const url = "https://api-formula1.vercel.app/api/teams";

const containerPilots = document.querySelector(".container_request");
const containerMain = document.querySelector(".container_main");

let arrayTeams = [];
let arrayObj = [];

window.onload = () => {
  init();
};

async function init() {
  const petition = await peticion(url);
  let mapped = mappedPilots(petition);
}

async function peticion(url) {
  const pilots = await fetch(url);
  const result = await pilots.json();
  arrayTeams.push(result);
  return result;
}


let slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs((slideIndex += n));
}

function showDivs(n) {
  let i;
  let x = document.getElementsByClassName("mySlides");
  if (n > x.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = x.length;
  }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[slideIndex - 1].style.display = "block";
}



function filteredTeam(id) {
  containerMain.innerHTML = "";

  arrayTeams[0].map((team) => {
    // console.log(team._id);
    if (team.name === id) {
      
      containerMain.innerHTML += `

        <div class="main_title bg-red"
            id="${team.name.toLowerCase().replace(/ /g, "")}">
            <div class="flex-row">
              <img src="./icons/F1_chequered_flag_Animated.gif" alt="">
                <h1>LA ESCUDERIA Y SUS PILOTOS</h1>
              <img src="./icons/F1_chequered_flag_Animated.gif" alt="">
            </div>
        </div>

        <div class="container_request">
            <div class="container_request-card-team">
                <img  src="${team.img}" alt="" >
                <h2>${team.name}</h2>
                <h3>Coach: ${team.coach}</h3>
                <h3>Director: ${team.director}</h3>
            </div>
        </div>
            <div class="main_title bg-red">
              <h1>Pilotos de ${team.name}</h1>
            </div>
        <div class="container_request">
              <div class="container_request-child1">
                <div class="container_request-card">
                  <img src="${team.pilots[0].img}" alt="" >
                    <h2>${team.pilots[0].name}</h2>
                    <h3>Victorias: ${team.pilots[0].race}</h3>
                    <h3>Nacionalidad: ${team.pilots[0].nationality}</h3>
                      <div class="container-flag">
                        <img class="flag" src="./banderas/${
                          team.pilots[0]._id
                        }.svg" alt="">
                      </div> 
                  <h3>Cumpleaños: ${team.pilots[0].age}</h3>
                  <h3>Altura: ${team.pilots[0].height}cm</h3>
                  <h3>Peso:  ${team.pilots[0].weight}kg</h3>
                  <h3>Dorsal:${team.pilots[0].number}</h3>
                </div>
              </div>
              <div class="container_request-child1">
                <div class="container_request-card">
                    <img src="${team.pilots[1].img}" alt="">
                    <h2>${team.pilots[1].name}</h2>
                    <h3>Victorias: ${team.pilots[1].race}</h3>
                    <h3>Nacionalidad: ${team.pilots[1].nationality}</h3>
                      <div class="container-flag">
                          <img class="flag" src="./banderas/${
                        team.pilots[1]._id}.svg"alt="">
                      </div>
                    <h3>Cumpleaños: ${team.pilots[1].age}</h3>
                    <h3>Altura: ${team.pilots[1].height} cm</h3>
                    <h3>Peso:  ${team.pilots[1].weight} kg</h3>
                    <h3>Dorsal:${team.pilots[1].number}</h3>
                </div>
              </div>
          </div>`;
  }
  });
}

function mappedPilots(result) {
  result.forEach((team) => {
    team.pilots.map((pilots) => {
      arrayObj.push(pilots);
    });
  });
  printHtml(arrayObj);
}

function printHtml(array) {
  array.map((pilots) => {
    //console.log(pilots);
    containerPilots.innerHTML += `
      
            <div class="container_request-child1">
              <div class="container_request-card">
                  <img src="${pilots.img}" alt="">
                  <h2>${pilots.name}</h2>
                  <h3>Nacionalidad: ${pilots.nationality}</h3>
                    <div class="container-flag">
                      <img class="flag" src="./banderas/${pilots._id}.svg" alt="">
                    </div>                                
                  <h3>Cumpleaños: ${pilots.age}</h3>
                  <h3>Victorias: ${pilots.race}</h3>
                  <u><h1>Caracteristicas:</h1></u>
                  <h3>Altura: ${pilots.height} cm</h3>
                  <h3>Peso:  ${pilots.weight} kg</h3>
                  <h3>Dorsal:${pilots.number}</h3>
              </div>
           
            </div>`;
    
  });
}

