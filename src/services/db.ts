import { HistoryInfo } from "@/type";
import { openDatabaseSync } from "expo-sqlite";
import { minVersion, version } from "./version";

export const db = openDatabaseSync("db.sqlite");

const dbName = "test";

db.execSync(
  `
  CREATE TABLE IF NOT EXISTS ${dbName} (
    id TEXT PRIMARY KEY,
    version INTEGER,
    data TEXT
  )
  `
);

interface Row {
  name: string;
  version: number;
  data: string;
}

//查询
export const select = async () => {
  const res: Row[] = await db.getAllAsync(
    `select * from ${dbName} where version >= ?`,
    [minVersion]
  );

  return res.map(item => JSON.parse(item.data)) as HistoryInfo[];
};

//插入
export const insert = async (data: HistoryInfo) => {
  await db.runAsync(
    `insert into ${dbName} (id, version,data) values (?, ?, ?)`,
    [data.id, version, JSON.stringify(data)]
  );
};

//修改
export const update = async (data: HistoryInfo) => {
  await db.runAsync(`update ${dbName} set data = ? where id = ?`, [
    JSON.stringify(data),
    data.id,
  ]);
};

//删除
export const remove = async (id: string) => {
  await db.runAsync(`delete from ${dbName} where id = ?`, [id]);
};
