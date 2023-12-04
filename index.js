import { publicEncrypt, privateDecrypt } from "crypto";
import { resolve } from "path";
import { readFileSync } from "fs";
const passphrase = 'TrafikSimurgBilişim'
const publicKeyBase64 = `LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQ0lqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FnOEFNSUlDQ2dLQ0FnRUFxRU1PNzBDdys4S3VHVzFaWE9hZApkT0U4Yno5Rk1hZFB3Wk1Vc0hHTStoVHBXd0hSLzZ6aVRXbWJKTVN0Q0IzbnZpUklLUzI4SzhLQ0puRm03eW9PCi9qanhHUllUbUMrdlUzTzBEQmh1Rnk0OUtuWVk0cmZmR3lubDZSaEhnUSs4dW5yYXN0OFJLNjhMb25xb09kcFkKbUxyc3FIeU1zak1TcUJwc25pSEZSWmlqd2pKU2tLcHI0cGRGMkZMeFBpWDh6WU45cmZZVGE2M3AzSnJoK2QwSAo5ajJJY3k2UmdXdExFR1VPWVJ1OEJmVUlXczFLNlFUU0txUU9lWGNscFhJMnJkQjdoN2Y0MENhMXdPLzMrM2QvCnVTMFpsMnJGR0VHZFVMTWtCby8xY0NZTTlMaE1Jc1pGbnI4bnQycjZCTDZKd3BocloyNkhtQU1scW13YnQ3aHMKM0U4TWdIS05RUzlEcld4MjVpWHZ6Q0pRNXkrNTJRYnFqcVllcFg5clNGM3JYZEZyTTVESWtXcml5L1NHY0Y4RgptU3RFTVBnSGZrMXB5aGkzN3QvQ3lSbXE3cGljbXNvaHB0Z3ZvQnA2MG1JR3dFMngwZENUYXA5VmgycVZad0wxCnE3aHdkYmQvMmo4RVFPNGowNDVFYnB3M2NYditBQVc0Y3owVzlzUmVCOXlON05rLytmcm5ONldYekttSnd0MU0KSE9BRnRDN0pKZXZ0d0VzK2tqcHE4Y0Exci9Xa290RUhJUHZtNkd2ZlJtblJVV1ZnRTZEaW9hY3QxU2V5TkErNQo3R0RJcC9ZUFdVQkh0blRadjNXU2VldGhCbU5jWW1iNVdBdkVxUytxRlBrV1REZlNuRnNYdVhSSGx2RTVCSDkxCmNnUzZIWlFzbkxLOFVwTGR6UUZENEhVQ0F3RUFBUT09Ci0tLS0tRU5EIFBVQkxJQyBLRVktLS0tLQo=`;
const pubKey = 'MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAqEMO70Cw+8KuGW1ZXOaddOE8bz9FMadPwZMUsHGM+hTpWwHR/6ziTWmbJMStCB3nviRIKS28K8KCJnFm7yoO/jjxGRYTmC+vU3O0DBhuFy49KnYY4rffGynl6RhHgQ+8unrast8RK68LonqoOdpYmLrsqHyMsjMSqBpsniHFRZijwjJSkKpr4pdF2FLxPiX8zYN9rfYTa63p3Jrh+d0H9j2Icy6RgWtLEGUOYRu8BfUIWs1K6QTSKqQOeXclpXI2rdB7h7f40Ca1wO/3+3d/uS0Zl2rFGEGdULMkBo/1cCYM9LhMIsZFnr8nt2r6BL6JwphrZ26HmAMlqmwbt7hs3E8MgHKNQS9DrWx25iXvzCJQ5y+52QbqjqYepX9rSF3rXdFrM5DIkWriy/SGcF8FmStEMPgHfk1pyhi37t/CyRmq7picmsohptgvoBp60mIGwE2x0dCTap9Vh2qVZwL1q7hwdbd/2j8EQO4j045Ebpw3cXv+AAW4cz0W9sReB9yN7Nk/+frnN6WXzKmJwt1MHOAFtC7JJevtwEs+kjpq8cA1r/WkotEHIPvm6GvfRmnRUWVgE6Dioact1SeyNA+57GDIp/YPWUBHtnTZv3WSeethBmNcYmb5WAvEqS+qFPkWTDfSnFsXuXRHlvE5BH91cgS6HZQsnLK8UpLdzQFD4HUCAwEAAQ=='
const keyBegin = 'LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0='
const keyEnd = 'LS0tLS1FTkQgUFVCTElDIEtFWS0tLS0t'

// var encryptStringWithRsaPublicKey = function(toEncrypt, relativeOrAbsolutePathToPublicKey) {
//     var absolutePath = path.resolve(relativeOrAbsolutePathToPublicKey);
//     var publicKey = fs.readFileSync(absolutePath, "utf8");
//     var buffer = Buffer.from(toEncrypt);
//     var encrypted = crypto.publicEncrypt(publicKey, buffer);
//     return encrypted.toString("base64");
// };

const encryptStringWithRsaPublicKey = (toEncrypt, publicKeyEncoded) => {
    // const publicKey = Buffer.from(publicKeyEncoded, 'base64').toString('ascii')
    // const publicKey = atob(publicKeyEncoded)
    const publicKey = `${atob(keyBegin)}\n${pubKey}\n${atob(keyEnd)}`
    var buffer = Buffer.from(toEncrypt);
    var encrypted = publicEncrypt(publicKey, buffer);
    return encrypted.toString("base64");
};

const decryptStringWithRsaPrivateKey = (toDecrypt, relativeOrAbsolutePathtoPrivateKey) => {
    var absolutePath = resolve(relativeOrAbsolutePathtoPrivateKey);
    var privateKey = readFileSync(absolutePath, "utf8");
    var buffer = Buffer.from(toDecrypt, "base64");
    const decrypted = privateDecrypt(
        {
            key: privateKey.toString(),
            passphrase: passphrase,
        },
        buffer,
    )
    return decrypted.toString("utf8");
};

import { writeFileSync } from 'fs';
import { generateKeyPairSync } from 'crypto';

function generateKeys() {
    const { publicKey, privateKey } = generateKeyPairSync('rsa', 
    {
            modulusLength: 4096,
            namedCurve: 'secp256k1', 
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'     
            },     
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem',
                cipher: 'aes-256-cbc',
                passphrase: passphrase
            } 
    });
    // console.log(publicKey)
    const encodedPublicKey = Buffer.from(publicKey).toString('base64')
    const decodedPublicKey = Buffer.from(encodedPublicKey, 'base64').toString('ascii')
    console.log(`Encoded:\n${encodedPublicKey}`);
    console.log(`Decoded:\n${decodedPublicKey}`);
    writeFileSync('private.pem', privateKey)
    writeFileSync('public.pem', publicKey.toString('base64'))
    writeFileSync('public.base64.txt', encodedPublicKey )
}

// generateKeys();
const testText = 'Hüseyin Enginar bu testi yaptı.\nGerçekten çalışıyor!'
const encryptedText = encryptStringWithRsaPublicKey(testText, publicKeyBase64)
console.log(`Encrypted:\n${encryptedText}`)
const decryptedText = decryptStringWithRsaPrivateKey(encryptedText, 'private.pem');
console.log(`Decrypted:\n${decryptedText}`)