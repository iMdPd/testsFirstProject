import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import ResultBox from "./ResultBox";

describe("Component ResultBox", () => {
  it("Should render without crashing", () => {
    render(<ResultBox from="PLN" to="USD" amount={100} />);
  });
  it("Should render proper information about conversion when PLN -> USD", () => {
    const testParams = [
      { testFrom: "PLN", testTo: "USD", testAmount: 1 },
      { testFrom: "PLN", testTo: "USD", testAmount: 99 },
      { testFrom: "PLN", testTo: "USD", testAmount: 167 },
      { testFrom: "PLN", testTo: "USD", testAmount: 350 },
    ];

    for (let { testFrom, testTo, testAmount } of testParams) {
      render(<ResultBox from={testFrom} to={testTo} amount={testAmount} />);

      const conversionResult = (testAmount / 3.5).toFixed(2);

      const output = screen.getByTestId("convertResult");
      expect(output).toHaveTextContent(
        `PLN ${testAmount}.00 = $${conversionResult}`
      );
      cleanup();
    }
  });
  it("Should render proper information about conversion when USD -> PLN", () => {
    const testParams = [
      { testFrom: "USD", testTo: "PLN", testAmount: 1 },
      { testFrom: "USD", testTo: "PLN", testAmount: 61 },
      { testFrom: "USD", testTo: "PLN", testAmount: 100 },
      { testFrom: "USD", testTo: "PLN", testAmount: 166 },
    ];

    for (let { testFrom, testTo, testAmount } of testParams) {
      render(<ResultBox from={testFrom} to={testTo} amount={testAmount} />);

      const conversionResult = (testAmount * 3.5).toFixed(2);

      const output = screen.getByTestId("convertResult");
      expect(output).toHaveTextContent(
        `$${testAmount}.00 = PLN ${conversionResult}`
      );
      cleanup();
    }
  });
  it("Should render proper information about conversion when both currency are the same", () => {
    const testParams = [
      { testFrom: "USD", testTo: "USD", testAmount: 1 },
      { testFrom: "USD", testTo: "USD", testAmount: 230 },
      { testFrom: "PLN", testTo: "PLN", testAmount: 30 },
      { testFrom: "PLN", testTo: "PLN", testAmount: 1 },
    ];

    for (let { testFrom, testTo, testAmount } of testParams) {
      render(<ResultBox from={testFrom} to={testTo} amount={testAmount} />);

      const renderCurrencyForm = (currency) => {
        if (currency === "USD") {
          return "$";
        } else {
          return "PLN ";
        }
      };

      const output = screen.getByTestId("convertResult");
      expect(output).toHaveTextContent(
        `${renderCurrencyForm(testFrom)}${testAmount}.00 = ${renderCurrencyForm(
          testTo
        )}${testAmount}.00`
      );
      cleanup();
    }
  });
  it("Should render text when Amount is less than zero", () => {
    const testParams = [
      { testFrom: "USD", testTo: "PLN", testAmount: -1 },
      { testFrom: "PLN", testTo: "USD", testAmount: -12 },
      { testFrom: "PLN", testTo: "PLN", testAmount: -123 },
      { testFrom: "USD", testTo: "USD", testAmount: -304 },
    ];

    for (let { testFrom, testTo, testAmount } of testParams) {
      render(<ResultBox from={testFrom} to={testTo} amount={testAmount} />);

      const output = screen.getByTestId("convertResult");
      expect(output).toHaveTextContent("Wrong value...");
      cleanup();
    }
  });
});
