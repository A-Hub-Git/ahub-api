"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const pubnub_1 = __importDefault(require("pubnub"));
if ('function' === typeof importScripts) {
    var sharedChannelName;
    var id;
    var route;
    var theme;
    var themeSpecificData;
    var localPubNub;
    var tick = 0;
    var intervalId;
    const onmessage = function (args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (args.data.action === 'go') {
                id = args.data.params.id;
                sharedChannelName = args.data.params.channel;
                route = args.data.params.route;
                theme = args.data.params.theme;
                themeSpecificData = args.data.params.themeSpecificData;
                localPubNub = new pubnub_1.default({
                    subscribeKey: 'sub-c-9fbd5457-645e-4930-8868-1444cb4eb0ec',
                    publishKey: config_1.pubNubConfig.PUBLISH_KEY,
                    userId: id,
                    listenToBrowserNetworkEvents: false
                });
                yield localPubNub.addListener({
                    status: (statusEvent) => __awaiter(this, void 0, void 0, function* () {
                        //console.log(statusEvent)
                    }),
                    message: (payload) => __awaiter(this, void 0, void 0, function* () {
                        //  Received a message from the client intended for the driver
                        //  display that message on the map, beside the vehicle
                        //  This means sending the data back over PubNub
                        if (payload.publisher !== id) {
                            if (payload.message == '\n\n') {
                                //  Clear current map
                                yield localPubNub.publish({
                                    channel: sharedChannelName,
                                    message: {
                                        state: 'CLEAR_INFO_WINDOW'
                                    }
                                });
                            }
                            else {
                                yield localPubNub.publish({
                                    channel: sharedChannelName,
                                    message: {
                                        state: 'ADD_INFO_WINDOW',
                                        data: payload.message
                                    }
                                });
                            }
                        }
                    })
                });
                yield localPubNub.subscribe({
                    channels: [id],
                    withPresence: false
                });
                const vehicleSimulator = new RiderSimulationService(route, 2000, theme, themeSpecificData);
                vehicleSimulator.start();
            }
        });
    };
    class RiderSimulationService {
        constructor(route, simulationInterval, theme, themeSpecificData) {
            this.tick = 0;
            this.interval = simulationInterval;
            this.route = route;
            this.theme = theme;
            this.themeSpecificData = themeSpecificData;
        }
        start() {
            return __awaiter(this, void 0, void 0, function* () {
                this.publishMessage(localPubNub, sharedChannelName, this.route, this.theme, this.themeSpecificData);
                this.intervalId = setInterval(this.publishMessage, this.interval, localPubNub, sharedChannelName, this.route, this.theme, this.themeSpecificData);
            });
        }
        stop() {
            return __awaiter(this, void 0, void 0, function* () {
                clearInterval(this.intervalId);
            });
        }
        publishMessage(localPubNub, channelName, route, theme, themeSpecificData) {
            return __awaiter(this, void 0, void 0, function* () {
                if (this.tick === this.route.length) {
                    //  Notify the dashboard that the entire route has been walked
                    yield localPubNub.publish({
                        channel: channelName,
                        message: {
                            state: 'END_ROUTE'
                        }
                    });
                    clearInterval(this.intervalId);
                    return;
                }
                if (this.route[this.tick] == null)
                    return;
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
                    yield localPubNub.publish({
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
                }
                else if (this.tick < this.route.length) {
                    //  Send a signal if it is just a postional update.  This is more efficient with these high volume, small data transfers
                    yield localPubNub.signal({
                        channel: channelName,
                        message: {
                            lat: localLatitude,
                            lng: localLongitude,
                            tick: this.tick
                        }
                    });
                }
                this.tick++;
            });
        }
    }
}
//# sourceMappingURL=RiderSimulationService.js.map