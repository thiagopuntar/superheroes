class GameRecord {
    constructor(obj) {
        this.player = obj.player;
        this.points = parseInt(obj.points);
        this.hitNumber = parseInt(obj.hitNumber);
        this.percentage =parseInt(obj.percentage);
    }
}

module.exports = GameRecord;