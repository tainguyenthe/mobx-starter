/**
 * @class Common
 */
export default (state) => {
  return new class Common {

    setTitle(newTitle) {
      state.common.title = newTitle
    }
  }
}
