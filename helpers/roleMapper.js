"use strict";

const roleMapper = (repository, context) => {
    const map = {
        Dashboard: {
            Maker: repository.findByMaker,
            Approval: repository.findByApproval,
            Checker: repository.findByChecker
        },
    };

    return map[context] || {};
};

module.exports= {
    roleMapper
}
