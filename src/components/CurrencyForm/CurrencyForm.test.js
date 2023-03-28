import { render } from "@testing-library/react";
import CurrencyForm from "./CurrencyForm";

describe("Component CurrencyForm", () => {
  it("Should render without crashing", () => {
    render(<CurrencyForm action={() => {}} />);
  });
});
