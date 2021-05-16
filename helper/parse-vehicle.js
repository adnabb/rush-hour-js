var result = [];
export default function parseVehicle(gamePanel) {
    gamePanel.forEach(function (row) {
        var rowFilter = row.filter(function (value) { return value !== 0; });
        var rowFilterLength = rowFilter.length;
        var uniqueRowFilter = new Set(rowFilter);
        if (rowFilterLength) {
            rowFilter.forEach(function (value) {
                if (uniqueRowFilter.has(value)) {
                    handleVerticalRow(value);
                }
                else {
                    handleHorizonalRow(value);
                }
            });
        }
    });
    return result;
}
function handleHorizonalRow(value) {
    updateDescription(value, 'horizonal');
}
function handleVerticalRow(value) {
    updateDescription(value, 'vertical');
}
function updateDescription(value, direction) {
    var filterd = result.filter(function (desc) { return desc.value === value; });
    if (filterd) {
        filterd[0].length += 1;
    }
    else {
        initDescription(value, direction);
    }
}
function initDescription(value, direction) {
    result.push({
        value: value,
        direction: direction,
        length: 1,
    });
}
