function getLeftHint(matrix) {
  let result = [];

  matrix.forEach((line) => {
    let leftHints = [];
    let counter = 0;
    line.forEach((cell, idx) => {
      if (cell.value === false && counter > 0) {
        leftHints.push(counter);
        counter = 0;
      }
      if (cell.value === true) {
        counter += 1;
      }

      if (idx === line.length - 1 && counter > 0) {
        leftHints.push(counter);
        counter = 0;
      }
    });
    leftHints = leftHints.map((el) => ({ name: 'hint', value: el }));
    result.push(leftHints.concat(line));
  });

  const max = result.map((el) => el.length);
  max.sort((a, b) => b - a);

  result = result.map((el) => {
    if (el.length < max[0]) {
      let i = max[0] - el.length;
      while (i > 0) {
        el.unshift({ name: 'hint', value: null });
        i -= 1;
      }
    }
    return el;
  });

  return result;
}

function turnLeft(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;

  const rotatedMatrix = Array.from({ length: cols }, () => Array(rows).fill(0));
  for (let i = 0; i < rows; i += 1) {
    for (let j = 0; j < cols; j += 1) {
      rotatedMatrix[cols - 1 - j][i] = matrix[i][j];
    }
  }
  return rotatedMatrix;
}

function turnRight(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;

  const rotatedMatrix = Array.from({ length: cols }, () => Array(rows).fill(0));
  for (let i = 0; i < rows; i += 1) {
    for (let j = 0; j < cols; j += 1) {
      rotatedMatrix[j][rows - 1 - i] = matrix[i][j];
    }
  }

  return rotatedMatrix;
}

function addFieldData(matrix) {
  const res = [];
  matrix.forEach((line) => {
    const newLine = line.map((cell) => ({
      name: 'cell',
      value: cell,
    }));
    res.push(newLine);
  });
  return res;
}

function addHorisontalLines(matrix) {
  const res = matrix.map((el, i) => {
    let val = el;
    if ((i + 1) % 5 === 0 && !el.every((item) => item.name === 'hint')) {
      val = el.map((item) => {
        const withBorder = item;
        if (item.border) {
          withBorder.border += ' top';
        } else {
          withBorder.border = 'top';
        }
        return withBorder;
      });
    }
    return val;
  });
  return res;
}

function addVerticalLines(matrix) {
  let start = null;
  const res = matrix.map((el, i) => {
    let val = el;

    if (
      i !== 0 &&
      ((matrix[+i - 1].every((item) => item.name === 'hint') && !el.every((item) => item.name === 'hint')) ||
        (i - start) % 5 === 0)
    ) {
      start = i;
      val = el.map((item) => {
        const withBorder = item;
        if (item.border) {
          withBorder.border += ' right';
        } else {
          withBorder.border = 'right';
        }
        return withBorder;
      });
    }

    return val;
  });

  return res;
}

function changeToBool(matrix) {
  const res = [];
  matrix.map((line) => {
    const row = line.map((el) => {
      let val = false;
      if (el === 1) {
        val = true;
      }
      return val;
    });
    res.push(row);
    return line;
  });
  return res;
}

export default function calculateMatrix(matrix) {
  const val = [...matrix];
  let res = changeToBool(val);
  res = addFieldData(res);
  res = getLeftHint(res);
  res = turnLeft(res);
  res = getLeftHint(res);

  res = addVerticalLines(res);
  res = turnLeft(res);
  res = addHorisontalLines(res);

  res = turnRight(res);
  res = turnRight(res);

  return res;
}
