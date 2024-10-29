"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterOutliers = filterOutliers;
function filterOutliers(array) {
    const values = array.concat();
    values.sort((a, b) => a - b);
    const q1 = values[Math.floor((values.length / 4))];
    const q3 = values[Math.ceil((values.length * (3 / 4)))];
    const iqr = q3 - q1;
    const maxValue = q3 + iqr * 1.5;
    const minValue = q1 - iqr * 1.5;
    const filteredValues = values.filter((x) => (x >= minValue) && (x <= maxValue));
    return filteredValues;
}
//# sourceMappingURL=index.js.map