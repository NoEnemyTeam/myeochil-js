import { isValidDate } from "./isValidDate";


export function calAge(birthDate: string, referenceDate: string): number | string {
  if (!isValidDate(birthDate) || !isValidDate(referenceDate)) {
    throw new Error("Enter a valid date that exists in the calendar");
  }

  const birth = new Date(birthDate);
  const reference = new Date(referenceDate);


  if (birth.getTime() > reference.getTime()) {
    throw new Error("ReferenceDate is earlier than birthDate.");
  }

  let age = reference.getFullYear() - birth.getFullYear();
  const m = reference.getMonth() - birth.getMonth();

  if (m < 0 || (m === 0 && reference.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}