export function isValidDate(sDate: string): string | Boolean {
    const date = new Date(sDate);
    const dateParts = sDate.split('-')
    
    if (dateParts.length != 3)
      throw new Error("Enter the date in YYYY-MM-DD format.");
  
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