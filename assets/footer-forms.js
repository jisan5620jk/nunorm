const modulePath = `../assets/utils.js?v=${Date.now()}`

import(modulePath)
  .then(module => {
    const {
      log,
      tap,
      map,
      pipe,
      focus,
      filter,
      ifElse,
      enable,
      disable,
      setData,
      getData,
      flatten,
      notEmpty,
      dispatch,
      onSubmit,
      duplicate,
      doNothing,
      parseJSON,
      getLength,
      components,
      isSubsetOf,
      returnFirst,
      returnSecond,
      getInputName,
      getInputType,
      mapFunctions,
      getInputValue,
      findDomElement,
      childComponent,
      ifElseForTuple,
      transformTuple,
      addHiddenClass,
      childComponents,
      convertToString,
      applySpecWithKey,
      isPopulatedArray,
      isPopulatedObject,
      removeHiddenClass,
      getParentComponent,
      setAriaInvalidTrue,
      setAriaInvalidFalse,
      sortErrorStateObjects,
      transformTupleWithTuple,
      debouncedListenToElement,
      mapToPairWithFunctionAtSecond,
    } = module

    // Variables
    const PHONE_AND_EMAIL = ['phone', 'email']

    const SORT_ORDER = {
      keySortOrder: ['empty', 'malformed'],
      valueSortOrder: ['emailAndPhone', 'email', 'phone', 'consent'],
    }

    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const PHONE_REGEX =
      /^\+?([0-9]{1,3})?[-. ]?([0-9]{3})[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/

    const getEmailErrorOnEmpty = { empty: 'email' }
    const getPhoneErrorOnEmpty = { empty: 'phone' }
    const getConsentErrorOnEmpty = { empty: 'consent' }

    // Frankenstein functions, extracted from activecampaign auto generated form code
    /**
     * Serializes form data into a URL-encoded string.
     * @param {HTMLFormElement} form - The form to be serialized.
     * @returns {string} - The serialized form data.
     */
    function serializeForm(form) {
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

    /**
     * Posts serialized form data using Fetch API.
     * @param {string} serializedData - Serialized form data.
     * @returns {Promise<string>} - The response from the server.
     */
    async function postFormData(serializedData) {
      try {
        const response = await fetch(
          'https://nunorm.activehosted.com/proc.php?jsonp=true',
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: serializedData,
            method: 'POST',
          }
        )
        const responseData = await response.json()
        const action = responseData.action
        return action
      } catch (error) {
        console.error('Submission failed', error)
        return 'error'
      }
    }

    // EVENT LISTENER COMPOSITION
    /** @type {Function} */
    const onErrorMessageUpdate = debouncedListenToElement('errorUpdate', 300)

    // MODULE SPECIFIC UTILITIES'
    /** Dispatches an 'errorUpdate' event. */
    const dispatchErrorUpdate = dispatch('errorUpdate')

    /** Retrieves the parent form of the provided element. */
    const getParentForm = getParentComponent('active-campaign-form')

    /** Retrieves the first element in a nested array. */
    const getFirstSubNested = pipe(flatten, returnFirst)

    /** Retrieves the child component of the form message container. */
    const getFormMessageContainerChild = childComponent(
      'active-campaign-form-messages'
    )

    /** Retrieves the child component of the form submit button. */
    const getFormSubmitButtonChild = childComponent('active-campaign-form-submit')

    /** goes up then down to the submit button and disables */
    const deactivateSubmit = pipe(
      getFormSubmitButtonChild,
      disable
    )
    
    const activateSubmit = pipe(
      getFormSubmitButtonChild,
      enable
    )


    /**
     * Dispatches an 'errorUpdate' event to the parent form of the provided element.
     * @param {Array} x - the array of arrays, with the first element being the element to dispatch the event on.
     * @returns {void} - Side effect, dispatches the event.
     */
    const dispatchActiveCampaignFormEvent = x => {
      const firstElement = getFirstSubNested(x)
      const parentForm = getParentForm(firstElement)
      const formMessageContainerChild = getFormMessageContainerChild(parentForm)
      dispatchErrorUpdate(formMessageContainerChild)
    }

    const filterEmptyAtSecond = transformTuple(filter(notEmpty), 1)

    const parseJsonAtSecond = transformTuple(map(parseJSON), 1)

    /** Retrieves active input components for a given campaign. */
    const getInputComponents = childComponents('active-campaign-input')

    const getErrorMessageComponents = childComponents('error-message')

    const getInputsWithinParent = child => {
      const parent = child.closest('[data-component-active-campaign-form]')
      return getInputComponents(parent)
    }

    /** Maps input components to their types. */
    const mapToInputWithType = mapToPairWithFunctionAtSecond(getInputType)

    const getActiveError = getData('activeError')

    const getActiveErrors = map(getActiveError)

    const getInputsToSecond = transformTuple(getInputsWithinParent, 1)

    const getActiveErrorsAtSecond = transformTuple(getActiveErrors, 1)

    const secondIsPopulatedObject = pipe(returnSecond, isPopulatedObject)

    /**
     * Validates the format of the email.
     * @param {string} email - The email to validate.
     * @returns {Boolean} - the error object itself
     */
    const isValidEmail = email => EMAIL_REGEX.test(email)

    /**
     * Validates the format of the phone number.
     * @param {string} phone - The phone number to validate.
     * @returns {boolean} - True if the phone number is valid, false otherwise.
     */
    const isValidPhone = phone => PHONE_REGEX.test(phone)

    const arrayIsPopulatedAtSecond = pipe(returnSecond, isPopulatedArray)

    // MAIN DATA STREAMS
    /**
     * Sorts an array of objects based on the provided sort order.
     * @param {Array} arr
     * @returns {Array}
     */
    const sort = sortErrorStateObjects(SORT_ORDER)

    const getEmailErrorOnMalformed = tuple => {
      const email = tuple[1]

      return isValidEmail(email) ? {} : { malformed: 'email' }
    }

    const getPhoneErrorONalFormed = tuple => {
      const phone = tuple[1]

      return isValidPhone(phone) ? {} : { malformed: 'phone' }
    }

    /** Applies a class of 'hidden' tot he first element in a tuple. */
    const applyHiddenToFirst = transformTuple(addHiddenClass, 0)

    /** Removes a class of 'hidden' from the first element in a tuple. */
    const removeHiddenClassFromFirst = transformTuple(removeHiddenClass, 0)

    /**
     * Handles displaying the email error by fetching error message components and setting them active.
     * @param {Object} obj - The element to display the error message on.
     */
    const showErrorMessage = obj => {
      const { element, errorMessageName, errorType } = obj
      const value = `${errorType}-${errorMessageName}`
      const errorMessages = getErrorMessageComponents(element)
      setErrorMessageActive(errorMessages, value)
    }

    /** Maps input components to their current values. */
    const mapToInputWithValue = mapToPairWithFunctionAtSecond(getInputValue)

    /**
     * Assumes a tuple, where the first element is a HTMLInput, and the second is a string. Most of the inputs will be text inputs, but one is a checkbox, so this function converts the checkbox value to 'checked' or ''. otherwise it would jsut be 'on' regardless of the state of the checkbox
     */
    const convertInputValueIfCheckbox = ([x, y]) => {
      return (x.checked ? 'checked' : y) === 'on' ? '' : y
    }

    /**
     * Transforms a tuple to set the 'aria-invalid' attribute to 'true'.
     * @param {Array} tuple - The tuple to transform.
     */
    const tupleHasCheckedCheckBox = transformTupleWithTuple(
      convertInputValueIfCheckbox,
      1
    )

    /** Checks the second element in array to see if that array element is populated */
    const isPopulatedObjectAtSecond = pipe(returnSecond, isPopulatedObject)
    /**
     * Sets the inner text of the first element in a tuple to the second element.
     * @param {Array} arr - The tuple to update.
     * @returns {void} - Side effect, updates the inner text of the first element.
     */
    const setInnerTextToFirst = arr => {
      const [el, text] = arr
      el.innerText = text
    }

    /** Sets the 'activeErrors' data attribute. */
    const setActiveError = setData('activeError')

    const setFormSubmitted = setData('formSubmitted')
    const setFormSubmittedTrue = setFormSubmitted('true')

    const setFormError = setData('formError')
    const setErrorTrue = setFormError('true')

    /**
     * Updates the active errors state with the provided errors
     * @param {Array} tuple - The tuple to with information to use for the update
     */
    const setErrorsToInputTrue = tuple => {
      const [el, error] = tuple
      const setError = pipe(convertToString, setActiveError)(error)

      setAriaInvalidTrue(el)
      setError(el)
    }

    const setErrorsToInputFalse = tuple => {
      const [el] = tuple
      const setError = setActiveError('')
      setAriaInvalidFalse(el)
      setError(el)
    }

    const getErrorMessageSummaryChildOfFirst = transformTuple(
      childComponent('error-message-summary'),
      0
    )

    const getErrorQuantityElementAtFirst = transformTuple(
      childComponent('error-quantity'),
      0
    )

    const getLengthAtSecond = transformTuple(getLength, 1)

    /**
     * Handles the visibility of the error message summary based on the current error state.
     * @param {Array} arr - The tuple to update.
     */
    const handleApplyingSummaryVisibilityClass = pipe(
      ifElse(
        isPopulatedObjectAtSecond,
        removeHiddenClassFromFirst,
        applyHiddenToFirst
      )
    )

    const getActiveErrorsAndUpdateErrorMessageSummary = pipe(
      duplicate /* creates a tuple */,
      getErrorMessageSummaryChildOfFirst /* gets the error message summary element that is the child of the error message container element */,
      getInputsToSecond,
      getActiveErrorsAtSecond,
      filterEmptyAtSecond,
      tap(
        handleApplyingSummaryVisibilityClass
      ) /* mutation, hides or displays the error message summary, using the hidden class, which hides it from screen readers too */,
      getLengthAtSecond /* gets the error quantity element that is the child of the error message summary element */,
      getErrorQuantityElementAtFirst,
      tap(setInnerTextToFirst) /* mutation, sets innerText */
    )

    /**
     * Validates whether the email in a tuple is empty or malformed, while maintaining the tuple structure.
     * @param {Array} tuple - A tuple where the first element is usually an element and the second is the email string.
     * @returns {Array} - Returns the tuple with a boolean validation result replacing the second element.
     */
    const isMalformedOrEmptyEmail = tuple => [
      tuple[0],
      ifElse(
        () => notEmpty(tuple[1]),
        () => getEmailErrorOnMalformed(tuple),
        () => getEmailErrorOnEmpty
      )(),
    ]

    /**
     * Validates whether the phone in a tuple is empty or malformed, while maintaining the tuple structure.
     * @param {Array} tuple - A tuple where the first element is usually an element and the second is the phone string.
     */
    const isMalformedOrEmptyPhone = tuple => [
      tuple[0],
      ifElse(
        () => notEmpty(tuple[1]),
        () => getPhoneErrorONalFormed(tuple),
        () => getPhoneErrorOnEmpty
      )(),
    ]

    /**
     * Validates whether the consent in a tuple is empty, while maintaining the tuple structure.
     * @param {Array} tuple - A tuple where the first element is usually an element and the second is the consent string.
     */
    const isEmptyConsent = tuple => [
      tuple[0],
      tuple[1] ? {} : getConsentErrorOnEmpty,
    ]

    /**
     * Validates the inputs based on their keys.
     * @returns {Object} - The object with the validation results.
     */
    const validateInputsByKey = applySpecWithKey({
      email: isMalformedOrEmptyEmail,
      phone: isMalformedOrEmptyPhone,
      consent: isEmptyConsent,
    })

    const findELement = map(findDomElement)

    const getNameFromElement = pipe(findDomElement, getInputName)

    const getAndValidateInputsByKey = pipe(
      getNameFromElement,
      validateInputsByKey
    )

    /**
     * Retrieves an error message based on a specific value from an element's data-error-message attribute.
     * @param {string} value - The value to match against the data-error-message attribute.
     * @returns {Function} A function that returns true if the element's error message matches the value.
     */
    const getErrorMessageByValue = value => el => {
      /** @type {Boolean} */
      return el.getAttribute('data-error-message') === value
    }

    /**
     * @param {HTMLElement} el
     * @returns {Function}
     **/
    const setErrorActiveDataset = setData('errorActive')

    /**
     * @param {HTMLElement} el
     * @returns {Function}
     **/
    const setErrorActiveTrue = setErrorActiveDataset('true')

    /**
     * @param {HTMLElement} el
     * @returns {Function}
     **/
    const setErrorActiveFalse = setErrorActiveDataset('false')

    /**
     * @param {Array} arrayOfObjects
     * @returns {String}
     */
    const checkForEmailAndPhone = arrayOfObjects => {
      const values = arrayOfObjects.map(Object.values).flat()
      return isSubsetOf(PHONE_AND_EMAIL)(values) ? 'emailAndPhone' : null
    }

    /**
     * Email and Phone errors are combined into a single error when both are present, but only one input can be focused on at a time. This function formats the key so that the email input is focused on when the error is displayed.
     * @param {string} key - The key to format.
     * @returns {string} - The formatted key.
     */
    const formatKeyEmailOrPhoneKey = key =>
      key === 'emailAndPhone' ? 'email' : key

    /**
     * Focuses on the input with the provided key.
     * @param {string} key - The key to focus on.
     * @returns {void} - Side effect, focuses on the input.
     */
    const focusOnInput = (key, parentForm) => {
      /** @type {string} */
      const formattedKey = formatKeyEmailOrPhoneKey(key)

      /** @type {HTMLElement[]} */
      const inputs = childComponents('active-campaign-input')(parentForm)
      /** @type {HTMLElement} */
      const input = inputs.find(
        input => input.getAttribute('name') === formattedKey
      )
      input && focus(input)
    }

    /**
     * @param {HTMLElement[]} errorMessages
     * @param {string} value
     * @returns {Void} - Side effect, displays the error message
     **/
    const setErrorMessageActive = (errorMessages, value) => {
      const errorToShow = errorMessages.find(getErrorMessageByValue(value))
      setErrorActiveTrue(errorToShow)
    }

    /** normalize checkbox values for the data stream */
    const normalizeCheckboxValues = map(tupleHasCheckedCheckBox)

    const validateInputValues = elements =>
      elements.map(element => getAndValidateInputsByKey(element)(element))

    const applyErrorsFromInputs = pipe(
      ifElseForTuple(
        secondIsPopulatedObject,
        setErrorsToInputTrue,
        setErrorsToInputFalse,
        0
      )
    )

    /**
     * validates if the input is not empty or malformed
     * @returns {void}
     */
    const validateInputsNotEmptyOrMalformed = pipe(
      getInputComponents /* get all input components from form */,
      mapToInputWithType /* map input components to their types */,
      findELement /* get the first element of the tuple */,
      mapToInputWithValue /* map input components to their values [el, value] */,
      normalizeCheckboxValues /* convert checkbox values to 'checked' or '' */,
      validateInputValues,
      tap(
        map(
          applyErrorsFromInputs
        ) /* Mutation - update the input with the error state */
      ),
      dispatchActiveCampaignFormEvent /* mutation dispatch an event to update the error summary */
    )

    /**
     * Valid the text inputs in the form to check if they are not empty, and sets the error states if they are
     * @param {HTMLFormElement} form
     * @param {Event} event
     * @returns {void} - Side effect, updates DOM with error states
     */
    const validateInputs = (form, event) => {
      event.preventDefault()

      /* Mutation */
      validateInputsNotEmptyOrMalformed(form)
    }

    /**
     * Updates the error summary container for screen readers with the current error state.
     * @param {HTMLElement} el - The element to update.
     * @param {Event} _ - The event that triggered the update.
     * @returns {void} - Side effect, updates DOM with error summary
     */
    const updateErrorSummary = (el, _) => {
      getActiveErrorsAndUpdateErrorMessageSummary(el)
    }

    /**
     * Checks the error state for email and phone, and displays the appropriate error message.
     * @returns {void} - Side effect, updates DOM with error messages
     */
    const showErrorMessages = ([element, errors]) => {
      const errorInfoObjects = errors.map(error => {
        const errorValue =
          checkForEmailAndPhone(errors) || error.empty || error.malformed
        const errorKey = Object.keys(error)[0]
        const errorInfoObj = {
          element,
          errorMessageName: errorValue,
          errorType: errorKey,
        }
        return errorInfoObj
      })
      const firstInQue = errorInfoObjects[0]
      const parentForm = getParentForm(firstInQue.element)
      showErrorMessage(firstInQue) /* mutation */
      focusOnInput(firstInQue.errorMessageName, parentForm) /* mutation */
    }

    /**
     * @returns {HTMLElement[]}
     **/
    const hideErrorMessages = () =>
      components('error-message').forEach(setErrorActiveFalse)

    /**
     * @param {HTMLElement} el
     * @returns {Function}
     */
    const handleApplyingError = pipe(
      duplicate,
      getInputsToSecond,
      getActiveErrorsAtSecond,
      filterEmptyAtSecond,
      parseJsonAtSecond,
      tap(hideErrorMessages) /* mutation */,
      tap(
        ifElse(
          isPopulatedObjectAtSecond,
          showErrorMessages,
          doNothing
        ) /* mutation */
      )
    )

    /**
     * Displays an error message in the container bellow the form
     * @param {HTMLElement} el
     * @param {Event} _
     * @returns {void}
     */
    const displayErrorMessage = (el, _) => {
      /** @type {Function} */

      handleApplyingError(el)
    }

    /**
     * Check if string says show_thank_you or error
     * @param {string} str
     * @returns {boolean}
     */
    const isThankYouOrError = str => str === 'show_thank_you' || str === 'error'

    /** Check if string says show_thank_you
     * @param {string} str
     * @returns {boolean}
     */
    const isThankYou = str => str === 'show_thank_you'

    /** Check if string says error
     * @param {string} str
     * @returns {boolean}
     */
    const isError = str => str === 'error'

    const submitActiveCampaignForm = async tuple => {
      const [element] = tuple
      const form = getParentForm(element)

      const serializedData = serializeForm(form)
      const result = await postFormData(
        serializedData
      ) /* mutation, POST request */

      isThankYouOrError(result) && deactivateSubmit(form)

      const successMessage = childComponent('success-message')(element)
      isThankYouOrError(result) &&
        isThankYou(result) &&
        setFormSubmittedTrue(successMessage)

      const errorMessage = childComponent('error-message')(element)
      isThankYouOrError(result) && isError(result) && setErrorTrue(errorMessage)

    }

    const submitIfValid = pipe(
      duplicate,
      getInputsToSecond,
      getActiveErrorsAtSecond,
      filterEmptyAtSecond,
      ifElse(arrayIsPopulatedAtSecond, doNothing, submitActiveCampaignForm)
    )

    const submitForm = (el, _) => {
      submitIfValid(el)
    }

    // EVENT COMPOSITIONS
    /**
     * Composes the form validation functions into a single form handler.
     * @type {function}
     */
    const formHandler = onSubmit(validateInputs)

    /**
     * Composes the error message display function into a single error message handler
     * @type {function}
     */
    const errorMessageHandler = mapFunctions(
      onErrorMessageUpdate(displayErrorMessage),
      onErrorMessageUpdate(updateErrorSummary),
      onErrorMessageUpdate(submitForm)
    )

    // Activate form on load
    components('active-campaign-form').forEach(form => {
      activateSubmit(form)
    })

    // EVENT LISTENERS ATTACHMENTS
    components('active-campaign-form').forEach(form => formHandler(form))
    components('active-campaign-form-messages').forEach(el =>
      errorMessageHandler(el)
    )
  })
  .catch(error => {
    console.error('Failed to load module:', error)
  })
