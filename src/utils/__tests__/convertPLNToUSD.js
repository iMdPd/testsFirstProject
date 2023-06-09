import { convertPLNToUSD } from "../convertPLNToUSD";
describe("convertPLNToUSD", () => {
  it("should return proper value when good input", () => {
    expect(convertPLNToUSD(1)).toBe("$0.29");
    expect(convertPLNToUSD(2)).toBe("$0.57");
    expect(convertPLNToUSD(20)).toBe("$5.71");
    expect(convertPLNToUSD(12)).toBe("$3.43");
  });
  it("should return NaN when passed value is text", () => {
    expect(convertPLNToUSD("6")).toBeNaN();
    expect(convertPLNToUSD("abc")).toBeNaN();
    expect(convertPLNToUSD("-123")).toBeNaN();
  });
  it("should return NaN when input is empty", () => {
    expect(convertPLNToUSD()).toBeNaN();
  });
  it("should return Error when input is different than string and number", () => {
    expect(convertPLNToUSD({})).toBe("Error");
    expect(convertPLNToUSD([])).toBe("Error");
    expect(convertPLNToUSD(function () {})).toBe("Error");
    expect(convertPLNToUSD(null)).toBe("Error");
    expect(convertPLNToUSD(true)).toBe("Error");
  });
  it("should return $0.00 when input is less than zero", () => {
    expect(convertPLNToUSD(-1)).toBe("$0.00");
    expect(convertPLNToUSD(-12.0)).toBe("$0.00");
    expect(convertPLNToUSD(-123)).toBe("$0.00");
  });
});
