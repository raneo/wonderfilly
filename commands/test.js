const transf = require("../modules/tableToString.js");
exports.run = async (client, message, args) => {
  var test1 = [1,2,3];
  //test2[] = 45;
  var table = [
    " T │  WP │ R │ Ext │ Min │ ++ ",
    "═══╪═════╪═══╪═════╪═════╪════",
    [1,25,3,56,32,"raneo"],
    [2,20,2,6,20, "günni"],
    [3,5,1,1,9,4],
    [null, 66, 1, "tes"],
    test1
  ]
  message.channel.send("test:\n" + transf(table));
}
