/**
 * randomInt:
 * Returns a random positive integer from min to max
 * @Parameters: min - the smallest possible number, max - largest possible number
 * @Return: Int
 * @Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 */
const randomInt = function (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  // The maximum is inclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * The settings object keeps track of all the exchange rates
 * for the game.
 */
const settings = {
  fireWood: 1,
  oreCost: 3,
  woodCost: 1,
  swordOre: 2,
  swordWood: 1,
  axeOre: 1,
  axeWood: 2,
  swordPriceMin: 5,
  swordPriceMax: 10,
  axePriceMin: 4,
  axePriceMax: 8
}

/**
 * The game object stores the current game status
 */
const game = {
  gold: 10,
  ore: 0,
  wood: 0,
  swords: 0,
  axes: 0,
  fire: false
}

/**
 * fire
 * To start a fire:
 *    The fire must be out
 *    There must be at least 1 piece of wood
 *
 * To stop a fire:
 *    The fire must be going
 */
function fire () {
  if (game.fire) {
    game.fire = false
    return 'You have put out the fire.'
  } else if (game.wood >= settings.fireWood) {
    game.wood -= settings.fireWood
    game.fire = true
    return 'You have started the fire.'
  } else {
    return 'You do not have enough wood.'
  }
}
/**
 * buy
 * To buy wood or ore
 *    The function must accept a string argument
 *    The argument is the item to buy
 *    The fire most not be burning
 *    The player must have enough gold
 *    The player will on receive 1 item
 */
function buy (item) {
  if (game.fire === false) {
    if (item === 'ore' && game.gold >= settings.oreCost) {
      game.ore++
      game.gold -= settings.oreCost
      return 'You bought 1 piece of ore.'
    } else if (item === 'wood' && game.gold >= settings.woodCost) {
      game.wood++
      game.gold -= settings.woodCost
      return 'You bought 1 piece of wood.'
    } else {
      return `You cannot buy a(n) ${item}.`
    }
  } else {
    return 'You must put out the fire.'
  }
}

/**
 * make
 * To make a sword or axe
 *    The function must accept a string argument
 *    The argument is the item to make
 *    The fire must be burning
 *    The player must have enough wood and ore
 *    The player will make 1 item
 */
function make (item) {
  if (game.fire) {
    if (item === 'sword' && game.ore >= settings.swordOre && game.wood >= settings.swordWood) {
      game.wood -= settings.swordWood
      game.ore -= settings.swordOre
      game.swords++
      return 'You have made 1 sword.'
    } else if (item === 'axe' && game.ore >= settings.axeOre && game.wood >= settings.axeWood) {
      game.wood -= settings.axeWood
      game.ore -= settings.axeOre
      game.axes++
      return 'You have made 1 axe.'
    } else {
      return `You cannot make a(n) ${item}.`
    }
  } else {
    return 'You must start the fire.'
  }
}

/**
 * sell
 * To sell a sword or axe
 *   The function must accept a string argument
 *   The argument is the item to sell
 *   The function must check if it is a valid item to sell
 *   The fire must not be burning
 *   The player must have at least 1 item to sell
 *   The player will receive a random value based on the
 *   price range
 */
function sell (item) {
  if (!game.fire) {
    if (item === 'sword' && game.swords > 0) {
      game.swords--
      const price = randomInt(settings.swordPriceMin, settings.swordPriceMax)
      game.gold += price
      return `You sold 1 ${item} for ${price} pieces of gold.`
    } else if (item === 'axe' && game.axes > 0) {
      game.axes--
      const price = randomInt(settings.axePriceMin, settings.axePriceMax)
      game.gold += price
      return `You sold 1 ${item} for ${price} pieces of gold.`
    } else {
      return `You do not have a(n) ${item}.`
    }
  } else {
    return 'You must put out the fire.'
  }
}
/**
 * inventory
 * Shows the players current inventory
 */
function inventory () {
  const response = []
  response.push('INVENTORY:\n')
  for (const item in game) {
    if (item === 'fire') {
      if (game[item]) {
        response.push('The fire is burning.')
      } else {
        response.push('The fire is not burning.')
      }
    } else {
      response.push(`${item}: ${game[item]}\n`)
    }
  }
  return response.join('')
}

/**
 * Help Command
 * Returns the instruction on how to play the game.
 */
function help () {
  return `INSTRUCTIONS:
  Blacksmith is a simple text base game. 
  
  As a blacksmith you convert ore and wood into swords and axes. You buy your resources using gold and sell your weapons for gold.
  
  COMMANDS:
  - buy(item)
  - make(item)
  - sell(item)
  - fire()
  - inventory()
  - help()`
}

// Log the help() function
console.log(help())
