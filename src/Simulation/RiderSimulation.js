import {Client, DirectionsResponse} from '@googlemaps/google-maps-services-js';
import {pubNubConfig} from '../config';
import Pubnub from 'pubnub';

if ('function' === typeof importScripts) {
  var sharedChannelName;
  var id;
  var route;
  var theme;
  var themeSpecificData;
  var localPubNub;
  var tick = 0;
  var intervalId;
  onmessage = async function (args) {
    if (args.data.action === 'go') {
      id = args.data.params.id;
      sharedChannelName = args.data.params.channel;
      route = args.data.params.route;
      theme = args.data.params.theme;
      themeSpecificData = args.data.params.themeSpecificData;
      localPubNub = new Pubnub({
        subscribeKey: 'sub-c-9fbd5457-645e-4930-8868-1444cb4eb0ec',
        publishKey: pubNubConfig.PUBLISH_KEY,
        userId: id,
        listenToBrowserNetworkEvents: false
      });
      await localPubNub.addListener({
        status: async statusEvent => {
          //console.log(statusEvent)
        },
        message: async payload => {
          //  Received a message from the client intended for the driver
          //  display that message on the map, beside the vehicle
          //  This means sending the data back over PubNub
          if (payload.publisher !== id) {
            if (payload.message == '\n\n') {
              //  Clear current map
              await localPubNub.publish({
                channel: sharedChannelName,
                message: {
                  state: 'CLEAR_INFO_WINDOW'
                }
              });
            } else {
              await localPubNub.publish({
                channel: sharedChannelName,
                message: {
                  state: 'ADD_INFO_WINDOW',
                  data: payload.message
                }
              });
            }
          }
        }
      });
      await localPubNub.subscribe({
        channels: [id], //  To communicate directly with this vehicle, use the id as the channel name.  Used in the 'send message to driver' logic
        withPresence: false
      });
      const vehicleSimulator = new RiderSimulationService(
        route,
        2000,
        theme,
        themeSpecificData
      );
      vehicleSimulator.start();
    }
  };

  class RiderSimulationService {
    constructor(route, simulationInterval, theme, themeSpecificData) {
      this.tick = 0;
      this.interval = simulationInterval;
      this.route = route;
      this.theme = theme;
      this.themeSpecificData = themeSpecificData;
    }

    async start() {
      this.publishMessage(
        localPubNub,
        sharedChannelName,
        this.route,
        this.theme,
        this.themeSpecificData
      );
      this.intervalId = setInterval(
        this.publishMessage,
        this.interval,
        localPubNub,
        sharedChannelName,
        this.route,
        this.theme,
        this.themeSpecificData
      );
    }
    async stop() {
      clearInterval(this.intervalId);
    }
    async publishMessage(
      localPubNub,
      channelName,
      route,
      theme,
      themeSpecificData
    ) {
      if (this.tick === this.route.length) {
        //  Notify the dashboard that the entire route has been walked
        await localPubNub.publish({
          channel: channelName,
          message: {
            state: 'END_ROUTE'
          }
        });
        clearInterval(this.intervalId);
        return;
      }
      if (this.route[this.tick] == null) return;

      //  I sometimes saw the Google results coming back with lat / longs with crazy precisions.
      let localLatitude = this.route[this.tick].lat;
      localLatitude =
        Math.round((localLatitude + Number.EPSILON) * 10000000) / 10000000;
      let localLongitude = this.route[this.tick].lng;
      localLongitude =
        Math.round((localLongitude + Number.EPSILON) * 10000000) / 10000000;

      if (this.tick === 0) {
        //  Notify the dashboard that we are sending a new route.  This will be the FIRST time the
        //  dashboard learns that there is a vehicle en route.
        await localPubNub.publish({
          channel: channelName,
          message: {
            state: 'START_ROUTE',
            lat: localLatitude,
            lng: localLongitude,
            theme: theme,
            themeSpecificData: themeSpecificData,
            route: route
          }
        });
      } else if (this.tick < this.route.length) {
        //  Send a signal if it is just a postional update.  This is more efficient with these high volume, small data transfers
        await localPubNub.signal({
          channel: channelName,
          message: {
            lat: localLatitude,
            lng: localLongitude,
            tick: this.tick
          }
        });
      }
      this.tick++;
    }
  }
}
