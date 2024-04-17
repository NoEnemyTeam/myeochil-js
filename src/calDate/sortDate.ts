export const sortDates = (dates: string[], option: string): string[] => {

  const compareDates = (date1: string, date2: string): number => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    
    return d1.getTime() - d2.getTime();
  };

  var sortedDates: string[] = [...dates];

  if (option === 'asc') {
    sortedDates.sort(compareDates);
    
  } else if (option === 'desc') {
    sortedDates.sort((date1, date2) => compareDates(date2, date1));
  }

  return sortedDates;
}
