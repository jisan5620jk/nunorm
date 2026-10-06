/**
 * Applies a function to the value at the given index of an array, returning a new copy of the array with the element at the given index replaced with the result of the function application.
 * @param {number} n - The index of the element to adjust.
 *
 */

export const adjust = n => f => xs => mapi(x => i => i == n ? f(x) : x)(xs)

/**
 * Applies function fn to the argument list args. This is useful for creating a fixed-arity function from a variadic function. fn should be a bound function if context is significant
 * @param {Function} fn - The function to apply.
 * @returns {Function} A function that takes arguments and applies fn to them.
 */
export const apply =
  fn =>
  (...args) =>
    fn(...args)

/**
 * Given a spec object recursively mapping properties to functions, creates a function producing an object of the same structure, by mapping each property to the result of calling its associated function with the supplied arguments.
 * @param {Object} spec - The spec object.
 * @returns {Function} A function that takes arguments and returns an object based on the spec.
 */
export const applySpec =
  spec =>
  (...args) =>
    Object.keys(spec).reduce((acc, key) => {
      acc[key] = spec[key](...args)
      return acc
    }, {})

/**
 * Given a spec object recursively mapping properties to functions, and a key value, applies the function associated with the key to the value.
 * @param {Object} spec - The spec object.
 */
export const applySpecWithKey = spec => key => value => spec[key](value)

/**
 * Enables a HTML button
 * @param {number} button - The index of the element to adjust.
 * @returns {void} - side effect only
 */
export const enable = button => {
  button.disabled = false
  return null
}

/**
 * disabled a HTML button
 * @param {HTMLButtonElement} button - The button to disable.
 * @returns {void} - side effect only
 */
export const disable = button => {
  button.disabled = true
  return null
}

export const selectiveApply =
  fn =>
  (...args) =>
  indices =>
    fn(...indices.map(i => args[i]))

/**
 * Debounces a function, ensuring that it only runs once after a specified delay
 * since the last time it was invoked.
 * @param {Function} func - The function to debounce.
 * @param {number} delay - The time to wait before running the function after the last call.
 * @returns {Function} A debounced version of the function.
 */
