const Mocha = require('mocha');
const fs = require('fs');
const path = require('path');
const process = require('process');

const mocha = new Mocha();
const testDir = 'test'

const flag = process.argv[2];
const oldSnapshots = {};
const newSnapshots = {};

fs.readdirSync(testDir)
    .filter((file) => file.substr(-3) === '.js')
    .forEach((file) => {
        const snapshotName = path.join(
            __dirname, 'test', '__snapshots__',
            file.replace('_test.js', '_snap.json')
        );

        oldSnapshots[file] = !fs.existsSync(snapshotName)
            ? {}
            : JSON.parse(fs.readFileSync(snapshotName, 'utf-8'));
        newSnapshots[file] = {};

        mocha.addFile(path.join(testDir, file))
    });

const runner = mocha.run(function (failures) {
    process.on('exit', function () {
        process.exit(failures);
    });
});

runner.on('fail', (test, err) => {
    if (err.operator === 'snapshotMatches') {
        const file = path.basename(test.file);
        if (flag === '-u') {
            newSnapshots[file][test.title] = err.actual;
        }
    }
});

runner.on('pass', (test) => {
    const file = path.basename(test.file);
    newSnapshots[file][test.title] = oldSnapshots[file][test.title];
});

runner.on('end', () => {
    if (flag !== '-u') {
        return;
    }
    for (const file in newSnapshots) {
        if (Object.keys(newSnapshots).length === 0) {
            // skip files without any snapshots
            continue;
        }

        const snapshotName = path.join(
            __dirname, 'test', '__snapshots__',
            file.replace('_test.js', '_snap.json')
        );
        const data = JSON.stringify(newSnapshots[file], null, 4);
        fs.writeFileSync(snapshotName, data, {encoding: 'utf-8'});
        console.log(`wrote: ${snapshotName}`);
    }
});
