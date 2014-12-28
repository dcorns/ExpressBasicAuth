/**
 * Created by dcorns on 12/12/14.
 */
'use strict';

module.exports = (function(){
  return{
    decodeBasicAthorizationField: function(txt64){
      //Strip 'Basic ' from txt64
      txt64 = txt64.substr(txt64.indexOf(' ') + 1);
      //Load the base64 characters
      var base64Alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
      //Check for padding character
        , pad = txt64.indexOf('=')
      //Since the decimal representation of each base64 character is its index in base64Alphabet we define a variable for storing it
        , dec64
      //Use binStr to build octets out of the base64 characters
        , binStr = ''
      //Use binStrLn in order to restart building of binStr when it reaches 8 bits
        , binStrLn
      //Use asciiByte to store an 8 bit ascii code when binStr is equal to 8 bits or more
        , asciiByte
      //Use asciiNum to store the decimal representation of each ascii character
        , asciiNum
      //Use textOut to acumulate the final output containing the ascii representation of the username:password
        , textOut = ''
      //Use base64bin to store the 6 bit representation of each base64 character
        , base64bin;
      //Remove the superfluous equal signs from the input
      if (pad > -1) {
        txt64 = txt64.substr(0, pad);
      }
      //Start the loop responsible for building the converted output
      var ln = txt64.length;
      for (var i = 0; i < ln; i++) {
        //Find the index in base64Alphabet of each character and convert it to binary
        dec64 = base64Alphabet.indexOf(txt64[i]);
        base64bin = base10TobaseX(dec64, 2).toString();
        //set the binary result to 6 bits by adding leading zeros where needed
        var bln = base64bin.length;
        for (bln; bln < 6; bln++) {
          base64bin = '0' + base64bin;
        }
        //Acumulate the bits from base64bin until there are 8 or more. Then transfer 8 bits from base64bin to asciiByte
        binStr += base64bin;
        binStrLn = binStr.length;
        if (binStrLn > 7) {
          asciiByte = binStr.substr(0, 8);
          binStr = binStr.substr(8);
          //Convert the binary asciiNum to decimal, convert the decimal to ascii character, and add it to the tail of textOut for final output
          asciiNum = parseInt(asciiByte, 2);
          textOut += String.fromCharCode(asciiNum);
        }
      }
      return textOut;
      //Helper function to convert base10(decimal) numbers over to base2 (binary)
      function base10TobaseX(dec, base) {
        //only converts to base 2 for now
        if (base > 2 || base < 2) return null;
        //Use baseOut to acumulate bits for final output
        var baseOut = ''
        //Use modal to store the remainder of each division operation
          , modal;
        //Divide the decimal input by the base input(2) and then keep dividing each result without the remainder until the result is less or equal to base
        //Each time the division occurs, prepend the remainder to baseOut (final output)
        while (dec >= base) {
          modal = (dec % base).toString();
          baseOut = modal + baseOut;
          dec = Math.floor((dec / base));
        }
        //determine final bit based on what is left after the final divide
        if (dec > 0) baseOut = 1 + baseOut;
        else baseOut = 0 + baseOut;
        return baseOut;
      }
    }
  }
})();