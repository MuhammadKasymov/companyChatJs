const gTime = (tp: string, mil:number) => {
  let date: Date;
  if (mil != 0) {
    date= new Date(mil)
  }
  else date = new Date();
  const onlyDate: string = date.toLocaleDateString();
  const onlyHours: string = date.toLocaleTimeString().toString();
  switch (tp) {
    case 'HM':  // hours - minute
      return onlyHours.slice(0, -3);
    case 'OD': // only - date
      return onlyDate;
    case 'FT': // full - time
      const fullDate = onlyDate + onlyHours.slice(0, -3);
      return fullDate;
    case 'DM': // date - milliseconds
      return date.getTime();
    default:
      return ''
  }
}


export default gTime;