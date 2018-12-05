
export default class ValidBus {
  static valids = new Map()

  /**
   * @desc add validtor to ValidBus.
   * @param name {string} valid name.
   * @param validO {object} valid object.
   */
  static addValid (name, validO) {
    this.valids.set(name, validO)
  }

  /**
   * @desc remove validtor on ValidBus.
   * @param name {string} validtor name.
   */
  static removeValid (name) {
    this.valids.delete(name)
  }

  /**
   * @desc get inner object valids.
   * @returns {Map}
   */
  static getAll () {
    return this.valids
  }

  /**
   * @desc valid all register validtor.
   * @returns {Promise<any>}
   */
  static valid () {
    let allValidtor = []

    for (let validtor of this.valids.values()) {
      allValidtor.push(validtor.validate())
    }

    return new Promise((resolve, reject) => {
      Promise.all(allValidtor).then(result => {
        resolve(result.every(r => r))
      }).catch(reject)
    })
  }
}
