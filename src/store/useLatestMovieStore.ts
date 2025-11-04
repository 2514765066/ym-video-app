import { getLast } from "@/services/api";
import { MovieInfo } from "@/type";
import { proxy } from "valtio";

type LastState = {
  data: MovieInfo[];
};

const createInitState = (): LastState => {
  return {
    data: [],
  };
};

export const latestMovieState = proxy<LastState>({
  data: [],
});

export const init = async () => {
  Object.assign(latestMovieState, createInitState());

  const data = await getLast();

  latestMovieState.data = data;
};
