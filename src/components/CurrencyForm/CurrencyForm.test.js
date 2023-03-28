import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CurrencyForm from "./CurrencyForm";

describe("Component CurrencyForm", () => {
  it("Should render without crashing", () => {
    render(<CurrencyForm action={() => {}} />);
  });
  it("should run action callback with proper data on form submit", () => {
    const action = jest.fn();
    render(<CurrencyForm action={action} />);

    const submitButton = screen.getByText("Convert");
    const amountValueInput = screen.getByTestId("amountValue");
    const convertFromCurrencySelect = screen.getByTestId("fromCurrency");
    const convertToCurrencySelect = screen.getByTestId("toCurrency");

    userEvent.type(amountValueInput, "100");
    userEvent.selectOptions(convertFromCurrencySelect, "PLN");
    userEvent.selectOptions(convertToCurrencySelect, "USD");

    userEvent.click(submitButton);

    expect(action).toHaveBeenCalledTimes(1);
    expect(action).toHaveBeenCalledWith({
      amount: 100,
      from: "PLN",
      to: "USD",
    });
  });
});
