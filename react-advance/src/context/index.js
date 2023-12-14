import { createContext } from "react";

export const MyContext =  createContext({
  name: 'zs',
  age: 18
})

MyContext.displayName = 'MyContext'

export const MyContext2 = createContext()


