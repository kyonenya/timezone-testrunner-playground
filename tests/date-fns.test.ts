import { describe, it } from "node:test";
import { equal, notEqual } from "node:assert/strict";
import { parseISO } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { format } from "date-fns";

describe("str-fns", () => {
  it("`parseISO()` はローカルタイムゾーンに依存しない", () => {
    const str1 = "2000-01-01T00:00:00+09:00";
    const str2 = "1999-12-31T15:00:00.000Z";

    process.env.TZ = "Asia/Tokyo";
    equal(parseISO(str1).toISOString(), "1999-12-31T15:00:00.000Z");
    equal(parseISO(str2).toISOString(), "1999-12-31T15:00:00.000Z");

    process.env.TZ = "UTC";
    equal(parseISO(str1).toISOString(), "1999-12-31T15:00:00.000Z");
    equal(parseISO(str2).toISOString(), "1999-12-31T15:00:00.000Z");
  });

  it("ISOStringをAsia/Tokyoの時刻文字列にフォーマットする", () => {
    const str = "1999-12-31T15:00:00.000Z";

    process.env.TZ = "Asia/Tokyo";
    equal(
      format(
        utcToZonedTime(parseISO(str), "Asia/Tokyo"),
        "yyyy-MM-dd HH:mm:ss"
      ),
      "2000-01-01 00:00:00"
    );

    process.env.TZ = "UTC";
    equal(
      format(
        utcToZonedTime(parseISO(str), "Asia/Tokyo"),
        "yyyy-MM-dd HH:mm:ss"
      ),
      "2000-01-01 00:00:00"
    );
  });
});
