const fastify = require('fastify')({ logger: true });


//Ruta de ejemplo
fastify.get('/', (req, rep) => {
    rep.send({key:'value'});
});

//Ruta con parametros
fastify.get('/:id',(req, rep) => {
    rep.send({
        usuario: req.params.id
    });
});

fastify.post('/crear',(req, rep) => {
    let {data} = req.body;
    rep.send({
        usuario: data
    })
});

fastify.delete('/delete/:id',(req,rep) => {
    rep.send({
        id: req.params.id
    });
});

fastify.patch('/update/:id', (req,rep) => {
    let {data} = req.body;

    //Capturando error
    if(!data){
        rep.status(500).send({
            message:'Error'
        })
    }

    rep.send({
        usuario: data
    });
});

const start = async () => {
    try{
        await fastify.listen(3000);
        fastify.log.info(`server listening on ${fastify.server.address().port}`)
    }catch(err){
        fastify.log.error(err)
        process.exit(1);
    }
}

start();