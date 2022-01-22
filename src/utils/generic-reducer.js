import { isNil } from 'lodash';

export default (initialState, reductionLookup) => (
  state = initialState, { type, payload, getState },
) => {
  const reducer = reductionLookup[type];
  if (isNil(reducer)) return state;
  return reducer(state, payload, getState);
};
