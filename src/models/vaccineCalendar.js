export default class VaccineCalendar {

  constructor(calendar) {
    this._calendar = calendar;
  }

  get dates() {
    let dates = [];
    this._calendar.centers.map(c=>{
        c.sessions.map((s) => {
            if (dates.indexOf(s.date) === -1) dates.push(s.date);
          });
    })
    return dates;
  }
  get filterByMinAge(){
      return []
  }
  
}