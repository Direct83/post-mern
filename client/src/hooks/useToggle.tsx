import React, { useState } from 'react'

function useToggle(initialState: boolean): [boolean, CallableFunction] {
  const [value, setValue] = useState(initialState)
  const toggle = () => {
    setValue(!value)
  }
  return [value, toggle]
}
export {
  useToggle
};
