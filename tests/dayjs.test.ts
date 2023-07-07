import { describe, it } from "node:test";
import { equal, notEqual } from "node:assert/strict";
import dayjs from "dayjs";

describe("dayjs", () => {
  it("dayjsの日付文字列パースがローカルタイムゾーンに依存している", () => {
    equal(process.env.TZ, undefined);
    equal(dayjs("2023-07-08 04:52").format(), "2023-07-08T04:52:00+09:00");
    process.env.TZ = "UTC";
    notEqual(dayjs("2023-07-08 04:52").format(), "2023-07-08T04:52:00+09:00"); // UTCだと失敗する
    equal(dayjs("2023-07-08 04:52").format(), "2023-07-08T04:52:00+00:00");
  });
});
