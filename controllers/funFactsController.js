const Funfacts = require('../model/Funfacts');

//get all funfacts
const getFunfacts = async (req, res) => {
    const funfacts = await Funfacts.find();
    if (!funfacts){
        return res.status(400)({ funfacts: []});
    }
    res.json(funfacts);
}

//create fun facts
const createNewFunFact = async(req, res) => {
    if(!req.params?.state || !req.body?.funfacts){
        return res.status(400).json({message: "State code and fun facts are required"});
    }
    try{
        const result = await Funfacts.create({
            stateCode: req.params.state,
            funfacts: req.body.funfacts,
        });
        res.status(201).json(result);
    }
    catch (err){
        console.log(err);
    }
};

//Update fun facts
const updateFunFact = async (req, res) =>{
    if(!req.params?.state){
        return res.status(400).json({message: "State-code is required"});
    }
    const funfact = await Funfacts.findOne({stateCode: req.params.state}).exec();
    if(!funfact){
        return res
        .status(204)
        .json({message: `No funfact matches with state-code ${req.params.state}`});
    }
    if(req.body?.stateCode) funfact.stateCode = req.body.stateCode;
    if(req.body?.funfacts) funfact.funfacts = req.body.funfacts;
    const result = await funfact.save();
    res.json(result);
};

//delete fun facts
const deleteFunfact = async (req, res) =>{
    if(!req.params?.state){
        return res.status(400).json({message: `State with state-code '${req.params.state}' is not found.`});
    }
    const funfact = await Funfacts.findOne({stateCode: req.params.state}).exec();
    if(!funfact){
        return res
        .status(204)
        .json({message: `No funfact matches with state-code '${req.params.state}'`});
    }
    const result = await Funfacts.deleteOne({stateCode: req.params.state});
    res.json(result);
};

//get Fun fact
const getFunFact = async (req, res) => {
    if(!req.params?.state){
        return res.status(400).json({message: `State with state-code '${req.params.state}' is not found.`});
    }
    const funfact = await Funfacts.findOne({stateCode: req.params.state}).exec();
    if(!funfact){
        return res
        .status(204)
        .json({message: `No funfact matches with state-code '${req.params.state}'`});
    }
    const randomFact = funfact.funfacts[Math.floor(Math.random() * funfact.funfacts.length)];
    res.json({funfact: randomFact});
};

module.exports = {
    getFunfacts,
    createNewFunFact,
    updateFunFact,
    deleteFunfact,
    getFunFact
};