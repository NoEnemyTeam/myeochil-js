import { formatDate } from "./changeTimezone/changeFormat"

export { toLunar, toSolar } from "./convertLunarSolar/convertDate"
export { formatDate } from "./changeTimezone/changeFormat"


console.log(formatDate('2022-03-02', 'DD-MM-YYYY'))
console.log(formatDate('2022-03-02', 'MM-DD-YYYY'))
console.log(formatDate('2022-03-02'))
