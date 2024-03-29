## React Native Football World Cup Score Board

This is a React Native application that is based on a live
Football World Cup Score Board that shows matches and scores.

The board supports the following operations:

1. Start a game. When a game starts, it should capture (being initial score 0 – 0):
   a. Home team
   b. Away team

2. Finish game. It will remove a match from the scoreboard.

3. Update score. Receiving the pair score; home team score and away team score
   updates a game score.

4. Get a summary of games by total score. Those games with the same total score will
   be returned ordered by the most recently added to our system.

As an example, being the current data in the system:

a. Mexico - Canada: 0 - 5
b. Spain - Brazil: 10 – 2
c. Germany - France: 2 – 2
d. Uruguay - Italy: 6 – 6
e. Argentina - Peru: 3 - 1

The summary would provide with the following information:

1. Uruguay 6 - Italy 6
2. Spain 10 - Brazil 2
3. Mexico 0 - Canada 5
4. Argentina 3 - Peru 1
5. Germany 2 - France 2

## Getting Started

## Install dependencies

npm install

# Install Expo globally

npm install -g expo-cli

# Android Studio and Xcode for Emulator

Install Android Studio for Emulator:
`https://developer.android.com/studio`

Install Xcode for IOS simulator:
`https://developer.apple.com/xcode/`

Run the development server with expo:

```
expo start --localhost

```

## Unit Tests with Jest and React Testing Library

To run the Jest Unit test file on `components/Scoreboard.spec.tsx`

```bash
npm test
# or
yarn test
```

## Start the App

expo start --localhost

## Demo
![scoreboard](https://user-images.githubusercontent.com/17410649/225726435-438a8b19-cf7e-4660-9b59-01f8fc799241.png)

## Demo Web Version: 
https://react-next-football-scoreboard-library.vercel.app/
