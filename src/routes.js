const { Router } = require('express')
const fs = require('fs')
const getStat = require('util').promisify(fs.stat);

const router = Router()

// 10 * 1024 * 1024 // 10MB
// usamos um buffer minúsculo! O padrão é 64k
const highWaterMark =  2;

router.get('/audio', async (req, res) => {
    const filePath = './src/audio.ogg';
    
    // usou a instrução await
    const stat = await getStat(filePath);

    // exibe uma série de informações sobre o arquivo
    console.log(stat);

    res.writeHead(200, {
        'Content-Type': 'audio/ogg',
        'Content-Length': stat.size
    });

    const stream = fs.createReadStream(filePath, { highWaterMark });

    // só exibe quando terminar de enviar tudo
    stream.on('end', () => console.log('acabou'));

    // faz streaming do audio 
    stream.pipe(res);
});

module.exports = router