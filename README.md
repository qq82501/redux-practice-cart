# Practice redux toolkit with simple cart example

redux toolkit is the newest version of redux.

1. configureStore to create store.
2. <Provider> to wrap components wanting to subscribe store.
3. createSlice helps split states into groups by their relation.
4. useSelector returning designated state, also help current component subscribe store.
5. useDispatch transform dispatch function from store to current component. By using dispatch, we can operate reducer to update state.
6. async code cannot be executed in reducer, reducer can only accept pure function, so we can put async code in 1. component | 2. Thunk
7. Thunk can be imagined as a custom reducer function which can execute async code.
