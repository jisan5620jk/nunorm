const utilsModulePath = `../assets/utils.js?v=${Date.now()}`
const microModalModulePath = `../assets/micromodal.min.js?v=${Date.now()}`

import(utilsModulePath)
  .then(module => {
    const {
      log,
      tap,
      map,
      pipe,
      focus,
      filter,
      ifElse,
      onClick,
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
      components,
      returnFirst,
      returnSecond,
      getInputName,
      getInputType,
      mapFunctions,
      getInputValue,
      serializeForm,
      findDomElement,
      childComponent,
      ifElseForTuple,
      transformTuple,
      curriedAddClass,
      childComponents,
      convertToString,
      applySpecWithKey,
      isPopulatedArray,
      isPopulatedObject,
      getParentComponent,
      setAriaInvalidTrue,
      setAriaInvalidFalse,
      curriedSetInnerText,
      curriedRemoveClass,
      asyncUpdateCartProperty,
      debouncedListenToElement,
      mapToPairWithFunctionAtSecond,
      copyElementInnerTextToClipboard,
    } = module

    // Now load micro-modal.js
    import(microModalModulePath)
      .then(microModalModule => {
        // Constants
        const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const getEmailErrorOnEmpty = { empty: 'email' }

        const MicroModal = microModalModule.default

        // Functions
        const addSuccessClass = curriedAddClass('EM_content-wrapper--success')

        const arrayIsPopulatedAtSecond = pipe(returnSecond, isPopulatedArray)

        /** Dispatches an 'errorUpdate' event. */
        const dispatchErrorUpdate = dispatch('modalErrorUpdate')

        const getActiveError = getData('activeError')

        const getActiveErrors = map(getActiveError)

        const getInputsWithinParent = child => {
          const parent = child.closest(
            '[data-component-active-campaign-modal-form]'
          )
          return getInputComponents(parent)
        }

        const getInputsToSecond = transformTuple(getInputsWithinParent, 1)

        const getActiveErrorsAtSecond = transformTuple(getActiveErrors, 1)

        /** Retrieves the child component of the form message container. */
        const getFormMessageContainerChild = childComponent(
          'active-campaign-modal-form-messages'
        )

        const getTextToCopy = childComponent('text-to-copy')

        /** Retrieves the child component of the form submit button. */
        const getFormSubmitButtonChild = childComponent('active-campaign-modal-form-submit')


        /** goes up then down to the submit button and disables */
        const deactivateSubmit = pipe(
          getFormSubmitButtonChild,
          disable
        )

        /** Retrieves the parent form of the provided element. */
        const getParentForm = getParentComponent('active-campaign-modal-form')

        /** Relieves the parent modal content wrapper of the provided element */
        const getParentModalContentWrapper = getParentComponent(
          'active-campaign-modal-content-wrapper'
        )

        /** Retrieves the first element in a nested array. */
        const getFirstSubNested = pipe(flatten, returnFirst)

        /** Maps through a an array of arrays, and finds the first element */
        const findElement = map(findDomElement)

        const filterEmptyAtSecond = transformTuple(filter(notEmpty), 1)

        /**
         * Focuses on the input with the provided key.
         * @param {string} key - The key to focus on.
         * @returns {void} - Side effect, focuses on the input.
         */
        const focusOnInput = (key, parentForm) => {
          /** @type {HTMLElement[]} */
          const inputs = childComponents('active-campaign-input')(parentForm)
          /** @type {HTMLElement} */
          const input = inputs.find(input => input.getAttribute('name') === key)
          input && focus(input)
        }

        const getErrorMessageComponents = childComponents('error-message')
        const getCopyButtonComponent = childComponent('success-button')

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

        const setTexTtoCopied = curriedSetInnerText('Copied!')

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
         * @returns {Void} - Side effect, displays the error message
         **/
        const setErrorMessageActive = (errorMessages, value) => {
          const errorToShow = errorMessages.find(getErrorMessageByValue(value))
          setErrorActiveTrue(errorToShow)
        }
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

        /** Sets the 'hasErrorMessageActive' class on the provided element. */
        const setHasErrorMessageActiveClass = curriedAddClass('EM_content-wrapper--hasErrorMessageActive')

        const setLoadingClass = curriedAddClass('EM_content-wrapper--loading')

        /** Removes the 'hasErrorMessageActive' class from the provided element */
        const removeHasErrorMessageActiveClass = curriedRemoveClass('EM_content-wrapper--hasErrorMessageActive')

        const removeLoadingClass = curriedRemoveClass('EM_content-wrapper--loading')

        /**
         * Validates the format of the email.
         * @param {string} email - The email to validate.
         * @returns {Boolean} - the error object itself
         */
        const isValidEmail = email => EMAIL_REGEX.test(email)

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

        const getEmailErrorOnMalformed = tuple => {
          const email = tuple[1]

          return isValidEmail(email) ? {} : { malformed: 'email' }
        }

        /** Checks the second element in array to see if that array element is populated */
        const isPopulatedObjectAtSecond = pipe(returnSecond, isPopulatedObject)

        /** Gets the name of an element */
        const getNameFromElement = pipe(findDomElement, getInputName)

        /**
         * Validates the inputs based on their keys.
         * @returns {Object} - The object with the validation results.
         */
        const validateInputsByKey = applySpecWithKey({
          email: isMalformedOrEmptyEmail,
        })

        /** Validates the input depending on its type, gets type from name */
        const getAndValidateInputsByKey = pipe(
          getNameFromElement,
          validateInputsByKey
        )

        /** Retrieves active input components for a given campaign. */
        const getInputComponents = childComponents('active-campaign-input')

        /** Sets the 'activeErrors' data attribute. */
        const setActiveError = setData('activeError')
        
        const setFormSubmitted = setData('formSubmitted')

        const setFormError = setData('formError')

        /** Updates the active errors state with the provided errors */
        const setErrorsToInputFalse = tuple => {
          const [el] = tuple
          const setError = setActiveError('')
          setAriaInvalidFalse(el)
          setError(el)
        }

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

        /* Checks if the second element of a tuple is a populated object. */
        const secondIsPopulatedObject = pipe(returnSecond, isPopulatedObject)

        /** Maps input components to their types. */
        const mapToInputWithType = mapToPairWithFunctionAtSecond(getInputType)

        /** Maps input components to their current values. */
        const mapToInputWithValue = mapToPairWithFunctionAtSecond(getInputValue)

        const parseJsonAtSecond = transformTuple(map(parseJSON), 1)

        /** Validates input values. */
        const validateInputValues = elements =>
          elements.map(element => getAndValidateInputsByKey(element)(element))

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
        const onErrorMessageUpdate = debouncedListenToElement(
          'modalErrorUpdate',
          300
        )

        // MODULE SPECIFIC UTILITIES

        // MAIN DATA STREAMS

        const showModal = () => {
          MicroModal.show('email-modal')
          asyncUpdateCartProperty('emailModalShown', 'true')
        }


        const applyErrorsFromInputs = pipe(
          ifElseForTuple(
            secondIsPopulatedObject,
            setErrorsToInputTrue,
            setErrorsToInputFalse,
            0
          )
        )

        /**
         * Dispatches an 'errorUpdate' event to the parent form of the provided element.
         * @param {Array} x - the array of arrays, with the first element being the element to dispatch the event on.
         * @returns {void} - Side effect, dispatches the event.
         */
        const dispatchActiveCampaignFormEvent = x => {
          const firstElement = getFirstSubNested(x)
          const parentForm = getParentForm(firstElement)
          const formMessageContainerChild =
            getFormMessageContainerChild(parentForm)
          dispatchErrorUpdate(formMessageContainerChild)
        }
        const validateInputNotEmptyOrMalformed = pipe(
          getInputComponents,
          mapToInputWithType,
          findElement,
          mapToInputWithValue,
          validateInputValues,
          tap(
            map(
              applyErrorsFromInputs
            ) /* Mutation - update the input with the error state */
          ),
          dispatchActiveCampaignFormEvent
        )

        const validateInput = (form, event) => {
          event.preventDefault()
          /* Mutation */
          validateInputNotEmptyOrMalformed(form)
        }

        /**
         * Checks the error state for email and phone, and displays the appropriate error message.
         * @returns {void} - Side effect, updates DOM with error messages
         */
        const showErrorMessages = ([element, errors]) => {
          const errorInfoObjects = errors.map(error => {
            const errorValue = error.empty || error.malformed
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
          const parentModalContentWrapper = getParentModalContentWrapper(parentForm)
          setHasErrorMessageActiveClass(parentModalContentWrapper)
          focusOnInput(firstInQue.errorMessageName, parentForm) /* mutation */
        }

        const hideErrorMessages = ([element, errors]) => {
          const parentModalContentWrapper = getParentModalContentWrapper(element)
          removeHasErrorMessageActiveClass(parentModalContentWrapper) /* mutation */
          components('error-message').forEach(setErrorActiveFalse) /* mutation */
        }
          
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

        const submitActiveCampaignForm = async tuple => {
          const [element] = tuple
          const form = getParentForm(element)
    
          const serializedData = serializeForm(form)
          const parentModalContentWrapper = getParentModalContentWrapper(form)
          setLoadingClass(parentModalContentWrapper) /* mutation */
          const result = await postFormData(
            serializedData
          ) /* mutation, POST request */
          
          isThankYouOrError(result) && deactivateSubmit(form)
          addSuccessClass(parentModalContentWrapper) /* mutation */
          removeLoadingClass(parentModalContentWrapper) /* mutation */
        }

        const submitIfValid = pipe(
          duplicate,
          getInputsToSecond,
          getActiveErrorsAtSecond,
          filterEmptyAtSecond,
          ifElse(arrayIsPopulatedAtSecond, doNothing, submitActiveCampaignForm)
        )

        /**
         * Submits the form if it is valid.
         * @param {HTMLElement} el - The element to submit.
         * @param {Event} _ - The event object.
         * @returns {void} - Side effect, submits the form.
        **/
        const submitForm = (el, _) => {
          submitIfValid(el)
        }

        const copyToClipBoard = pipe(
          getParentModalContentWrapper,
          getTextToCopy,
          tap(copyElementInnerTextToClipboard) /* mutation */,
          getParentModalContentWrapper,
          getCopyButtonComponent,
          setTexTtoCopied /* mutation */
        )

        // EVENT COMPOSITIONS
        /**
         * Composes the form validation functions into a single form handler.
         * @type {function}
         */
        const formHandler = onSubmit(validateInput)

        /**
         * Composes the error message display function into a single error message handler
         * @type {function}
         */
        const errorMessageHandler = mapFunctions(
          onErrorMessageUpdate(displayErrorMessage),
          onErrorMessageUpdate(submitForm)
        )

        const clipBoardCopyHandler = el => {
          onClick(copyToClipBoard)(el)
        }

        // Activate modal on load
        debounce(showModal(), 500)

        // EVENT LISTENERS ATTACHMENTS
        components('active-campaign-modal-form').forEach(form =>
          formHandler(form)
        )
        components('active-campaign-modal-form-messages').forEach(el =>
          errorMessageHandler(el)
        )

        components('success-button').forEach(el => clipBoardCopyHandler(el))
      })
      .catch(error => {
        console.error('Error loading MicroModal:', error)
      })
  })
  .catch(error => {
    console.error('Error loading utils:', error)
  })
