class WebWorker {
  static async server_summonVehicle(location, theme, themeSpecificData) {
    var spawnLocation = this.generateRiderLocation(location);
    var route = await this.generateRouteInfo(spawnLocation, location);
    var reducedRoute = [];
    while (route.length > 300) {
      reducedRoute = [];
      reducedRoute.push(route[0]);
      //  Keep the start and end few locations
      for (var i = 1; i < route.length - 2; i++) {
        if (i % 2 == 0) reducedRoute.push(route[i]);
      }
      reducedRoute.push(route[route.length - 1]);
      route = reducedRoute;
    }
    this.spawnRiderLocation(route, theme, themeSpecificData);
  }
  static async resolveAddress(address) {
    return new Promise(resolve => {
      geocoder = new google.maps.Geocoder();
      geocoder.geocode({address: address}, function (results, status) {
        if (status == 'OK') {
          resolve({
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng()
          });
        } else {
          console.log(
            'Geocode was not successful for the following reason: ' + status
          );
          resolve(null);
        }
      });
    });
  }
  static async generateRouteInfo() {
    var sourceLatLng = origin.lat + ',' + origin.lng;
    var destLatLng = destination.lat + ',' + destination.lng;

    return new Promise(resolve => {
      var directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin: sourceLatLng,
          destination: destLatLng,
          travelMode: 'DRIVING' //  Just assume all these routes will be driving, nothing to stop us using PubNub for cycle-based deliveries etc.
        },
        function (response, status) {
          if (
            status === 'OK' &&
            response.routes.length > 0 &&
            response.routes[0].legs[0].steps.length > 0
          ) {
            //  Iterate over all the latlngs in all the steps and create
            var route = [];
            for (
              var step = 0;
              step < response.routes[0].legs[0].steps.length;
              step++
            ) {
              for (
                var latlng = 0;
                latlng < response.routes[0].legs[0].steps[step].lat_lngs.length;
                latlng++
              ) {
                var newLatLong = {
                  lat: response.routes[0].legs[0].steps[step].lat_lngs[
                    latlng
                  ].lat(),
                  lng: response.routes[0].legs[0].steps[step].lat_lngs[
                    latlng
                  ].lng()
                };
                route.push(newLatLong);
              }
            }
            //  route now contains an array of lat/long waypoints between the start and end points, inclusive.
            resolve(route);
          }
        }
      );
    });
  }
  static async generateRiderLocation(location) {
    var randomAzimuthInDegrees = Math.floor(Math.random() * 359);
    var randomDistanceInMeters =
      Math.floor(Math.random() * 5000) + minimumSpawnDistanceOfDriver;
    var northDisplacement =
      randomDistanceInMeters *
      (Math.cos((Math.PI / 180) * randomAzimuthInDegrees) / 111111);
    var eastDisplacement =
      (randomDistanceInMeters *
        Math.sin((Math.PI / 180) * randomAzimuthInDegrees)) /
      Math.cos((Math.PI / 180) * location.lat) /
      111111;
    var newLatitude = location.lat + northDisplacement;
    var newLongitude = location.lng + eastDisplacement;
    newLatitude =
      Math.round((newLatitude + Number.EPSILON) * 10000000) / 10000000;
    newLongitude =
      Math.round((newLongitude + Number.EPSILON) * 10000000) / 10000000;
    return {lat: newLatitude, lng: newLongitude};
  }
  static async spawnRiderLocation() {
    var simulatorTask = new Worker('./RiderSimulation.js');
    var vehicleId = 'sim_' + makeid(6);
    simulatorTask.postMessage({
      action: 'go',
      params: {
        id: vehicleId,
        channel: channelName,
        route: route,
        theme: theme,
        themeSpecificData: themeSpecificData,
        sub: subscribe_key,
        pub: publish_key
      }
    });
  }
}
