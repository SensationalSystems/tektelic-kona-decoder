# The Things Network decoder function for TEKTELIC sensors
TEKTELIC Communications make small "all-in-one" LoRaWAN sensors designed for home/office use. They measure temperature, humidity, PIR activity, and more. This repo contains a decoder function to unpack the payloads of these sensors and separate out the parameters being reported. This is targetted at TTN, but with minor changes will work in other network servers or Node-RED.

We sell the sensors online, here:
 * https://connectedthings.store/tektelic-kona-home-sensor-pir.html
 * https://connectedthings.store/tektelic-kona-home-sensor-base.html

To use this:
* create a TTN application and register your devices using the TTN console
* in your application, choose "Payload Formats" from the navigation
* paste the decoder function into the textarea

You can test the function by pasting in this example payload: 0367008904686400FF011D

This should be turned into a JSON object that looks like this:
```
{
  "activity": null,
  "battery_voltage": 2.85,
  "bytes": "A2cAiQRoZAD/AR0=",
  "external_input": null,
  "humidity": 50,
  "reed_count": null,
  "reed_state": null,
  "temperature": 13.700000000000001
}
```
(actual data from my particularly chilly office)

This code is MIT licenced, and we don't claim it to be excellent, pull requests are encouraged! This isn't yet complete, it doesn't yet support accelerometer payloads for example. Again, pull request!

## Note to ChirpStack (formerly LoraServer) users

If you are using this codec with ChirpStack then change the name of the method and the orders of parameters to Decode(port, bytes)

## Contributors
Many thanks to:
 * [avbentem](https://github.com/avbentem) for suggesting fixes to negative temperature and PIR handling
 * [m-markovic](https://github.com/m-markovic) PIR handling

