import React from "react";
import {
  render,
  cleanup,
  fireEvent,
  waitFor,
  Matcher,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Scoreboard from "./Scoreboard";

afterEach(cleanup);

describe("Football Scoreboard", () => {
  it("renders without crashing", () => {
    const { container } = render(<Scoreboard />);
    expect(container).toBeInTheDocument();
  });

  const matches = [
    { id: 0, teams: "Uruguay vs Italy", score: "0 - 0" },
    { id: 1, teams: "Spain vs Brazil", score: "0 - 0" },
    { id: 2, teams: "Mexico vs Canada", score: "0 - 0" },
    { id: 3, teams: "Argentina vs Peru", score: "0 - 0" },
    { id: 4, teams: "Germany vs France", score: "0 - 0" },
  ];

  it("Start a game. When a game starts, it should capture (being initial scores 0 – 0).", () => {
    const { getByTestId } = render(<Scoreboard />);
    const startButton = getByTestId("start-game-button");
    fireEvent.click(startButton);

    matches.forEach(({ id, teams, score }) => {
      // Render match teams and score
      const matchTeamScore = getByTestId(`match-team-score-${id}`);
      expect(matchTeamScore).toHaveTextContent(teams);
      const matchNumberScore = getByTestId(`match-number-score-${id}`);
      expect(matchNumberScore).toHaveTextContent(score);
    });
  });

  it("Scoreboard renders correctly with the required buttons.", () => {
    const { getByText, getByTestId } = render(<Scoreboard />);

    const title = getByText("Football World Cup Score Board");

    const startButton = getByText("Start Games");
    fireEvent.click(startButton);

    const buttons = [
      ["update-score-button-0", "Update Score"],
      ["finish-game-button-0", "Finish Game"],
      ["update-score-button-1", "Update Score"],
      ["finish-game-button-1", "Finish Game"],
      ["update-score-button-2", "Update Score"],
      ["finish-game-button-2", "Finish Game"],
      ["update-score-button-3", "Update Score"],
      ["finish-game-button-3", "Finish Game"],
      ["update-score-button-4", "Update Score"],
      ["finish-game-button-4", "Finish Game"],
      ["show-summary-button", "Show Summary"],
    ];

    expect(title).toBeInTheDocument();

    buttons.forEach(([testId, textContent]) => {
      const button = getByTestId(testId);
      expect(button).toHaveTextContent(textContent);
    });
  });

  test("Update Score button works for all matches and shows new updated score.", async () => {
    const { getByText, getByTestId } = render(<Scoreboard />);

    fireEvent.click(getByText("Start Games"));

    const updateScoreButtonTests = [
      { id: "0", score: "Uruguay vs Italy", matchScore: "6 - 6" },
      { id: "1", score: "Spain vs Brazil", matchScore: "10 - 2" },
      { id: "2", score: "Mexico vs Canada", matchScore: "0 - 5" },
      { id: "3", score: "Argentina vs Peru", matchScore: "3 - 1" },
      { id: "4", score: "Germany vs France", matchScore: "2 - 2" },
    ];

    updateScoreButtonTests.forEach(async ({ id, score, matchScore }) => {
      const updateScoreButton = await waitFor(() =>
        getByTestId(`update-score-button-${id}`)
      );
      fireEvent.click(updateScoreButton);
      const teamScore = getByTestId(`match-team-score-${id}`);
      expect(teamScore).toHaveTextContent(score);
      const matchNumberScore = getByTestId(`match-number-score-${id}`);
      expect(matchNumberScore).toHaveTextContent(matchScore);
    });
  });

  it("handles the Finish Game button correctly to remove a match from the scoreboard.", () => {
    const { getByText, queryByText, queryAllByTestId } = render(<Scoreboard />);
    fireEvent.click(getByText("Start Games"));

    const finishGameButtons = queryAllByTestId("finish-game-button");
    for (const finishGameButton of finishGameButtons) {
      if (finishGameButton.parentNode) {
        const match = finishGameButton.parentNode.textContent as Matcher;
        fireEvent.click(finishGameButton);
        expect(queryByText(match)).toBeNull();
      }
    }
  });

  it("shows summary of scores.", () => {
    const { getByText } = render(<Scoreboard />);
    fireEvent.click(getByText("Start Games"));
    getByText("Show Summary");
  });

  it("clears scoreboard and resets state.", () => {
    const { getByText, queryByText } = render(<Scoreboard />);
    fireEvent.click(getByText("Start Games"));
    fireEvent.click(getByText("Show Summary"));
    fireEvent.click(getByText("Clear Scoreboard"));
    expect(queryByText("Uruguay vs Italy: 0 - 0")).toBeNull();
    expect(queryByText("Spain vs Brazil: 0 - 0")).toBeNull();
    expect(queryByText("Mexico vs Canada: 0 - 0")).toBeNull();
    expect(queryByText("Argentina vs Peru: 0 - 0")).toBeNull();
    expect(queryByText("Germany vs France: 0 - 0")).toBeNull();
  });
});
