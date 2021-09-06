#!/usr/bin/env node

let [,,subCommand] = process.argv;

if (!subCommand || !["add", "done", "list"].includes(subCommand)) {
    console.log(`
        TODO Application

        Sub command: add/done/list

        Example:

        todo add test
        todo done 1
        todo list

        `);
    return;
}

console.log(subCommand);
