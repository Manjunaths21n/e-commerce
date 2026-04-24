import { types } from 'mobx-state-tree'

export const CheckoutStore = types
  .model('CheckoutStore', {
    step: types.optional(types.number, 1),
    isGuest: types.optional(types.boolean, true),
    shippingAddress: types.optional(types.frozen(), {}),
    paymentMethod: types.maybeNull(types.string),
  })
  .actions((self) => ({
    setStep(step: number) {
      self.step = step
    },
    setIsGuest(isGuest: boolean) {
      self.isGuest = isGuest
    },
    setShippingAddress(address: unknown) {
      self.shippingAddress = address
    },
    setPaymentMethod(method: string) {
      self.paymentMethod = method
    },
  }))
