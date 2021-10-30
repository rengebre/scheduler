import { useState } from "react";

const useVisualMode = function(initial) {
  const [state, setState] = useState({
    mode: initial,
    history: []
  });

  const transition = function(mode, replace) {
    setState((prev) => {
      const history = [...prev.history];
      
      // replace boolean check. don't add prev mode to history if you want to replace the prev mode with the current one
      if (!replace) {
        history.push(prev.mode);
      }

      return {
        ...prev,
        mode,
        history
      }
    });

  };
  
  const back = function() {
    setState((prev) => {
      if (prev.history.length < 1) {
        return {...prev};
      }

      const history = [...prev.history]
      const mode = history.pop();
      return {
        ...prev,
        mode,
        history
      }
    })
  };
  
  return { mode: state.mode, transition, back };
}

export default useVisualMode;