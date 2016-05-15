/**
 * Created by zeqi
 * @module interface-->base
 */

'use strict'

class Base {
    constructor(proto, api) {
        this.proto = proto;
        this.api = api;
        this.interfaceDic = {};
        this.baseInterface();
    }

    baseInterface() {
        var self = this;
        self.interfaceDic = {
            save: self.api.save,
            create: self.api.create,
            find: self.api.find,
            findById: self.api.findById,
            findOne: self.api.findOne,
            findListAndCount: self.api.findListAndCount,
            count: self.api.count,
            update: self.api.update,
            findByIdAndUpdate: self.api.findByIdAndUpdate,
            remove: self.api.remove,
            findByIdAndRemove: self.api.findByIdAndRemove
        }
        return self.interfaceDic;
    }

}

module.exports = Base;