import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import MyProperties from "./Pages/MyProperties/MyProperties"; // Adjust the path accordingly
import userReducer from "./redux/user/userSlice"; // Path to your userSlice

const mockStore = createStore(userReducer);

const initialState = {
  currentUser: {
    _id: "167fbbaa6723ee081f58268f123",
    name: "Mukhtar1",
  },
  properties: [
    {
      _id: "1",
      name: "Property 1",
      location: "Location 1",
      plotSize: "1000 sq ft",
      type: "Residential",
      price: 50000,
      numberOfPlot: 5,
      plotNumber: 1,
      paymentStatus: "Paid",
      paymentHistory: [
        { amount: 10000, date: "2025-04-01", status: "Completed" },
      ],
      imageUrl: "https://example.com/property1.jpg",
    },
    {
      _id: "2",
      name: "Property 2",
      location: "Location 2",
      plotSize: "2000 sq ft",
      type: "Commercial",
      price: 100000,
      numberOfPlot: 3,
      plotNumber: 2,
      paymentStatus: "Unpaid",
      paymentHistory: [],
      imageUrl: "https://example.com/property2.jpg",
    },
  ],
};

const renderWithState = (state) => {
  render(
    <Provider store={mockStore}>
      <MyProperties />
    </Provider>
  );
};

describe("MyProperties Component", () => {
  it("displays the user's properties", () => {
    renderWithState(initialState);

    // Check if the properties are displayed
    expect(screen.getByText(/My Properties/i)).toBeInTheDocument();
    expect(screen.getByText(/Property 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Location 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Price: Naira 50000/i)).toBeInTheDocument();
    expect(screen.getByText(/Payment Status: Paid/i)).toBeInTheDocument();
  });

  it("shows the no properties message when no properties are available", () => {
    renderWithState({ ...initialState, properties: [] });

    expect(
      screen.getByText(/You have no properties yet./i)
    ).toBeInTheDocument();
  });

  it("toggles the payment history visibility", () => {
    renderWithState(initialState);

    // Initially, payment history should be hidden
    expect(screen.queryByText(/Payment History/i)).not.toBeInTheDocument();

    // Toggle payment history
    fireEvent.click(screen.getByText(/Show Payment History/i));

    // After toggle, payment history should appear
    expect(screen.getByText(/Payment History/i)).toBeInTheDocument();
    expect(screen.getByText(/Amount Paid: Naira 10000/i)).toBeInTheDocument();

    // Toggle again to hide the payment history
    fireEvent.click(screen.getByText(/Hide Payment History/i));

    // After toggle, payment history should disappear
    expect(screen.queryByText(/Payment History/i)).not.toBeInTheDocument();
  });

  it("handles missing imageUrl gracefully", () => {
    const stateWithoutImage = {
      ...initialState,
      properties: [
        {
          ...initialState.properties[0],
          imageUrl: "",
        },
      ],
    };

    renderWithState(stateWithoutImage);
    expect(screen.getByText(/Property 1/i)).toBeInTheDocument();
    expect(screen.queryByAltText("Property 1 preview")).toBeNull(); // No image should be displayed
  });
});
