import React, { createContext, useContext, useState, useReducer } from 'react'
import { data, slides } from './fake'
type MainContext = {
  state: State
  dispatch: React.Dispatch<StateAction>
}
type Cards = {
  img: string
  count: number
  title: string
  date: string
}
type Slides = {
  img: string
  altr: string
}
type State = {
  option: boolean
  cards: Cards[]
  profile: boolean
  slides: Slides[]
}

type StateAction =
  | { type: 'setOption'; payload: boolean }
  | { type: 'setProfile'; payload: boolean }

const initialState: State = {
  option: false,
  cards: data,
  profile: false,
  slides: slides,
}
const MainContext = createContext<MainContext>({
  state: initialState,
  dispatch: () => null,
})

export const MainProvider = ({
  children,
}: {
  children: React.ReactElement
}) => {
  const [state, dispatch] = useReducer(MainReducer, initialState)
  return (
    <MainContext.Provider value={{ state, dispatch }}>
      {children}
    </MainContext.Provider>
  )
}

export const useMain = () => {
  return useContext(MainContext)
}

const MainReducer = (state: State, action: StateAction): State => {
  switch (action.type) {
    case 'setOption':
      return { ...state, option: action.payload }
    case 'setProfile':
      return { ...state, profile: action.payload }
    default:
      throw new Error('Unknown action')
  }
}
