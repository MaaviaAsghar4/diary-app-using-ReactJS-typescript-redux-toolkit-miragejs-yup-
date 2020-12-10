import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../Interface/type";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null as User | null,
  },
  reducers: {
    setUser(state any, { payload }: PayloadAction<User | null>) {
       return state = (payload !== null) ? payload : null;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
