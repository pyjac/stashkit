#!/usr/bin/env node

var cmdLine = require('commander');

cmdLine.version('0.0.1')
    .option('start','Start Server')
    .option('stop','Stop Server')
    .option('list','List Buckets')

    .option('create:user','Start Server')
    .option('create:bucket','Creates a Bucket')

    .option('show:logs','Shows Logs')
    .parse(process.argv);


console.log('Vroom!');