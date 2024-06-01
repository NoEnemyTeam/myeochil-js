import { isValidDate } from "./isValidDate";

export function calAge(birthDate: string, referenceDate: string): number | string {
  const birth = new Date(birthDate);
  const reference = new Date(referenceDate);

  if (!isValidDate(birth) || !isValidDate(reference)) {
    throw new Error("Error: Enter a valid date that exists in the calendar");
  }

  if (birth.getTime() > reference.getTime()) {
    throw new Error("Error: ReferenceDate is earlier than birthDate.");
  }

  let age = reference.getFullYear() - birth.getFullYear();
  const m = reference.getMonth() - birth.getMonth();

  if (m < 0 || (m === 0 && reference.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}