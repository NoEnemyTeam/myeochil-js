export function isValidDate(sDate: string): string | Boolean {
  if (!isNaN(Number(sDate))) {
    throw new Error("Invalid Date Argument: please input correct date. ex) YYYY-MM-DD");
  }  
  const date = new Date(sDate);
  const dateParts = sDate.split('-')
  
  if (dateParts.length != 3)
    throw new Error("Invalid Date Argument: please input correct date. ex) YYYY-MM-DD");

  const year = parseInt(dateParts[0], 10)
  const month = parseInt(dateParts[1], 10) -1
  const day = parseInt(dateParts[2], 10)


  if (date.getFullYear() === year &&
      date.getMonth() === month &&
      date.getDate() === day)
    return true
  else
    return false
}