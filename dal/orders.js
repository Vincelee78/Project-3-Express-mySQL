const {Status} = require('../models');

async function getAllOrderStatus(){
    const allOrderStatus= await Status.fetchAll().map(status => [status.get('id'), status.get('name')]);
    return allOrderStatus
}

module.exports = {getAllOrderStatus};