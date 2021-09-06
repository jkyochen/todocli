#!/usr/bin/env node

const fs = require("fs");
const DataSaveFileName = "todocli.json";

// {
//     "lastIndex": 1,
//     "todoData": [
//         {
//             "index": 1,
//             "data": "",
//         }
//     ],
// }

let [,,subCommand, ...extParams] = process.argv;

if (!subCommand || !["add", "done", "list"].includes(subCommand)) {
    console.log(`
        TODO Application

        Sub command: add/done/list

        Example:

        todo add <item>
        todo done <itemIndex>
        todo list

        `);
    return;
}

console.log(subCommand);
console.log(extParams);

if (subCommand === "add") {
    if (extParams.length !== 1) {
        console.log(`
            add param error

            Example:

            todo add <item>
            `);
        return;
    }

    let saveData;
    if (fs.existsSync(DataSaveFileName)) {
        saveData = require(`./${DataSaveFileName}`);
    }

    if (!saveData) {
        saveData = {
            lastIndex: 1,
            todoData: [
                {
                    index: 1,
                    data: extParams,
                }
            ]
        }
    } else {
        let curIndex = saveData.lastIndex + 1;
        saveData.todoData.push({
            index: curIndex,
            data: extParams,
        });
        saveData.lastIndex = curIndex;
    }

    fs.writeFileSync(DataSaveFileName, JSON.stringify(saveData));
    console.log("Add todo success");
}
