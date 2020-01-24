module.exports = (table) => {
  var strOut = "\n```\n" + `${table[0]}\n${table[1]}\n`;

  // calculating the coloumnWidths with help of the headerSeperator
  var colWidths = [];
  var colIndex = 0;
  for (i = 0; i < table[1].length; i++) {
    if (table[1].substr(i,1) == "═") {
      if (colWidths[colIndex] == undefined) colWidths[colIndex] = 0;
      colWidths[colIndex]++;
    } else {
      colIndex++;
    }
  }
  // parsing table contents
  for (i = 2; i < table.length; i++) { // rows
    for (j = 0; j < colWidths.length; j++) { // coloumns
      if (typeof table[i][j] === 'number') { // numbers orientated RIGHT
        for (k = 0; k < colWidths[j]-2-table[i][j].toString().length; k++) strOut += " "; // fill string to colWidth
      }
      if (table[i][j] == undefined || table[i][j] == null) { // empty cells
        for (k = 0; k < colWidths[j]; k++) strOut += " "; // fill string to colWidth
      } else {
        strOut += " " + table[i][j] + " ";
      }
      if (j < colWidths.length-1) strOut += "│";
    }
    strOut += "\n";
  }
  return (strOut + "```")
}
