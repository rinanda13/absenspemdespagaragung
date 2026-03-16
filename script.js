let urlDatabase="https://script.google.com/macros/s/AKfycbwvSZ3iXlRzNLznUOW8ClzSw2stV7jM9gKvvFP2siVOXHqTs6SeJUfvHYVP69WZhA/exec";

let kantorLat=-4.0387837;
let kantorLon=102.5243143;

function hitungJarak(lat1,lon1,lat2,lon2){

let R=6371e3;

let φ1=lat1*Math.PI/180;
let φ2=lat2*Math.PI/180;

let Δφ=(lat2-lat1)*Math.PI/180;
let Δλ=(lon2-lon1)*Math.PI/180;

let a=Math.sin(Δφ/2)*Math.sin(Δφ/2)+
Math.cos(φ1)*Math.cos(φ2)*
Math.sin(Δλ/2)*Math.sin(Δλ/2);

let c=2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));

return R*c;
}

function kirim(status,lat,lon){

let nama=localStorage.getItem("pegawai");

fetch(urlDatabase,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
nama:nama,
status:status,
waktu:new Date().toLocaleString(),
latitude:lat,
longitude:lon
})
});
}

function absenMasuk(){

navigator.geolocation.getCurrentPosition(function(pos){

let jarak=hitungJarak(
pos.coords.latitude,
pos.coords.longitude,
kantorLat,
kantorLon
);

if(jarak<=10){
kirim("Masuk",pos.coords.latitude,pos.coords.longitude);
alert("Absensi Berhasil");
}else{
alert("Jauh Igo Jak Kantor");
}

});
}

function absenPulang(){

navigator.geolocation.getCurrentPosition(function(pos){

let jarak=hitungJarak(
pos.coords.latitude,
pos.coords.longitude,
kantorLat,
kantorLon
);

if(jarak<=10){
kirim("Pulang",pos.coords.latitude,pos.coords.longitude);
alert("Absensi Berhasil");
}else{
alert("Terlalu jauh dari kantor");
}

});
}