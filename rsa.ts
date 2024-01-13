import forge from "node-forge";

const rsa = forge.pki.rsa;

async function main() {
    // Se genera el par de claves, pública y privada
    const keypair = await generateKeys();
    // Se genera el message digest (función hash criptográfica))
    const md = forge.md.sha1.create();
    // Se firma el mensaje con la clave privada
    const signature = signData(keypair.privateKey, md);
    // Se verifica el mensaje con la clave pública
    const verified = keypair.publicKey.verify(md.digest().bytes(), signature);
    // Vemos el resultado (booleano) de la verificación
    console.log(verified);
}

function generateKeys() {
    return new Promise<forge.pki.rsa.KeyPair>(function(resolve, reject) {
     rsa.generateKeyPair({bits: 2048, workers: 2}, function(err, keypair) {
         if(err) {
             reject(err);
         }
 
         resolve(keypair);
     })
    })
 }
 
function signData(privateKey: forge.pki.rsa.PrivateKey, md: forge.md.sha1.MessageDigest) {
    md.update("Este es el mensaje a firmar", 'utf8');
    return privateKey.sign(md);
}

main();