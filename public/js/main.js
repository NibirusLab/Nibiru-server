//use socket.io
$(document).on("ready",main);
// When the window has finished loading create our google map below
google.maps.event.addDomListener(window, 'load', init);

function main(){
    window.io = io.connect();

    io.on('connect',function(socket){
            console.log('hi');
            io.emit('envio');
    });

    io.on('recivo',function(data){
        //something
    });
}

function init() {
    var mapOptions = {
        zoom: 4,
        minZoom: 3,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,
        center: new google.maps.LatLng(48.58, 7.71),

        // theme
        styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#0f252e"},{"lightness":17}]}]
    };

    var mapElement = document.getElementById('map');

    // Create the Google Map using our element and options defined above
    var map = new google.maps.Map(mapElement, mapOptions);

    // Let's also add a marker
    io.on('loadGeo', function(data){
        var tweet = new google.maps.LatLng(data.lat,data.lng);

        var marker = new google.maps.Marker({
            position : tweet,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 4, //tamaño
                strokeWeight: 0, //grosor del borde
                fillColor: '#1abc9c', //color de relleno
                fillOpacity:1// opacidad del relleno
            },/*
            draggable:true,
            animation: google.maps.Animation.DROP,*/
            map: map
        });
    });
}