function debounce(func, delay) {
  let timerId
  return function (...args) {
    if (timerId) {
      clearTimeout(timerId)
    }
    timerId = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

/**
 * Returns true if all elements of the list match the predicate, false if there are any that don't.
 * Dispatches to the all method of the second argument, if present.
 * @param {Function} fn - The predicate function to test each element.
 * @returns {Function} A function that takes an array and returns a boolean.
 */
export const all = fn => xs => xs.every(fn)

/**
 * Returns a new function much like the supplied one, except that the first two arguments' order is reversed.
 * @param {Function} f - The function to flip.
 * @returns {Function} A new function that takes the arguments in reverse order.
 */
export const flip = f => x => y => f(y)(x)

export const reverseArr = arr => [...arr].reverse()

/**
 * Returns whether or not an object has an own property with the specified name.
 * @param {string} prop - The property name to check for.
 * @returns {Function} A function that takes an object and returns a boolean.
 */
export const has = prop => obj => obj.hasOwnProperty(prop)

/**
 * Returns true if its arguments are identical, false otherwise. Values are identical if they reference the same memory. NaN is identical to NaN; 0 and -0 are not identical. This is merely a curried version of ES6 Object.is.
 * @param {*} x - The first value to compare.
 * @returns {Function} A function that takes a second value and returns a boolean.
 */
export const identical = x => y => Object.is(x, y)

/**
 * Function to querySelect multiple elements with standard data-component attribute
 * @param {string} string - The component identifier.
 * @returns {Element[]} An array of DOM elements matching the specified component.
 */
export const components = string =>
  Array.from(document.querySelectorAll(`[data-component-${string}]`))

/**
 * Returns the child components of the passed element
 * @param {String} childComponentId - The string to query the parent component using the component function.
 * @returns {Element[]} An array of DOM elements matching the specified component.
 */
export const childComponents = childComponentId => el =>
  Array.from(el.querySelectorAll(`[data-component-${childComponentId}]`))

/**
 * Returns the first child component of the passed element that matches the childComponentId
 * @param {String} childComponentId - The string to query the parent component using the component function.
 * @returns {Element} A DOM element matching the specified component.
 */
export const childComponent = childComponentId => el =>
  el.querySelector(`[data-component-${childComponentId}]`)

/**
 * Takes in a single element, queries a child of that component using the component function, performs a callback function on that child, and returns the parent element that was passed.
 * @param {String} childComponentId - The string to query the parent component using the component function.
 * @param {Function} mutationFn - The callback function to perform on the child component.
 * @returns {Function} A function that takes a callback function and a string, preforms the mutation and returns the parent element that was originally passed as a param.
 */
export const mutateChildComponent = (childComponentId, mutationFn) => el => {
  const childComponent = component(childComponentId)
  if (childComponent) {
    mutationFn(childComponent)
  }
  return el
}

/**
 * Function to querySelect a single element with standard data-component attribute
 * @param {string} string - The component identifier.
 * @returns {Element} A DOM element matching the specified component.
 */
export const component = string =>
  document.querySelector(`[data-component-${string}]`)

/**
 * Creates a listener for a specific event type on a given element.
 * @param {string} eventType - The type of event to listen for.
 * @returns {Function} A curried function that takes a callback, an element, and optional variables.
 */

export const listenToElement = eventType => callback => (el, variables) => {
  if (el === undefined || el === null) {
    return
  }
  el.addEventListener(eventType, event => {
    callback(el, event, variables)
  })
  return el
}

/**
 * Attaches a debounced event listener to an element.
 * @param {string} eventType - The type of event to listen for.
 * @param {number} delay - The debounce delay in milliseconds.
 * @returns {Function} A function that takes an element and optional variables and attaches the debounced listener.
 */
export const debouncedListenToElement =
  (eventType, delay) => callback => (el, variables) => {
    if (el === undefined || el === null) {
      return
    }

    const debouncedCallback = debounce((el, event, variables) => {
      callback(el, event, variables)
    }, delay)

    el.addEventListener(eventType, event => {
      debouncedCallback(el, event, variables)
    })

    return el
  }

/**
 * Creates an onClick event listener.
 */
export const onClick = listenToElement('click')

/**
 * Creates an onSubmit event listener.
 */
export const onSubmit = listenToElement('submit')

/**
 * Applies an array of functions to an array of values.
 * @param {...Function} functions - Functions to apply.
 * @returns {Function} A function that takes values and applies all functions to these values.
 */
export const mapFunctions =
  (...functions) =>
  (...value) =>
    functions.forEach(fn => fn(...value))

/**
 * A functional map helper
 */
export const map = f => xs => xs.map(f)

/**
 * Maps a function over an array, providing both element and index to the function.
 * @param {Function} f - A function that accepts an element and its index.
 * @returns {Function} A function that returns an array.
 */
const mapi = f => xs => xs.map((x, i) => f(x)(i))

/**
 * Delegates event listening to a selector within a root element.
 * @param {string} eventType - The type of event.
 * @param {Element} [root=document] - The root element to listen within.
 * @returns {Function} A curried function that takes a selector and a callback.
 */
export const delegateListen =
  (eventType, root = document) =>
  selector =>
  callback => {
    const eventListener = event => {
      const target = event.target.closest(selector)
      if (target) {
        callback(target, event)
      }
    }

    root.addEventListener(eventType, eventListener)

    return () => {
      root.removeEventListener(eventType, eventListener)
    }
  }

/**
 * Delegates event listening to a selector within a root element.
 * @param {string} eventType - The type of event.
 */

export const listen = eventType => callback => (el, variables) => {
  document.addEventListener(eventType, event => {
    callback(el, event, variables)
  })
  return el
}

/**
 * Applies a list of functions to a list of arguments.
 * @param {...Function} fns - Functions to apply.
 * @returns {Function} A function that applies each input function to the arguments.
 */
export const juxt =
  (...fns) =>
  (...args) =>
    [...fns].map(fn => [...args].map(fn))

/**
 * Creates a pipeline of functions to apply to a value.
 * @param {...Function} fs - Functions to pipe.
 * @returns {Function} A function that applies a series of functions to an initial value.
 */
export const pipe =
  (...fs) =>
  x =>
    fs.reduce((acc, f) => f(acc), x)

/**
 * Converts a function to a curried function.
 * @param {...Function} f - Functions to pipe.
 * @returns {Function} A function that applies a series of functions to an initial value in reverse order.
 */
export const curry = f => {
  const aux = (n, xs) => (n === 0 ? f(...xs) : x => aux(n - 1, [...xs, x]))
  return aux(f.length, [])
}

export const unCurry =
  f =>
  (...args) => {
    return args.reduce((acc, arg) => acc(arg), f)
  }

/**
 * Executes a function for its side effects and returns the original value.
 * @param {Function} f - The side-effect function to execute.
 * @returns {Function} The original value.
 */
export const tap = f => x => {
  f(x)
  return x
}

/**
 * Creates a thunk function.
 * @param {Function} fn - The function to delay execution of.
 * @returns {Function} A thunk function.
 */
export const thunk =
  fn =>
  (...args) =>
  () =>
    fn(...args)

/**
 * Composes a series of functions into a single function.
 * @param {...Function} fns - The functions to compose.
 * @returns {Function} The composed function.
 */
export const compose = (...fns) =>
  fns.reduce(
    (f, g) =>
      (...args) =>
        f(g(...args))
  )

/**
 * Finds the index of a query-selected child within its parent.
 * @param {Element} el - The parent element.
 * @param {string} string - The selector string.
 * @returns {number} The index of the found element, or -1 if not found.
 */
export const indexOfQuery = (el, string) =>
  Array.prototype.indexOf.call(el.children, el.querySelector(string))

/**
 * Finds the index of an element within a NodeList or similar.
 * @param {NodeList} el - The list to search within.
 * @param {string} string - The value to find.
 * @returns {number} The index of the element, or -1 if not found.
 */
export const findIndex = (el, string) =>
  Array.prototype.findIndex.call(el, string)

/**
 * Curried function to add a class to an element.
 * @param {String} className - The element to add a class to.
 * @returns {function(HTMLElement): void} - A function that takes an HTMLElement and adds the specified class to it.
 */
export const curriedAddClass = className => el => el.classList.add(className)

export const addHiddenClass = curriedAddClass('hidden')

export const addLoadingClass = curriedAddClass('loading')

/**
 * Curried function to remove a class from an element.
 * @param {String} className - The element to remove a class from.
 * @returns {function(HTMLElement): void} - A function that takes an HTMLElement and removes the specified class from it.
 */
export const curriedRemoveClass = className => el =>
  el.classList.remove(className)

export const removeHiddenClass = curriedRemoveClass('hidden')

/** Returns a new list by pulling every item out of it (and all its sub-arrays) and putting them in a new array, depth-first.
 * @param {Array} arr - The array to flatten.
 * @returns {Array} A new array with all elements flattened.
 */
export const flatten = arr =>
  arr.reduce(
    (acc, val) => acc.concat(Array.isArray(val) ? flatten(val) : val),
    []
  )

/**
 *
 * @param {*} el
 * @param {*} event
 */
export const bubbleEventToParent = (el, event) => {
  el.parentElement.dispatchEvent(new CustomEvent(event.type, event))
}
/**
 *
 * @param {String} event
 * @param {String} selector
 * @returns {Function} A function that takes an element and dispatches an event to the closest parent with a matching selector.
 */
export const bubleEventToCLosest = (event, selector) => el => {
  el.closest(selector).dispatchEvent(
    new CustomEvent(event, { bubbles: true, detail: { triggerElement: el } })
  )
}

/**
 * Sets the value of an input to the specified value.
 * @param {HTMLInputElement} el - The input element.
 * @param {string} string - The value to set the input to.
 */
export const setValue = (el, string) => {
  el.value = string
}

/**
 * Sets the src of an image to the specified string.
 * @param {HTMLImageElement} el - The image element.
 * @param {string} string - The src to set the image to.
 */
export const setSrc = (el, string) => {
  el.src = string
}

/**
 * Sets the inner text of an element to the specified string.
 * @param {HTMLElement} el - The element to set the inner text of.
 * @param {string} string - The text to set the element to.
 * @returns {void} - side effect only
 */
export const setText = (el, string) => {
  el.innerText = string
}

export const curriedSetInnerText = text => el => {
  el.innerText = text
  return el
}

/**
 * Sets the href of an anchor to the specified string.
 * @param {HTMLAnchorElement} el - The anchor element.
 * @param {string} string - The href to set the anchor to.
 * @returns {void} - side effect only
 */
export const setHref = (el, string) => {
  el.href = string
}

/**
 * Focuses on the specified element.
 * @param {HTMLElement} el - The element to focus on.
 * @returns {void} - side effect only
 */
export const focus = el => el.focus()

/**
 * Sets the tabindex of an element to -1.
 * @param {HTMLElement} el - The element to set the tabindex of.
 * @returns {void} - side effect only
 */
export const setTabIndexMinusOne = el => {
  el.setAttribute('tabindex', '-1')
  el.blur()
}

/**
 *
 * @param {*} el
 * @returns {void} - side effect only
 */
export const setTabindex = el => {
  el.setAttribute('tabindex', 0)
  el.focus()
}

/**
 * gets the key of an event object
 * @param {Event} e - The event object.
 * @returns {*} - The key of the event object.
 */
export const getKeyEvent = e => e.key

/**
 * gets the query target of the data-target attribute of the param
 * @param {HTMLElement} el - the element to get the dataset from
 * @returns {HTMLElement} - The target of the data-target attribute after querying the DOM.
 */
export const getIdQueryOFComponent = el => {
  return document.querySelector(`#${el.dataset.target}`)
}

export const getComponentOfTarget = el => {
  return component(el.dataset.target)
}

export const getParentComponent = parentComponentId => el => {
  return el.closest(`[data-component-${parentComponentId}]`)
}

/**
 * Performs a callback on the target element specified by the data-target attribute of the provided element,
 * then returns the original element to continue the data stream.
 * @param {Function} callback - A callback function to be executed on the target element.
 * @returns {Function} A function that takes an HTMLElement, performs the callback on the target, and returns the original element.
 */
export const withTargetDo = callback => el => {
  const target = document.querySelector(`#${el.dataset.target}`)
  if (target) {
    callback(target)
  }
  return el // Return the original element to continue the chain.
}

/**
 * Runs a query Selector all
 * @param {String} selector - The selector to query.
 * @param {Element} el - The element to query within.
 * @returns {Element[]} - An array of elements matching the selector.
 */
export const queryAll = (selector, el = document.body) =>
  Array.from(el.querySelectorAll(selector))

export const addClass = (el, className) => el.classList.add(className)

export const removeClass = (el, className) => el.classList.remove(className)

export const toggleDisplay = el =>
  (el.style.display =
    window.getComputedStyle(el).display === 'block' ? 'none' : 'block')

/**
 * Toggles the aria-hidden attribute of the given element. If aria-hidden is "true", it sets it to "false",
 * and vice versa. If the element does not have an aria-hidden attribute, it defaults to setting it to "true".
 * @param {HTMLElement} el - The element whose aria-hidden attribute will be toggled.
 */
export const toggleAriaHidden = el => {
  const currentState = el.getAttribute('aria-hidden')
  const newState = currentState === 'true' ? 'false' : 'true'
  el.setAttribute('aria-hidden', newState)
}

export const setAriaInvalidTrue = el => {
  el.setAttribute('aria-invalid', 'true')
  return el
}

export const setAriaInvalidFalse = el => {
  el.setAttribute('aria-invalid', 'false')
  return el
}

export const setDataErrorActiveToFalse = el => {
  el.dataset.errorActive = 'false'
  return el
}

export const setDataErrorActiveToTrue = el => {
  el.dataset.errorActive = 'true'
  return el
}

/**
 * Check Element for data attribute of state, then convert content to JSON
 * @param {HTMLElement} el - The element to check for data-state attribute.
 * @returns {Object} - The parsed JSON object.
 */
export const getState = el => JSON.parse(el.dataset.state)

export const parseJSON = string => JSON.parse(string)

/**
 * Converts an object to a JSON string.
 * @param {Object} value - The object to convert.
 * @returns {string} JSON string representation of the object.
 */
export const convertToString = value => JSON.stringify(value)

/**
 * Removes an object from an array of objects by converting objects to JSON strings for comparison.
 * @param {Object[]} arr - The array of objects.
 * @returns {Object[]} A new array with the object removed if it was found.
 */
export const removeByJSONString = obj => arr => {
  const objString = JSON.stringify(obj)
  return arr.filter(item => JSON.stringify(item) !== objString)
}

/**
 * Set state of an element by stringifying the object and setting it to the data-state attribute. This version is curried
 * and takes state first, then the element, fitting better in functional pipelines.
 * @param {Object} state - The state object to set.
 * @returns {Function} A function that takes an HTMLElement and sets its data-state attribute.
 */
export const curriedSetState = state => el => {
  el.dataset.state = JSON.stringify(state)
  return el
}

/**
 * Removes the first element from an array.
 * @param {Array} xs - The array to remove the first element from.
 * @returns {Array} A new array without the first element.
 */
const dropFirst = xs => xs.slice(1)

/**
 * Removes the last element from an array.
 * @param {Array} xs - The array to remove the last element from.
 * @returns {Array} A new array without the last element.
 */
const dropLast = xs => xs.slice(0, xs.length - 1)

/**
 * Identity function that returns the input as is.
 * @param {*} x - Any input value.
 * @returns {*} The same input value.
 */
export const id = x => x

export const doNothing = x => () => {
  return x
}

/**
 * Kestrel combinator (constant function) - returns a function that ignores its second argument and always returns the first argument.
 * @param {*} x - The value to always return.
 * @returns {Function} A function that takes any input but always returns x.
 */
const k = x => y => x

/**
 * Merges two objects into one. Properties from the second object will overwrite those in the first if they exist.
 * @param {Object} o1 - The first object.
 * @returns {Function} A new object with properties merged from o1 and o2.
 */
const merge = o1 => o2 => Object.assign({}, o1, o2)

export const createObject = key => value => ({ [key]: value })

/**
 * Checks if two objects have the same keys and values.
 * @param {Object} obj1 First object to compare.
 * @param {Object} obj2 Second object to compare.
 * @returns {boolean} True if objects are structurally identical.
 */
const isEquivalent = (obj1, obj2) => {
  const obj1Keys = Object.keys(obj1)
  const obj2Keys = Object.keys(obj2)
  if (obj1Keys.length !== obj2Keys.length) return false

  return obj1Keys.every(
    key => obj2.hasOwnProperty(key) && obj1[key] === obj2[key]
  )
}

/**
 * Appends an element to an array if it does not already include an equivalent element.
 * @param {any} x Element to append.
 * @returns {Function} A function that takes an array and returns a new array with the element appended if not already included.
 */
export const arrayAppend = x => xs => xs.includes(x) ? xs : [...xs, x]

/**
 * Computes the modulus in a way that handles negative numbers as expected.
 * @param {number} x - The modulus.
 * @returns {Function} The result of the modulus operation.
 */
const mod = x => y => ((y % x) + x) % x

/**
 * Creates an object with a single key-value pair.
 * @param {string} k - The key of the property.
 * @returns {Object} An object with a single key-value pair.
 */
const objOf = k => v => ({ [k]: v })

/**
 * Retrieves the property of an object by its key.
 * @param {string} k - The key of the property to retrieve.
 * @returns {*} The value of the property.
 */
export const prop = k => o => o[k]

/**
 *  Returns true if the specified object property is equal to the given value false otherwise
 * @param {*} k -
 * @returns
 */
export const propEq = k => v => o => o[k] === v

/**
 * Creates an array of numbers within a specified range.
 * @param {number} n - The start of the range.
 * @returns {Function} An array representing the range from n to m.
 */
const range = n => m => Array.from({ length: m - n }, (_, i) => n + i)

/**
 * Creates an array of repeated values.
 * @param {*} c - The value to repeat.
 * @returns {Function} A function that returns an array filled with the value c repeated n times.
 */
const rep = c => n => map(k(c))(range(0)(n))

/**
 * Transforms an object based on a specification object whose values are functions.
 * @param {Object} o - The specification object, with keys corresponding to output keys and values as functions that return the values.
 * @returns {Function} That then returns a new object transformed according to the spec.
 */
export const spec = o => x =>
  Object.keys(o)
    .map(k => objOf(k)(o[k](x)))
    .reduce((acc, o) => Object.assign(acc, o), {})

/**
 * sets aria-pressed attribute to true
 * @param {HTMLElement} el - The element to set aria-pressed to true.
 * @returns {void} - side effect only
 */

export const setAriaPressedTrue = el => el.setAttribute('aria-pressed', 'true')

/**
 * sets aria-pressed attribute to false
 * @param {HTMLElement} el - The element to set aria-pressed to false.
 * @returns {void} - side effect only
 */
export const setAriaPressedFalse = el =>
  el.setAttribute('aria-pressed', 'false')

/**
 * Executes one of two functions based on the result of a predicate function.
 * @param {Function} condition - A predicate function that returns a boolean.
 * @param {Function} ifTrue - Function to execute if the predicate returns true.
 * @param {Function} ifFalse - Function to execute if the predicate returns false.
 * @returns {Function} A function that takes an element and applies the appropriate function based on the predicate result.
 */
export const ifElse = (condition, ifTrue, ifFalse) => x => {
  return condition(x) ? ifTrue(x) : ifFalse(x)
}

/**
 * Applies conditional logic to the second item of a tuple and applies the resulting function to the first item of the tuple,
 * returning the tuple with the updated first element.
 * @param {Function} condition - A predicate function that takes the second element of a tuple and returns a boolean.
 * @param {Function} ifTrue - Function to execute on the first element of the tuple if the condition is true.
 * @param {Function} ifFalse - Function to execute on the first element of the tuple if the condition is false.
 * @returns {Function} A function that takes a tuple [x, y] and returns the tuple [updated x, y].
 */
export const ifElseForTuple =
  (condition, ifTrue, ifFalse, index) =>
  ([x, y]) => {
    if (index === 0) {
      return [condition([x, y]) ? ifTrue([x, y]) : ifFalse([x, y]), y]
    } else if (index === 1) {
      return [y, condition([x, y]) ? ifTrue([x, y]) : ifFalse([x, y])]
    } else {
      throw new Error('Invalid index for tuple transformation: ' + index)
    }
  }

/**
 * Hides an element specified by a selector.
 * @param {string} selector - The selector of the element to hide.
 */
export const hideQueryElement = selector => {
  document.querySelectorAll(selector).forEach(el => {
    el.style.display = 'none'
  })
}

/**
 * Shows an element specified by a selector.
 * @param {string} selector - The selector of the element to show.
 */
export const showQueryElement = selector => {
  document.querySelectorAll(selector).forEach(el => {
    el.style.display = ''
  })
}

/**
 * Removes the 'active' class from elements specified by a selector.
 * @param {string} selector - The selector of the elements to remove the class from.
 */
export const removeQueryActiveClass = selector => {
  document.querySelectorAll(selector).forEach(el => {
    el.classList.remove('active')
  })
}

/**
 * Sets the text content of an element specified by a selector.
 * @param {string} selector - The selector of the element to set the text for.
 * @param {string} text - The text to set.
 */
export const setQueryTextContent = (selector, text) => {
  document.querySelectorAll(selector).forEach(el => {
    el.textContent = text
  })
}

/**
 * Sets the display style of elements matched by the selector.
 * @param {string} selector - Selector for elements to modify.
 * @param {string} displayStyle - CSS display style to apply.
 */
export const setQueryDisplayStyle = (selector, displayStyle) => {
  document.querySelectorAll(selector).forEach(element => {
    element.style.display = displayStyle
  })
}

export const notEmpty = s => s !== '' && s !== undefined

export const isPopulatedArray = arr => arr.length > 0

export const isNotPopulatedArray = arr => arr.length === 0

export const isPopulatedObject = obj => Object.keys(obj).length > 0

/**
 * Maps each element of an array to a tuple containing the element itself and a value derived by applying a provided function.
 * @param {Function} func A function that takes an element as input and returns a derived value.
 * @returns {Function} Function that takes an array of elements and returns an array of tuples [element, derivedValue].
 */
export const mapToPairWithFunctionAtSecond = func => components =>
  components.map(component => [component, func(component)])

/**
 * Transforms one element of a tuple based on a specified index.
 * @param {Function} fn - The function to apply to the selected element of the tuple.
 * @param {number} index - The index of the element to transform (0 for first, 1 for second).
 * @returns {Function} - A function that takes a tuple and returns a new tuple with the transformed element.
 */
export const transformTuple = (fn, index) => tuple => {
  if (index === 0) {
    return [fn(tuple[0]), tuple[1]]
  } else if (index === 1) {
    return [tuple[0], fn(tuple[1])]
  } else {
    throw new Error('Invalid index for tuple transformation: ' + index)
  }
}

export const transformTupleWithTuple = (fn, index) => tuple => {
  if (index === 0) {
    return [fn(tuple), tuple[1]]
  } else if (index === 1) {
    return [tuple[0], fn(tuple)]
  } else {
    throw new Error('Invalid index for tuple transformation: ' + index)
  }
}

export const pairWithFunction = func => component =>
  [component, func(component)]

/**
 * Filters an array of tuples based on a predicate applied to the second element of each tuple.
 * @param {Function} predicate Predicate function to test each element's value.
 * @returns {Function} Function that takes an array of tuples and filters based on the value
 */
export const filterByValue = predicate => tuples =>
  tuples.filter(([_, value]) => predicate(value))

export const filterByStringExactMatch = s => s2 => s === s2

/**
 * Creates a function to filter arrays based on a provided predicate.
 * @param {Function} predicate - A predicate function to use for filtering.
 * @returns {Function} A function that takes an array and returns a filtered array.
 */
export const filter = predicate => arr => arr.filter(predicate)

/**
 * Finds the first element in an array that matches a predicate.
 * @param {Function} predicate - A predicate function to test each element.
 * @returns {Function} A function that takes an array and returns the first element that matches the predicate.
 */
export const find = predicate => arr => arr.find(predicate)

export const some = predicate => arr => arr.some(predicate)

export const returnFirst = arr => arr[0]

export const returnSecond = arr => arr[1]

/**
 * Returns the last element of an array.
 * Uses Array.findLast() to find the last element based on a truthy condition, which will always be true for non-empty arrays.
 * @param {Array} arr - The array from which to retrieve the last element.
 * @returns {Function} The last element of the array, or undefined if the array is empty.
 */
export const returnLast = arr => arr.findLast(() => true)

/**
 * Sets a specified dataset property to a given value for a DOM element.
 * @param {string} dataset - The dataset property to set.
 * @returns {Function} A function that takes a DOM element and sets the dataset property.
 */
export const setData = dataset => value => el => {
  el.dataset[dataset] = value
  return el
}

/**
 * Checks if all elements of one array are present in another array.
 * @param {Array} arr1 - The first array.
 * @returns {boolean} - True if all elements of arr2 are present in arr1, false otherwise.
 */
export const isSubsetOf = arr1 => arr2 => {
  const set1 = new Set(arr1)
  const set2 = new Set(arr2)

  const isSubset2 = [...set1].every(x => set2.has(x))

  return isSubset2
}
export const sortErrorStateObjects = valueOrder => array => {
  // Create maps for key and value ranks for quick lookup
  const keyRank = new Map(
    valueOrder.keySortOrder.map((key, index) => [key, index])
  )
  const valueRank = new Map(
    valueOrder.valueSortOrder.map((value, index) => [value, index])
  )

  return array.sort((a, b) => {
    const aKey = Object.keys(a)[0] // Assume single key per object
    const bKey = Object.keys(b)[0]
    const aKeyIndex = keyRank.get(aKey)
    const bKeyIndex = keyRank.get(bKey)

    // Compare by key ranking first
    if (aKeyIndex !== bKeyIndex) {
      return aKeyIndex - bKeyIndex
    }

    // If keys are the same, compare by value ranking
    const aValueIndex = valueRank.get(a[aKey])
    const bValueIndex = valueRank.get(b[bKey])
    return aValueIndex - bValueIndex
  })
}

export const log = x => {
  console.log(x)
}

/** A */
export const asyncUpdateCartProperty = async (property, value) => {
  fetch('/cart/update.js', {
    body: JSON.stringify({
      attributes: { [property]: value },
    }),
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'xmlhttprequest',
    },
    method: 'POST',
  })
}

/** B */

/** C */
export const copyElementInnerTextToClipboard = el => {
  const text = el.innerText
  navigator.clipboard.writeText(text)
}

export const capitalize = s => s.charAt(0).toUpperCase() + s.slice(1)

/** D */
/**
 * dispatches an event on a given element
 * @param {string} event - The event to dispatch.
 * @returns {Function} A function that takes an element and dispatches the event.
 */
export const dispatch = event => el => {
  el.dispatchEvent(new Event(event))
  return el
}

export const duplicate = x => [x, x]

/** E */

/** F */
export const findDomElement = arr => arr.find(isDOMElement)

export const findString = arr => arr.find(s => typeof s === 'string')

/** G */

export const getInputValue = el => el?.value || ''

export const getInputType = el => (el && el.type) || ''

export const getInputName = el => (el && el.name) || ''

export const getLength = arr => arr.length

export const getData = dataset => el => {
  return el.dataset[dataset]
}

/**
 * Gets the count of array at prop of obj
 * @param {Object} obj
 */
export const getArrayLengthOfObject = obj => prop => obj[prop].length

/** H */

/** I */
/**
 * Checks if the provided item is a DOM element.
 * @param {any} item - The item to check.
 * @return {boolean} - Returns true if the item is a DOM element, otherwise false.
 */
const isDOMElement = item => {
  return item instanceof Element
}

/** J */

/** K */

/** L */

/** M */

/** N */
export const notZero = x => x !== 0

/** O */

/** P */

/** Q */

/** R */

/** S */
// Frankenstein functions, extracted from activecampaign auto generated form code
/**
 * Serializes form data into a URL-encoded string.
 * @param {HTMLFormElement} form - The form to be serialized.
 * @returns {string} - The serialized form data.
 */
export function serializeForm(form) {
  if (!form || form.nodeName !== 'FORM') return ''
  let q = []
  for (let element of form.elements) {
    if (element.name === '') continue
    let type = element.type,
      name = encodeURIComponent(element.name),
      value = encodeURIComponent(element.value)
    switch (element.nodeName) {
      case 'INPUT':
        switch (type) {
          case 'text':
          case 'number':
          case 'date':
          case 'time':
          case 'hidden':
          case 'password':
            q.push(`${name}=${value}`)
            break
          case 'checkbox':
          case 'radio':
            if (element.checked) q.push(`${name}=${value}`)
            break
        }
        break
      case 'TEXTAREA':
        q.push(`${name}=${value}`)
        break
      case 'SELECT':
        if (type === 'select-one') {
          q.push(`${name}=${value}`)
        } else if (type === 'select-multiple') {
          for (let option of element.options) {
            if (option.selected)
              q.push(`${name}=${encodeURIComponent(option.value)}`)
          }
        }
        break
    }
  }
  return q.join('&')
}

/** T */

/** U */

/** V */

/** W */

/** X */

/** Y */

/** Z */
