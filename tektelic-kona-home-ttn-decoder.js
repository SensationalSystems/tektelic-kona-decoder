/* 
 * Decoder function for The Things Network to unpack the payload of TEKTELIC's All-in-One Home sensors
 * More info on the sensors/buy online:
 * https://connectedthings.store/products/tektelic-kona-home-sensor-pir
 * https://connectedthings.store/products/tektelic-kona-home-sensor-base
 * This function was created by Al Bennett at Sensational Systems - al@sensational.systems
 */

function Decoder(bytes, port) {

    var params = {
        "temperature": null,
        "humidity": null,
        "battery_voltage": null,
        "activity": null,
        "reed_state": null,
        "reed_count": null,
        "external_input": null,
        "bytes": bytes
    }

    for (var i = 0; i < bytes.length; i++) {
        // Handle temperature
        if(0x03 === bytes[i] && 0x67 === bytes[i+1]) {
            // Sign-extend to 32 bits to support negative values, by shifting 24 bits
            // (16 too far) to the left, followed by a sign-propagating right shift:
            params.temperature = (bytes[i+2]<<24>>16 | bytes[i+3]) / 10;
            i = i+3;
        }
        
        // Handle humidity
        if(0x04 === bytes[i] && 0x68 === bytes[i+1]) {
            params.humidity = 0.5 * bytes[i+2];
            i = i+2;
        }
        
        // Handle battery voltage
        if(0x00 === bytes[i] && 0xFF === bytes[i+1]) {
            params.battery_voltage = 0.01 * ((bytes[i+2] << 8) | bytes[i+3]);
            i = i+3;
        }
        
        // Handle PIR activity
        //check the channel and type
        if(0x0A === bytes[i] && 0x00 === bytes[i+1]) {
          i = i+1;
          //check data
          if (0x00 === bytes[i+1]) {
             params.activity = false;
             i = i+1;
          }
          else if( 0xFF === bytes[i+1]) {
            params.activity = true;
            i = i+1;
          }
        }
        
        // Handle reed switch state
        if(0x01 === bytes[i] && 0x00 === bytes[i+1]) {
            if(0x00 === bytes[i+2]) {
                params.reed_state = true;
            } else if(0xFF === bytes[i+2]) {
                params.reed_state = false;
            }
            i = i+2;
        }
        
        // Handle reed switch count
        if(0x08 === bytes[i] && 0x04 === bytes[i+1]) {
            params.reed_count = (bytes[i+2] << 8) | bytes[i+3];
            i = i+3;
        }
        
        // Handle reed switch state
        if(0x0E === bytes[i] && 0x00 === bytes[i+1]) {
            if(0x00 === bytes[i+2]) {
                params.external_input = true;
            } else if(0xFF === bytes[i+2]) {
                params.external_input = false;
            }
            i = i+2;
        }
    }

    return params

}
