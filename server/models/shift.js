const shifts = [];

exports.module = class Shift {
  constructor(startTime, endTime, hourlyWage, workplace, comments) {}

  addShift() {
    shifts.push(this);
  }

  //Product.fetchAll()
  static fetchAll() {
    return this.shifts;
  }
};
