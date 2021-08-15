export type Meeting = {
  id?: number

  name: string
}

export type Fruit = {
  id?: number

  name: string
}

export type User = {
  id?: number

  username: string

  passwordHash: string
}

export type MeetingError = any

export type FruitError = any

export type UserError = any

export type LoginValues = {
  username: string
  password: string
}

export type RegisterValues = {
  username: string
  email: string
  password: string
  passwordConfirm: string
}
