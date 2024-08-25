let inputvalue = document.getElementById("input");
let btn = document.getElementById("search");

let temp = document.getElementById("temp-number");
let desp = document.getElementById("temptext");
let hum = document.getElementById("humidityper");
let windsp = document.getElementById("windspeed");

let mdl = document.getElementById("middle");
let lf = document.getElementById("leff");
let rtt = document.getElementById("rt");
let det = document.getElementById("details");
let cnf = document.getElementById("citynotfound");
let nwe = document.getElementById("nwe");

let waterimg  = document.getElementById("imgs")

btn.addEventListener("click",logic);

function logic(){
    if(inputvalue.value===""){
        det.style.display="block";
        temp.innerHTML = "0";
        desp.innerHTML = "clear cloud"; 
        hum.innerHTML = "0";
        windsp.innerHTML="0";
        cnf.style.display="none";
        nwe.style.display="none";
    }
   if(inputvalue.value){
    let cityname = inputvalue.value;
    let xhr = new XMLHttpRequest();
    xhr.open("GET",`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=fce6797c8ff87038a90d6aec03570907`,true);
    xhr.send();

    xhr.onload = function(){

        let a = xhr.responseText;
        a= JSON.parse(a);

        if(a.cod==="404"){
            det.style.display="none";
            cnf.style.display="block";
            nwe.style.display="none";
        }else{
            det.style.display="block";
            cnf.style.display="none";
            nwe.style.display="none";
        }



       


        // console.log(a.weather[0].main);
        let condition = a.weather[0].main;
        switch(condition){
            case 'Clear':
                waterimg.src="clear.png";
                break;
            case 'Rain':
                waterimg.src="rain.webp";
                break;
            case 'Snow':
                waterimg.src="snowpng.png";
                break;
            case 'Clouds':
                waterimg.src="cloudypng.png";
                break;
            case 'Mist':
                waterimg.src="mist.png";
                break;
            case 'Haze':
                waterimg.src="Haze.png";
                break;
            case 'Fog':
                waterimg.src="fogpng.png";
                break;
            case 'Thunderstorm':
                waterimg.src="throunderpng.png";
                break;
            default :
                waterimg.src='clear.png';
                break;
        }



        let tempp = a.main.temp-273.15;
        let te = tempp.toFixed(0);
        // console.log(te)
        // weather temperature
        temp.innerHTML = te;
        // console.log(a);
         // weather description
        desp.innerHTML = a.weather[0].description;

        //humidity 
        hum.innerHTML = a.main.humidity;

        //wind speed
        windsp.innerHTML=a.wind.speed;

        // det.style.display="block";
        mdl.classList.add("md");
        lf.classList.add("lf");
        rtt.classList.add("rtr");
        
    }
    xhr.onerror= function(){
        cnf.style.display="none";
        det.style.display="none";
        nwe.style.display="block";
    }

   }



//    det.style.display="none";
   mdl.classList.remove("md");
   lf.classList.remove("lf");
   rtt.classList.remove("rtr");
}
