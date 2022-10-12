const distanceCounter = (oldLat, oldLong, currentLat, currentLong) => {
  const degr_to_merid = 111.1; //количество километров в одном градусе на меридиане 
  const km_between_lat = Math.abs(oldLat - currentLat) * degr_to_merid; //AB и CD 
  const cos1 = Math.cos(oldLat * 2 * Math.PI / 360); 
  const cos2 = Math.cos(currentLat * 2 * Math.PI / 360); 
  const AD = Math.abs(currentLong - oldLong) * cos2 * 111.3; 
  const BC = Math.abs(currentLong - oldLong) * cos1 * 111.3; 
  const AH = Math.abs(BC - AD) / 2; 
  const BH = Math.sqrt((km_between_lat * km_between_lat) - AH * AH); 
  const HD = AD - AH; 
  const distanceBetweenPoints = Math.sqrt(BH * BH + HD * HD);
  return distanceBetweenPoints;
};

const success = (position) => {
  console.log(position);

  const oldLat = Number(document.body.querySelector('#oldLatitude').textContent);
  const oldLong = Number(document.body.querySelector('#oldLongitude').textContent);
  const oldTime = Number(document.body.querySelector('#oldTime').textContent);

  const currentLat = Number(document.body.querySelector('.currentCoord > .currentLatitude').textContent);
  const currentLong = Number(document.body.querySelector('.currentCoord > .currentLongitude').textContent);
  const currentTime = Number(document.body.querySelector('.currentCoord > .currentTime').textContent);

  const accuracyInKm = position.coords.accuracy / 1000;
  const distanceBetweenPoints = distanceCounter(oldLat, oldLong, currentLat, currentLong);
  const currentSpeed = distanceBetweenPoints / (currentTime - oldTime) * 3600;

  const oldDistance = Number(document.body.querySelector('.distance > .distance10m').textContent);
  if (distanceBetweenPoints > 10) {
    document.body.querySelector('.distance > .distance10m').textContent = '00.000';
    document.body.querySelector('#oldLatitude').textContent = document.body.querySelector('.currentCoord > .currentLatitude').textContent;
    document.body.querySelector('#oldLongitude').textContent = document.body.querySelector('.currentCoord > .currentLongitude').textContent;
    document.body.querySelector('#oldTime').textContent = document.body.querySelector('.currentCoord > .currentTime').textContent;
  } else if (distanceBetweenPoints > accuracyInKm * 0.8) {
    document.body.querySelector('.distance > .distance10m').textContent = `${oldDistance + distanceBetweenPoints}`.slice(0, 5);
    document.body.querySelector('#speed').textContent = `${currentSpeed}`.slice(0, 3);
    document.body.querySelector('#oldLatitude').textContent = document.body.querySelector('.currentCoord > .currentLatitude').textContent;
    document.body.querySelector('#oldLongitude').textContent = document.body.querySelector('.currentCoord > .currentLongitude').textContent;
  }
  document.body.querySelector('.currentCoord > .currentLatitude').textContent =`${position.coords.latitude}`;
  document.body.querySelector('.currentCoord > .currentLongitude').textContent =`${position.coords.longitude}`;
  document.body.querySelector('.currentCoord > .currentTime').textContent =`${position.timestamp}`;
      
  console.log(oldLat);
  console.log(oldLong);
  console.log(currentLat);
  console.log(currentLong);
  console.log(distanceBetweenPoints);
  console.log(currentTime);
  console.log(oldTime);
  console.log(currentSpeed);
  };

  const error = () => {
    alert('Sorry, no position available.');
  }

  const options = {
    enableHighAccuracy: true,
  };

const id = navigator.geolocation.watchPosition(success, error, options);