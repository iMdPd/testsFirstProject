import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CurrencyForm from "./CurrencyForm";

describe("Component CurrencyForm", () => {
  it("Should render without crashing", () => {
    render(<CurrencyForm action={() => {}} />);
  });
  it("should run action callback with proper data on form submit", () => {
    const testCases = [
      { testAmount: "100", testFrom: "PLN", testTo: "USD" },
      { testAmount: "20", testFrom: "USD", testTo: "PLN" },
      { testAmount: "200", testFrom: "PLN", testTo: "USD" },
      { testAmount: "345", testFrom: "USD", testTo: "PLN" },
    ];

    for (let { testAmount, testFrom, testTo } of testCases) {
      const action = jest.fn();
      render(<CurrencyForm action={action} />);

      const submitButton = screen.getByText("Convert");
      const amountValueInput = screen.getByTestId("amountValue");
      const convertFromCurrencySelect = screen.getByTestId("fromCurrency");
      const convertToCurrencySelect = screen.getByTestId("toCurrency");

      userEvent.type(amountValueInput, testAmount);
      userEvent.selectOptions(convertFromCurrencySelect, testFrom);
      userEvent.selectOptions(convertToCurrencySelect, testTo);

      userEvent.click(submitButton);

      expect(action).toHaveBeenCalledTimes(1);
      expect(action).toHaveBeenCalledWith({
        amount: +testAmount,
        from: testFrom,
        to: testTo,
      });
      cleanup();
    }
  });
});
