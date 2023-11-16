import { useState } from 'react'

export default function useBook() {
  let [book, setBook] = useState('React学习')

  return {
    book,
    setBook
  }
}
