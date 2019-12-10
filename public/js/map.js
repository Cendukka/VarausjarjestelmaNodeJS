$(document).ready(() => {
    let loc = {lat:60.446581, lng: 22.292935};
    let map = new google.maps.Map(
        document.getElementById('map'), {zoom: 14, center: loc});
    let marker = new google.maps.Marker({position: loc, map: map});
});