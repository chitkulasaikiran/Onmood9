export class DateUtil {
  
  static getDateAfterDays(days: number) {
    return new Date(new Date().getTime()+(days * 24 * 60 * 60 * 1000));
  }
  static convertNumberToTime(timeInNumber: number) {
    // console.log(timeInNumber)
    let minutes = Math.floor(timeInNumber / 60);  
    let seconds = Math.floor(timeInNumber % 60);
    
    let M = ''+minutes;
    let S = ''+seconds;
    if (minutes < 10) {
        M = '0' + minutes; 
    }
    if (seconds < 10) {
        S = '0' + seconds; 
    }
    return M+":"+S;
  }

  static getTimeInSeconds(timeInNumber: number) {
    return Math.floor(timeInNumber);
  }
  static secondsToHms(timeInSeconds: number) {
    timeInSeconds = Number(timeInSeconds);
    var h = Math.floor(timeInSeconds / 3600);
    var m = Math.floor(timeInSeconds % 3600 / 60);
    var s = Math.floor(timeInSeconds % 3600 % 60);

    var hDisplay = h > 0 ? h +":" : "00:";
    var mDisplay = m > 0 ? m +":" : "00:";
    var sDisplay = s > 9 ? s : "0"+s;
    return hDisplay + mDisplay + sDisplay; 
}

}