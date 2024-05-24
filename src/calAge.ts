export function calAge(birthDate: string, referenceDate: string): number | string {
  const birth = new Date(birthDate);
  const reference = new Date(referenceDate);

  if (birth.getTime() > reference.getTime()) {
    return "Error: ReferenceDate is earlier than birthDate.";
  }

  let age = reference.getFullYear() - birth.getFullYear();
  const m = reference.getMonth() - birth.getMonth();

  if (m < 0 || (m === 0 && reference.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}