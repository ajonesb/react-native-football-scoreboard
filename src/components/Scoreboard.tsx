import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable, ScrollView } from "react-native";

/* 
Interface for the Match object which should have a home property that is a string, 
an away property that is a string, and a score property that is an array of two numbers.
*/

interface Match {
  home: string;
  away: string;
  score: [number, number];
}

/* Initial scores as state using UseState hook */

const Scoreboard: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([
    { home: "Uruguay", away: "Italy", score: [0, 0] },
    { home: "Spain", away: "Brazil", score: [0, 0] },
    { home: "Mexico", away: "Canada", score: [0, 0] },
    { home: "Argentina", away: "Australia", score: [0, 0] },
    { home: "Germany", away: "France", score: [0, 0] },
  ]);

  /*The useState hook to create a state variable called showScores and a function 
  called setShowScores that can be used to update it. */

  /* The showScores variable is used to track whether or not the scores for the
   matches should be displayed on the screen.  
 */

  const [showScores, setShowScores] = useState<boolean>(false);

  /* Sets the state to show a summary of all scores on the UI.
  When the Show Summary button is clicked, displays the summary of scores. 
  */

  const [showSummary, setShowSummary] = useState<boolean>(false);

  const handleStartGame = () => {
    setShowScores(true);
  };

  /* The handleFinishGame function is used to finish a game and remove it from 
  the scoreboard.

  Takes one parameter, the index of the match in the matches array.
  Then created a copy of the matches using the spread operator, removes 
  the match using splice method, then sets state with updated matches 
  array using setMatches.

  Causes the component to re render and not display the finished game anymore.
  
  */

  const handleFinishGame = (index: number) => {
    const updatedMatches = [...matches];
    updatedMatches.splice(index, 1);
    setMatches(updatedMatches);
  };

  /* The handleUpdateScore function is used to update the score of a match when 
  the "Update Score" button is clicked. 
  
  It takes three parameters: the index of the match in the matches array, 
  the new home score, and the new away score. 

  It creates a copy of the matches array using the spread operator, 
  updates the score of the match at the given index, and sets the state 
  with the updated matches array using setMatches. 
  
  This causes the component to re-render and display the new score.
  */

  const handleUpdateScore = (index: number) => {
    const updatedMatches = [...matches];
    switch (index) {
      case 0:
        updatedMatches[index].score = [6, 6];
        break;
      case 1:
        updatedMatches[index].score = [10, 2];
        break;
      case 2:
        updatedMatches[index].score = [0, 5];
        break;
      case 3:
        updatedMatches[index].score = [3, 1];
        break;
      case 4:
        updatedMatches[index].score = [2, 2];
        break;
    }
    setMatches(updatedMatches);
  };

  /* The handleShowSummary function is used to show the summary of scores 
  when the "Show Summary" button is clicked. 
  
  It simply sets the state of showSummary to true using the setShowSummary function. 
  
  */

  const handleShowSummary = () => {
    setShowSummary(true);
  };

  /* 
  Used to clear scoreboard and reset state variables.
  Sets matches state to initial value.
  */

  const handleClearScoreboard = () => {
    setMatches([
      { home: "Uruguay", away: "Italy", score: [0, 0] },
      { home: "Spain", away: "Brazil", score: [0, 0] },
      { home: "Mexico", away: "Canada", score: [0, 0] },
      { home: "Argentina", away: "Australia", score: [0, 0] },
      { home: "Germany", away: "France", score: [0, 0] },
    ]);

    /* Sets the showScores state to false, and sets the showSummary state to false 
    using the setMatches, setShowScores, and setShowSummary functions. 
    Causes the component to re-render and display the initial state of the scoreboard.
    */

    setShowScores(false);
    setShowSummary(false);
  };

  return (
    <ScrollView nestedScrollEnabled={true} style={{ width: "100%" }}>
      <Text style={styles.title}>Football World Cup Score Board</Text>
      <View style={styles.main}>
        {matches.map((match, index) => (
          <View key={index} style={styles.description_games_container}>
            <Text
              data-testid={`match-team-score-${index}`}
              style={styles.match}
            >
              {match.home} vs {match.away}
            </Text>
            {showScores && (
              <>
                <View style={styles.score_container}>
                  <Text
                    data-testid={`match-number-score-${index}`}
                    style={styles.score}
                  >
                    {match.score[0]} - {match.score[1]}
                  </Text>
                </View>
                <View style={styles.button_container}>
                  <Pressable
                    data-testid={`update-score-button-${index}`}
                    style={styles.button_change_score}
                    onPress={() => handleUpdateScore(index)}
                  >
                    <Text style={styles.button_text}>Update Score</Text>
                  </Pressable>
                  <Pressable
                    data-testid={`finish-game-button-${index}`}
                    style={styles.button_finish_game}
                    onPress={() => handleFinishGame(index)}
                  >
                    <Text style={styles.button_text}>Finish Game</Text>
                  </Pressable>
                </View>
              </>
            )}
          </View>
        ))}
        {!showScores && (
          <View style={styles.button_container}>
            <Pressable
              data-testid="start-game-button"
              style={styles.button_start_game}
              onPress={handleStartGame}
            >
              <Text style={styles.button_text}>Start Games</Text>
            </Pressable>
          </View>
        )}
      </View>

      {showScores && (
        <View>
          <View style={styles.button_container}>
            <Pressable
              data-testid="show-summary-button"
              style={styles.button_show_summary}
              onPress={handleShowSummary}
            >
              <Text style={styles.button_text}>Show Summary</Text>
            </Pressable>
          </View>
          {showSummary && (
            <View>
              <Text style={styles.title}>Summary of all scores:</Text>

              {matches.map((match, index) => (
                <View key={index} style={styles.description_games_container}>
                  <Text data-testid={`score-${index}`} style={styles.match}>
                    {match.home} vs {match.away}
                  </Text>
                  <View style={styles.score_container}>
                    <Text
                      data-testid={`match-score-${index}`}
                      style={styles.score}
                    >
                      {match.score[0]} - {match.score[1]}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}
          {showSummary && (
            <View style={styles.button_container}>
              <Pressable
                data-testid="clear-scoreboard-button"
                style={styles.button_clear_scoreboard}
                onPress={handleClearScoreboard}
              >
                <Text style={styles.button_text}>Clear Scoreboard</Text>
              </Pressable>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 10,
    maxWidth: 1200,
    color: "white",
  },
  match: {
    color: "white",
    fontSize: 20,
    fontFamily: "System",
  },
  title: {
    fontSize: 25,
    fontFamily: "System",
    marginTop: 20,
    color: "#A143F8",
    textTransform: "uppercase",
    alignSelf: "center",
    textAlign: "center",
    fontWeight: "bold",
  },
  score_container: {
    display: "flex",
  },
  score: {
    marginTop: 20,
    color: "#6AFF00",
    fontSize: 30,
    fontFamily: "System",
  },
  description_games_container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: 40,
    width: "100%",
    // zIndex: 2,
    fontFamily: "System",
    position: "relative",
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // black with 50% opacity
    color: "#fff",
    borderWidth: 1,
    borderColor: "#282828",
    borderRadius: 8,
    margin: 15,
    alignSelf: "center",
  },
  section_title: {
    fontSize: 20,
    fontFamily: "System",
    marginTop: 20,
    color: "#A143F8",
  },
  button_container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    marginHorizontal: 20,
  },

  button_text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
    letterSpacing: 0.25,
    fontFamily: "System",
  },

  button_start_game: {
    backgroundColor: "#05A7FF",
    padding: 20,
    borderRadius: 8,
    textAlign: "center",
    marginTop: 20,
    margin: "auto",
  },

  button_finish_game: {
    backgroundColor: "deeppink",
    padding: 20,
    borderRadius: 8,
    textAlign: "center",
    marginTop: 20,
  },
  button_change_score: {
    backgroundColor: "#585858",
    padding: 20,
    borderRadius: 8,
    textAlign: "center",
    marginTop: 20,
  },
  button_show_summary: {
    backgroundColor: "#C800FF",
    padding: 20,
    borderRadius: 8,
    textAlign: "center",
    marginTop: 20,
  },
  button_clear_scoreboard: {
    backgroundColor: "#0073FF",
    padding: 20,
    borderRadius: 8,
    textAlign: "center",
    marginTop: 20,
    maxWidth: 300,
  },
});
export default Scoreboard;
