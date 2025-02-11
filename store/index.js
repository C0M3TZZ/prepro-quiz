import { vuexfireMutations, firestoreAction } from 'vuexfire'

export const state = () => ({
  itemsState: [],
  user: null,
  quiz: [],
})
export const mutations = {
  ...vuexfireMutations,
  ON_AUTH_STATE_CHANGED_MUTATION: (state, { authUser, claims }) => {
    console.log('mutation', authUser)
    console.log('mutation', claims)
    // Do this:
    if (authUser) {
      console.log('logged in')
      const { uid, email, emailVerified } = authUser
      state.user = { uid, email, emailVerified }
    } else {
      console.log('logged out')
    }
  },
}

export const actions = {
  bindQuizDocument: firestoreAction(async function ({ bindFirestoreRef }) {
    const ref = this.$fire.firestore.collection('quiz')
    await bindFirestoreRef('quiz', ref, { wait: true })
  }),
  unbindQuizDocument: firestoreAction(function ({ unbindFirestoreRef }) {
    unbindFirestoreRef('quiz', false)
  }),
  onAuthStateChangedAction: (ctx, { authUser, claims }) => {
    if (!authUser) {
      console.log('logged out action')
      // claims = null
      // Perform logout operations
    } else {
      console.log('logged in action')
      // Do something with the authUser and the claims object...
    }
  },
}
export const getters = {
  getQuizById: (state) => (id) => {
    return state.quiz.find((quiz) => quiz.id === id)
  },
}
