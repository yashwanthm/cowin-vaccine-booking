export default class VaccineCalendar {

  constructor(calendar) {
    this._calendar = calendar;
  }

  get dates() {
    let dates = [];
    this._calendar.sessions.map((s) => {
      if (dates.indexOf(s.date) === -1) dates.splice(s.date);
    });
    return dates;
  }
  
}