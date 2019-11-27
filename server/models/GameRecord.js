const moment = require('moment');

class GameRecord {
    constructor(obj) {
        if (obj._id) {
            this._id = obj._id;
        }
        
        this.player = obj.player;
        this.points = parseInt(obj.points);
        this.hitNumber = parseInt(obj.hitNumber);
        this.percentage = parseInt(obj.percentage);
        this.createdAt = obj.createdAt || new Date();
    }

    get date() {
        return moment(this.createdAt).format('DD/MM/YYYY  HH:mm');
    }

    toJSON() {
        const { ...objJson } = this;
        objJson.date = this.date;
        return objJson;
    }
}

module.exports = GameRecord;