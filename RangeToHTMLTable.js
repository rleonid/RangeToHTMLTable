/**
 * Be good to this code.
 */

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function reformatNumber(format,value){
  var conv = format.replace(/[0#]+/g,function(v){return v.length})
                   .replace('%', '');
  var printfStyle = "%" + conv + "f";
  var isPercent = format.lastIndexOf('%') >= 0;
  var num = isPercent ? value * 100 : value;
  var str = Utilities.formatString(printfStyle,num);
  return isPercent ? str + "%" : str;
}

function whiteToBlack(color){
  return (color == 'white') ? 'black' : color;    
}

/**
 * Convert a Range object (from Google Spreadsheet) into a string
 * of the HTML table. Only supports basic number formats and table colors.
 * @param {Range} range A spreadsheet range that contains the table.
 */
function rangeToTable(range){
  var values  = range.getValues();
  var formats = range.getNumberFormats();
  var colors  = range.getBackgrounds();

  var returnMe = "<table>";
  for(var r = 0; r < values.length; r++){
    var row = "<tr>";
    for (var c = 0; c < values[r].length; c++){
      var vf = (isNumber(values[r][c]) && formats[r][c] != "") ?
        reformatNumber(formats[r][c], values[r][c]):
        values[r][c];
      row += "<td style='color: " + whiteToBlack(colors[r][c]) + "'>" 
              + vf + "</td>";
    }
    row += "</tr>";
    returnMe += row;
  }

  returnMe += "</table>";
  return returnMe;
}
