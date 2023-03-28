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
    expect(convertPLNToUSD("a")).toBeNaN();
    expect(convertPLNToUSD("-123")).toBeNaN();
  });

});