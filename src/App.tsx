import { useState } from "react";

import { NumberInteraction } from "./component/interaction/NumberInteraction";
import { Screen } from "./component/provide/Screen";
import { Game } from "./component/rythm/Game";
import { PreviewOverlay } from "./component/rythm/PreviewOverlay";
import { State } from "./type/State";

import styles from "./App.module.scss";

export const App = () => {
  const initGame = {
    time: 0,
    duration: 2,
    score: {
      length: 94,
    },
  };
  const [game, setGame] = useState(initGame);
  const [time, setTime] = State.partial([game, setGame])("time");

  return (
    <div className={styles.App}>
      <Screen>
        <Game {...game} />
        <PreviewOverlay
          gameTime={time}
          setGameTime={setTime}
          gameDuration={game.duration}
          scoreLength={game.score.length}
        />
      </Screen>
      <div className={styles.Control}>
        <NumberInteraction
          label="time"
          state={State.partial([game, setGame])("time")}
        />
        <NumberInteraction
          label="duration"
          state={State.partial([game, setGame])("duration")}
        />
        <button
          type="button"
          onClick={() => setGame(initGame)}
        >reset</button>
      </div>
    </div>
  );
};
