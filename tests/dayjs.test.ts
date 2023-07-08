import { describe, it } from "node:test";
import { equal, deepEqual, notEqual, notDeepEqual } from "node:assert/strict";
import dayjs from "../dayjs";

describe("dayjs", () => {
  it("`dayjs('withoutTimezone')` がすでにローカルタイムゾーンに依存している", () => {
    process.env.TZ = "Asia/Tokyo";
    deepEqual(dayjs("2023-07-08 04:52").$d, new Date("2023-07-07T19:52:00.000Z"));
    process.env.TZ = "UTC";
    notDeepEqual(dayjs("2023-07-08 04:52").$d, new Date("2023-07-07T19:52:00.000Z")); // UTCだと失敗する
    deepEqual(dayjs("2023-07-08 04:52").$d, new Date("2023-07-08T04:52:00.000Z"));
  });

  it("`dayjs('withTimezone')` はローカルタイムゾーンに依存しない", () => {
    process.env.TZ = "Asia/Tokyo";
    // ISOString
    deepEqual(dayjs("2023-07-08T04:52:00+09:00").$d, new Date("2023-07-07T19:52:00.000Z"));
    process.env.TZ = "UTC";
    deepEqual(dayjs("2023-07-08T04:52:00+09:00").$d, new Date("2023-07-07T19:52:00.000Z"));
  });

  it("`.format()` がローカルタイムゾーンに依存している", () => {
    process.env.TZ = "Asia/Tokyo";
    const date = dayjs("2023-07-08 04:52");
    equal(date.format(), "2023-07-08T04:52:00+09:00");
    process.env.TZ = "UTC";
    notEqual(date.format(), "2023-07-08T04:52:00+09:00"); // UTCだと失敗する
    equal(date.format(), "2023-07-08T04:52:00+00:00");
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
});
