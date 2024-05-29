// slices/counterSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'sonner';
interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state, action: PayloadAction<string>) {
      state.value++;
      toast.success(`You have added ${action.payload} to the cart`);
    },
    decrement(state) {
      state.value--;
    },
    // You can add more actions here
  },
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
