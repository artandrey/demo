function initMap() {
    // тут задаем центр карты
    var myLatLng = {lat: 50.44973057721140, lng: 30.483638212303163};
   
     
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 17,  // определяет масштаб карты, ее "зум"
      center: myLatLng
    });
   
    // ниже задаются стили, можете использовать https://mapstyle.withgoogle.com/ или https://snazzymaps.com/ для быстрого создания стиля,
    // далее оттуда берете блок с кодом для стилей и вставляете вместо этого блока ниже
    var styles = [
      {
        stylers: [
          { hue: "#ff8d8d" },
          { saturation: -20 }
        ]
      },{
        featureType: "road",
        elementType: "geometry",
        stylers: [
          { lightness: 100 },
          { visibility: "simplified" }
        ]
      },{
        featureType: "poi.business",
        elementType: "labels",
        stylers: [
          { visibility: "off" }
        ]
      }
    ];
   
    // тут мы применяем описанные выше стили к карте
    map.setOptions({styles: styles});
   
    // блок ниже рисует path - путь, состоящий из линий. Так можно, к примеру, нарисовать путь проезда к вашему месту.
    var stoPathCoordinates = [
      {lat: 50.45059306386482, lng: 30.483474597553254},
      {lat: 50.45051620925655, lng: 30.48384474239731},
      {lat: 50.45010290011114, lng: 30.483753547290803},
      {lat: 50.4498006014667, lng: 30.483635530094148}
    ];
    var stoPath = new google.maps.Polyline({
      path: stoPathCoordinates,
      geodesic: true,
      strokeColor: '#ce563e',
      strokeOpacity: 0.75,
      strokeWeight: 2
    });
   
    stoPath.setMap(map);
   
    // ниже задаем маркер - картинку и ее размер, а также точку картинки (в примере - это низ картинки, выровненный по центру - которая будет находится в указанных координатах)
    var image = {
      url: 'demo/google-maps/unnamed.png',
      // тут маркер 30 пикселей в ширину и 118 в высоту
      size: new google.maps.Size(50,100),
      // задаем начало картинки, обычно это левый верхний угол (0, 0).
      origin: new google.maps.Point(0, 0),
      // и точка картинки, которая будет находиться в точке вашего объекта на карте, тут - центр картинки внизу (15, 118).
      anchor: new google.maps.Point(15, 118)
    };
   
    // тут создается блок, всплывающий по клику на маркер. Удобен чтоб добавить небольшой текст-описание или подсказку.
    var contentString = '<div id="map-content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h2 id="firstHeading" class="firstHeading">СТО "Спартанців"</h2>'+
      '<div id="bodyContent">'+
      '<p>Вїзд через шлагбаум з боку вул. В.Чорновола, ' +
      'далі праворуч до вїзду у власне саме СТО.'+
      'Переключення на супутникову версію мапи може допомогти '+
      'краще розібратись із розташуванням.'+
      '</div>'+
      '</div>';
   
    var infowindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 270
    });
   
    // здесь создается сам маркер и применяются параметры отображения
    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      icon: image,
      animation: google.maps.Animation.DROP,
      title: 'СТО "Спартанців"'
    });
   
    var myOptions = {
      // your other options...
      draggable: !("ontouchend" in document)
    };
   
    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });
  }