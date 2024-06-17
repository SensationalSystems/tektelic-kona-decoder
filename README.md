# The Things Network and ChirpStack decoder function for TEKTELIC sensors

**⚠️ Note: This repo is here for historical interest, Tektelic now [publishes decoders here](https://github.com/TektelicCommunications/data-converters).**

TEKTELIC Communications make small "all-in-one" LoRaWAN sensors designed for home/office use. They measure temperature, humidity, PIR activity, and more. This repo contains a decoder function to unpack the payloads of these sensors and separate out the parameters being reported. This is targetted at TTN, but with minor changes will work in other network servers or Node-RED.

We sell the sensors online, here:
 * https://connectedthings.store/tektelic-kona-home-sensor-pir.html
 * https://connectedthings.store/tektelic-kona-home-sensor-base.html

To use this decoder on TTN:
* create a TTN application and register your devices using the TTN console
* in your application, choose "Payload Formats" from the navigation
* paste the decoder function into the textarea

You can test the function by pasting in this example payload: 0100ff080400000e00ff0f04000007710000000003e8020000036700d804688b0b6700b509000000ff0135

This should be turned into a JSON object that looks like this:
```
{
  "acceleration_x": 0
  "acceleration_y": 0
  "acceleration_z": 1
  "activity": null
  "activity_count": null
  "battery_voltage": 3.09
  "break_in": null
  "bytes": (43) [1, 0, 255, 8, 4, 0, 0, 14, 0, 255, 15, 4, 0, 0, 7, 113, 0, 0, 0, 0, 3, 232, 2, 0, 0, 3, 103, 0, 216, 4, 104, 139, 11, 103, 0, 181, 9, 0, 0, 0, 255, 1, 53]
  "decode_data_hex: "0x01,0x00,0xff,0x08,0x04,0x00,0x00,0x0e,0x00,0xff,0x0f,0x04,0x00,0x00,0x07,0x71,0x00,0x00,0x00,0x00,0x03,0xe8,0x02,0x00,0x00,0x03,0x67,0x00,0xd8,0x04,0x68,0x8b,0x0b,0x67,0x00,0xb5,0x09,0x00,0x00,0x00,0xff,0x01,0x35"
  "external_input": false
  "external_input_count": 0
  "humidity": 69.5
  "impact_alarm": null
  "impact_magnitude": null
  "light_detected": false
  "mcu_temperature": 18.1
  "moisture": false
  "reed_count": 0
  "reed_state": false
  "temperature": 21.6
}
```
(actual data from my office)

This code is MIT licenced, and we don't claim it to be excellent, pull requests are encouraged!

## Note to ChirpStack (formerly LoraServer) users

The requirements for ChirpStack are identical to the TTN one except for a slight change to the name of the method called and the orders of parameters Decoder(bytes, port) becomes Decode(port, bytes). There is a wrapper function included to handle this so that the same file will work on both platforms.

To use this decoder in ChirpStack:
* create a ChirpStack application
* choose "Device-profiles" from the navigation and create a new profile.
* Select "Codec" and paste the decoder function into the upper text area.
* register your devices using the ChirpStack console selecting your new profile.

## Contributors
Many thanks to:
 * [avbentem](https://github.com/avbentem) for suggesting fixes to negative temperature and PIR handling
 * [m-markovic](https://github.com/m-markovic) PIR handling
 * [MarkSolcom](https://github.com/MarkSolcom) Accelerometer handling and other fixes

