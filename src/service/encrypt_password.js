import CryptoJS from "crypto-js";

export default {
    Encrypt(text){
        var key = "mo17pr58ab46thai";
        text = CryptoJS.enc.Utf8.parse(text);
        key = CryptoJS.enc.Utf8.parse(key);
        var encrypted = CryptoJS.AES.encrypt(text, key, {
          mode: CryptoJS.mode.ECB,
        });
        return encrypted.ciphertext.toString(CryptoJS.enc.Hex);
      },
      Decrypt(encrypted, key) {
        var key = "mo17pr58ab46thai";
        key = CryptoJS.enc.Utf8.parse(key);
        var decrypted = CryptoJS.AES.decrypt(
          { ciphertext: CryptoJS.enc.Hex.parse(encrypted) },
          key,
          { mode: CryptoJS.mode.ECB }
        );
        return decrypted.toString(CryptoJS.enc.Utf8);


      }

  
};
