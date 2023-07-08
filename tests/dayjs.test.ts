import { describe, it } from "node:test";
import { equal, deepEqual, notEqual, notDeepEqual } from "node:assert/strict";
import dayjs from "../dayjs";

describe("dayjs", () => {
  it("`dayjs('withoutTimezone')` はローカルタイムゾーンに依存する", () => {
    const str = "2023-07-08 04:52";

    process.env.TZ = "Asia/Tokyo";
    deepEqual(dayjs(str).$d, new Date("2023-07-07T19:52:00.000Z"));

    process.env.TZ = "UTC";
    notDeepEqual(dayjs(str).$d, new Date("2023-07-07T19:52:00.000Z")); // UTCだと失敗する
    deepEqual(dayjs(str).$d, new Date("2023-07-08T04:52:00.000Z"));
  });

  it("`dayjs('withTimezone')` はローカルタイムゾーンに依存しない", () => {
    const strWithTimezone = "2023-07-08T04:52:00+09:00";

    process.env.TZ = "Asia/Tokyo";
    deepEqual(dayjs(strWithTimezone).$d, new Date("2023-07-07T19:52:00.000Z"));

    process.env.TZ = "UTC";
    deepEqual(dayjs(strWithTimezone).$d, new Date("2023-07-07T19:52:00.000Z"));
  });

  it("`.format()` がローカルタイムゾーンに依存している", () => {
    process.env.TZ = "Asia/Tokyo";
    const date = dayjs("2023-07-08 04:52");
    equal(date.format(), "2023-07-08T04:52:00+09:00");

    process.env.TZ = "UTC";
    notEqual(date.format(), "2023-07-08T04:52:00+09:00"); // UTCだと失敗する
    equal(date.format(), "2023-07-08T04:52:00+00:00");
  });

  it("`dayjs('withTimezone')` した時点でタイムゾーン情報が欠落している", () => {
    const date = dayjs("2023-07-08T04:52:00+09:00");
    deepEqual(date.$d, new Date("2023-07-07T19:52:00.000Z")); // Dateオブジェクトはタイムゾーンを持たない

    process.env.TZ = "Asia/Tokyo";
    notEqual(date.format(), "2023-07-08T04:52:00+09:00"); // 想定挙動はこれ
    equal(date.format(), "2023-07-07T19:52:00+09:00"); // 実際の挙動。意味不明
    deepEqual(date.$d, new Date("2023-07-07T19:52:00.000Z")); // dayjsオブジェクト内部の時刻は一見正しいように見えるが、この"Z"が見せかけにすぎないことが以上より明らか

    process.env.TZ = "UTC";
    equal(date.format(), "2023-07-07T19:52:00+00:00");
  });

  it("`.tz().format()` はローカルタイムゾーンに依存しない", () => {
    const date1 = dayjs("2023-07-08T04:52:00+09:00");
    const date2 = dayjs("2023-07-07T19:52:00Z");

    process.env.TZ = "Asia/Tokyo";
    equal(date1.tz().format(), "2023-07-08T04:52:00+09:00");
    equal(date2.tz().format(), "2023-07-08T04:52:00+09:00");

    process.env.TZ = "UTC";
    equal(date1.tz().format(), "2023-07-08T04:52:00+09:00");
    equal(date2.tz().format(), "2023-07-08T04:52:00+09:00");
  });

  it("`.utc().format()` はローカルタイムゾーンに依存しない", () => {
    const date1 = dayjs("2023-07-08T04:52:00+09:00");
    const date2 = dayjs("2023-07-07T19:52:00Z");

    process.env.TZ = "Asia/Tokyo";
    equal(date1.utc().format(), "2023-07-07T19:52:00Z");
    equal(date2.utc().format(), "2023-07-07T19:52:00Z");

    process.env.TZ = "UTC";
    equal(date1.utc().format(), "2023-07-07T19:52:00Z");
    equal(date2.utc().format(), "2023-07-07T19:52:00Z");
  });

  it("`dayjs('withoutTimezone').format('YYYY-MM-DD')` はローカルタイムゾーンに依存しない（ように見える）", () => {
    const str = "2023-07-08 04:52";

    process.env.TZ = "Asia/Tokyo";
    equal(dayjs(str).format("YYYY-MM-DD"), "2023-07-08");

    process.env.TZ = "UTC";
    equal(dayjs(str).format("YYYY-MM-DD"), "2023-07-08");
  });

  it("タイムゾーンなし日付文字列をUTCにパースする", () => {
    const str = "2023-07-08 04:52";

    process.env.TZ = "Asia/Tokyo";
    equal(dayjs.tz(str).toISOString(), "2023-07-07T19:52:00.000Z");

    process.env.TZ = "UTC";
    equal(dayjs.tz(str).toISOString(), "2023-07-07T19:52:00.000Z");
  });
});
