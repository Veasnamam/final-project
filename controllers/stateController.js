const data = {
    states: require("../model/states.json"),
    setStates: (data) => {
        this.states = data
    },
};
//get all states
const getStates = (req, res) => {
    const states = data.states;
    if (req.query.contig === 'false'){
        const state = states.filter((sta) => (sta.code === "AK") || (sta.code ==="HI"));
        res.json(state);
    }
    else if (req.query.contig === 'true'){
        const state = states.filter((sta) => (sta.code !== "AK") && (sta.code !=="HI"));
        res.json(state);
    }
    else{
        res.json(states);
    }
};



//get a state
const getState = (req, res) => {
    const state = data.states.find(
        (sta) => sta.code === (req.params.state)
    );
    if (!state) {
        return res
        .status(400)
        .json({message : `State with state-code '${req.params.state}' is not found`});
    }
    res.json(state);
};

//get state capital
const getStateCapital = (req, res) => {
    const state = data.states.find(
        (sta) => sta.code === (req.params.state)
    );
    if(!state){
        return res
        .status(400)
        .json({message: `State with state-code '${req.params.state}' is not found`});
    }
    res.json({state: state.state, capital: state.capital_city});
};

//get state nickname
const getStateNickname = (req, res) => {
    const state = data.states.find(
        (sta) => sta.code === (req.params.state)
    );
    if(!state){
        return res
        .status(400)
        .json({message: `State with state-code '${req.params.state}' is not found`});
    }
    res.json({state: state.state, nickname: state.nickname});
};

//get state population
const getStatePopulation = (req, res) => {
    const state = data.states.find(
        (sta) => sta.code === (req.params.state)
    );
    if(!state){
        return res
        .status(400)
        .json({message: `State with state-code '${req.params.state}' is not found`});
    }
    res.json({state: state.state, population: state.population});
};

//get state admission date
const getStateAdmission = (req, res) => {
    const state = data.states.find(
        (sta) => sta.code === (req.params.state)
    );
    if(!state){
        return res
        .status(400)
        .json({message: `State with state-code '${req.params.state}' is not found`});
    }
    res.json({state: state.state, admitted: state.admission_date});
};

module.exports = {
    getStates,
    getState,
    getStateCapital,
    getStateNickname,
    getStatePopulation,
    getStateAdmission,
};