/**
 * Creates a DOM manipulation thunk.
 * @param {Function} domOperation - A function that performs the DOM manipulation.
 * @returns {Function} A thunk that, when called, executes the DOM operation.
 */
function createDomThunk(domOperation) {
    return function() {
        domOperation();
    };
}

/**
 * Sets the text content of an element.
 * @param {HTMLElement} element - The target element.
 * @param {string} text - The text to set.
 * @returns {Function} A thunk for the text setting operation.
 */
function setTextThunk(element, text) {
    return createDomThunk(() => {
        element.textContent = text;
    });
}

/**
 * Adds a class to an element.
 * @param {HTMLElement} element - The target element.
 * @param {string} className - The class name to add.
 * @returns {Function} A thunk for the class adding operation.
 */
function addClassThunk(element, className) {
    return createDomThunk(() => {
        element.classList.add(className);
    });
}

/**
 * Attaches an event listener to an element.
 * @param {HTMLElement} element - The target element.
 * @param {string} eventType - The type of event to listen for.
 * @param {Function} handler - The function to execute when the event occurs.
 * @returns {Function} A thunk for the event listener attachment.
 */
function addEventListenerThunk(element, eventType, handler) {
    return createDomThunk(() => {
        element.addEventListener(eventType, handler);
    });
}