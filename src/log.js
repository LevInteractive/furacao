'use strict';
const colors = require('colors');

function msgs(args, color) {
  const msgs = [];
  const len = args.length;
  for (let i = 0; i < len; i++) {
    msgs.push(colors[color](`-- ${args[i]}`));
  }
  return msgs;
}

exports.error = function() {
  return console.error.apply(console, msgs(arguments, 'red'));
};

exports.info = function() {
  return console.error.apply(console, msgs(arguments, 'green'));
};

exports.warn = function() {
  return console.warn.apply(console, msgs(arguments, 'yellow'));
};
