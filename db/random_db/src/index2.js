const connect = require('@databases/sqlite');
const {sql} = require('@databases/sqlite');
const faker = require('faker');

const db = connect('../../test.db');

async function prepare() {
  await db.query(sql`
    CREATE TABLE IF NOT EXISTS app_data (
      id VARCHAR NOT NULL PRIMARY KEY,
      value VARCHAR NOT NULL
    );
  `);
}
const prepared = prepare();

async function set(id, value) {
  await prepared;
  await db.query(sql`
    INSERT INTO app_data (id, value)
      VALUES (${id}, ${value})
    ON CONFLICT (id) DO UPDATE
      SET value=excluded.value;
  `);
}

async function get(id) {
  await prepared;
  const results = await db.query(sql`
    SELECT value FROM app_data WHERE id=${id};
  `);
  if (results.length) {
    return results[0].value;
  } else {
    return undefined;
  }
}

async function remove(id) {
  await prepared;
  await db.query(sql`
    DELETE FROM app_data WHERE id=${id};
  `);
}

async function run() {
  const runCount = JSON.parse((await get('run_count')) || '0');
  console.log('run count =', runCount);
  await set('run_count', JSON.stringify(runCount + 1));
  console.log(await get('name'));
  await set('name', 'Forbes');
  console.log(await get('name'));
  await set('name', 'Forbes Lindesay');
  console.log(await get('name'));
  remove('name');
}
run().catch((ex) => {
  console.error(ex.stack);
  process.exit(1);
});