const ConfigDb = require("../models/ConfigDb")

const fetch = (...args) =>
    import('node-fetch').then(({default: fetch}) => fetch(...args));
module.exports = {
    async index(req, res) {
        const response = await ConfigDb.findAll().then((response) => {
            return res.json(response)

        }).catch(err => {
            console.log(err)
        })
    },

    async store(req, res) {
        const { config, param } = req.body

        const [ createConfigDb ] = await ConfigDb.findOrCreate({
            defaults: { config, param },
            where: { config }
        })

        return res.json(createConfigDb)
    },

    async newFinger(req, res) {
        const fingerprint = await ConfigDb.findByPk(1);
        const fingerNum = fingerprint.param.shift();
        return res.json({
            arr: fingerprint.param,
            num: fingerNum
        })
    },

    async removeFingerNum(req, res) {
        const {num} = req.body;
        const fingerprint = await ConfigDb.findByPk(1);

        const arrWithoutNum = fingerprint.param.filter(item => item !== num)


        await ConfigDb.update({param: arrWithoutNum}, {where: {id: 1}}).then(
            () => {
                return res.json({
                    arr: fingerprint.param,
                    num: num
                })
            }
        ).catch(
            (err) => { return res.json(err) }
        )
    },

    async recoveryFinger(req, res) { //On delete  collaborator finger
        const {param} = req.body
        const fingerprint = await ConfigDb.findByPk(1);
        const fingerNum = fingerprint.param.unshift(param);
        console.log('DESTROy ' + param)

        await ConfigDb.update({param: fingerprint.param}, {where: {id: 1}}).then(
            async (resConfigDb) => {
                console.log("CONFIGGGGGGGGGGG DB ", resConfigDb)
                await fetch('http://192.168.10.85/remove?param='+param,
                    {
                        method: 'GET',
                    }
                ).then((resFinger) => {
                    console.log(resFinger.data)
                }).catch((err) => console.log(err))


                return res.json(fingerNum)
            }
        )
        .catch((err) => {
            return res.json("AAAAAAAAAAAAAHHHHhh",err)
        })
    }
}