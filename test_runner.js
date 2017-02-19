const Mocha = require('mocha');
const fs = require('fs');
const path = require('path');
const process = require('process');

const mocha = new Mocha();
const testDir = 'test'

const flag = process.argv[2];
const snapshots = {};

fs.readdirSync(testDir)
    .filter((file) => file.substr(-3) === '.js')
    .forEach((file) => {
        const snapshotName = path.join(
            __dirname, 'test', '__snapshots__',
            file.replace('_test.js', '_snap.json')
        );

        snapshots[file] = !fs.existsSync(snapshotName)
            ? {}
            : JSON.parse(fs.readFileSync(snapshotName, 'utf-8'))

        mocha.addFile(path.join(testDir, file))
    });

const runner = mocha.run(function (failures) {
    process.on('exit', function () {
        process.exit(failures);
    });
});

// TODO(kevinb) delete entries that don't exist enymore
runner.on('fail', (test, err) => {
    if (err.operator === 'snapshotMatches') {
        const file = path.basename(test.file);
        if (flag === '-u') {
            snapshots[file][test.title] = err.actual;
        }
    }
});

runner.on('end', () => {
    if (flag !== '-u') {
        return;
    }
    for (const file in snapshots) {
        const snapshotName = path.join(
            __dirname, 'test', '__snapshots__',
            file.replace('_test.js', '_snap.json')
        );
        const data = JSON.stringify(snapshots[file], null, 4);
        fs.writeFileSync(snapshotName, data, {encoding: 'utf-8'});
        console.log(`wrote: ${snapshotName}`);
    }
});
