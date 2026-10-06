/* global YMK */ 

// Constants
/** @type {string} */
const CLASS_ACTIVE = 'active'

/** @type {string} */
const CLASS_MODAL_OPEN = 'model-open'

/** @type {string} */
const USER_CONSENT = 'agree'

/** @type {string} */
const STARTED = 'shadeFinderStarted'

/** @type {string} */
const SHADE = 'shade'

/** @type {string} */
const TRY_ON_POPUP_ACTIVE_HEADER = "<div id='wrapper_div'><span style='text-decoration: underline;'>Slide The Divider &amp; See Yourself</span><div class='sub_wrap'>BEFORE NUNORM <i class='bi bi-arrow-left-right'></i> AFTER NUNORM</div></div>"

/** @type {string} */
const TRY_ON_POPUP_SUCCESS_HEADER = 'Meet The NuYou'

/** @type {string} */
const ERROR_QUERY_NOT_FOUND = 'Element not found with the following query was not found'

/** @type {string} */
const ERROR_ELEMENT_NOT_FOUND = 'Element not found'

/** @type {string} */
const EVENT_CLICK = 'click'

/** @type {string} */
const EVENT_SUBMIT = 'submit'

/** @type {string} */
const EVENT_MOUSE_OVER = 'mouseover'

/** @type {string} */
const EVENT_DOM_CONTENT_LOADED = 'DOMContentLoaded'

/** @type {string} */
const EVENT_ENABLE_BUTTON_CLICK = 'enableButtonClick'

/** @type {string} */
const EVENT_DISABLE_BUTTON_CLICK = 'disableButtonClick'

/** @type {string} */
const SELECTOR_SHADE_FINDER_TITLE_CONTAINER = '[data-shade-finder-variant-title-container]'

/** @type {string} */
const SELECTOR_SHADE_FINDER_TITLE = '[data-shade-finder-variant-title]'

/** @type {string} */
const SELECTOR_SHADE_FINDER_FORM_VARIANT = '[data-shade-finder-form-variant]'

/** @type {string} */
const SELECTOR_SHADE_FINDER_INFO_CONTAINER = '[data-product-info-container]'

/** @type {string} */
const SELECTOR_POPUP_TRY_ON_MODAL = '.try-on-popup'

/** @type {string} */
const SELECTOR_INPUT = 'input'

/** @type {string} */
const SELECTOR_POPUP_VARIANT_INPUT = '.popup-variant-input'

/** @type {string} */
const SELECTOR_POPUP_VARIANT_INPUT_ACTIVE = '.popup-variant-input.active'

/** @type {string} */
const SELECTOR_MESSAGE = 'message'

/** @type {string} */
const SELECTOR_MESSAGE_ABOVE_POPUP = '#message_above_popup'

/** @type {string} */
const SELECTOR_SHADE_COLOR_BUTTON = '.shade-color-btn'

/** @type {string} */
const SELECTOR_PRODUCT_INFO = '.product-info'

/** @type {string} */
const SELECTOR_PRODUCT_INFO_ACTIVE = '.product-info.active'

/** @type {string} */
const SELECTOR_SHADE_COLOR_BUTTON_ACTIVE = '.shade-color-btn.active'

/** @type {string} */
const SELECTOR_CUSTOM_TRY_ON = '.custom-try-on'

/** @type {string} */
const SELECTOR_POPUP_CONTENT_WRAP = '.pop-up-content-wrap'

/** @type {string} */
const SELECTOR_SHADE_FINDER_PRIVACY_POLICY = '.shade-finder-privacy-policy'

/** @type {string} */
const SELECTOR_COLOR_SHADE = '.color-shade'

/** @type {string} */
const SELECTOR_TRY_ON_POPUP = '.try-on-popup'

/** @type {string} */
const SELECTOR_DISAGREE_BUTTON = 'disagree'

/** @type {string} */
const SELECTOR_SHADE_COLOR_BEST_MATCH = '[data-component-shade-color-group-tab][data-index="3"]'

/** @type {string} */
const SELECTOR_MATCHED_INPUT = '.matched input'

/** @type {string} */
const SELECTOR_MATCHED_COLOR_CONTAINER = '[data-matched-color-container]'

/** @type {string} */
const SHADE_FINDER_INSTRUCTION = "Adjust until all 3 lights <br> are 'green' then hold still"

/** @type {string} */
const EVENT_SHADE_FINDER_COMPLETE = 'shadeFinderComplete'

/** @type {string} */
const MESSAGE_SHADE_FINDER_COMPLETE = 'shadeFinder complete event triggered'

/** @type {string} */
const ERROR_NO_MATCHING_ITEM = 'No matching item found!'

/** @type {string} */
const SELECTOR_YMK_MODULE_IFRAME = 'YMK-module-iframe'

/** @type {Number} */
const PRODUCT_ID_NUYOU = 8314843660562

/** @type {string} */
const EVENT_CLOSED = 'closed'

/** @type {string} */
const ERROR_MODAL_NOT_FOUND = 'Shade finder modal not found to close.'

/** @type {string} */
const SELECTOR_SHADE_FINDER_MODAL = '[data-shade-finder-modal]'

/** @type {string} */
const TYPE_MATCHED = 'matched'

/** @type {string} */
const TYPE_DEEPER = 'deeper'

/** @type {string} */
const TYPE_LIGHTER = 'lighter'

/** @type {string} */
const SELECTOR_CUSTOM_MODAL_INNER = '.custom-modal-inner'

/** @type {number} */
const MODAL_HEIGHT = 398

/** @type {number} */
const SKIN_SMOOTH_STRENGTH = 90

/** @type {number} */
const SKIN_SMOOTH_COLOR_INTENSITY = 70

/** @type {number} */
const MODAL_WIDTH_ADJUSTMENT = 12

/** @type {number} */
const SHADE_FINDER_TIMEOUT = 2500

/** @type {string} */
const SELECTOR_POP_VARIANT = '#pop-variant'

/** @type {string} */
const SELECTOR_POPUP_VARIANT_TITLE = '.popup-variant-input:checked + label .variant-title'

/** @type {string} */
const SELECTOR_PRODUCT_WISHED_ID = '#product_wished_id'

/** @type {string} */
const ATTR_DATA_HANDLE = 'data-handle'

/** @type {string} */
const CSS_RULES = `
button#enable-compare:hover::before {
  content: "Comparison Tool";
  position: absolute;
  background-color: black;
  color: white;
  padding: 2px;
  border-radius: 4px;
  font-size: 13px;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  z-index: 1;
}
button#reset:hover::before {
  content: "Restart";
  position: absolute;
  background-color: black;
  color: white;
  padding: 2px;
  border-radius: 4px;
  font-size: 13px;
  left: 68%;
  transform: translateX(-68%);
  white-space: nowrap;
  z-index: 1;
}
button#zoom-in:hover::before {
  content: "Zoom in";
  position: absolute;
  background-color: black;
  color: white;
  padding: 2px;
  border-radius: 4px;
  font-size: 13px;
  left: 64%;
  transform: translateX(-64%);
  white-space: nowrap;
  z-index: 1;
}
button#zoom-out:hover::before {
  content: "Zoom out";
  position: absolute;
  background-color: black;
  color: white;
  padding: 2px;
  border-radius: 4px;
  font-size: 13px;
  left: 64%;
  transform: translateX(-64%);
  white-space: nowrap;
  z-index: 1;
  }
`

// Variables
/** @type {Number} */
const productId = window.productId
/** @type {NodeListOf<HTMLElement>} */
const tryOnPopups = document.querySelectorAll(SELECTOR_POPUP_TRY_ON_MODAL)

// functions
const components = string =>
  Array.from(document.querySelectorAll(`[data-component-${string}]`))
 
/** Get the variant id from the element
 * @param {HTMLElement} element - The element to get the variant id from
 * @returns {number} - The variant id
**/
const getVariant = element => {
  if (!element) {
    console.error(ERROR_ELEMENT_NOT_FOUND, element)
    return
  }
  const variantValue = element.value
  const variantId = parseInt(variantValue, 10)
  return variantId
}

/** Resize the shade finder
 * @param {number} width - The width to resize the shade finder to
 * @param {number} height - The height to resize the shade finder to
 * @returns {void}
**/
const resize = (width, height) => {
  window.YMK.changeSize(width, height)
}

/** Get the title of the shade finder by color id
 * @param {string} colorId - The color id to get the title for
 * @param {HTMLElement} element - The element to search for the title in
 * @returns {string} - The title of the shade finder
**/
const getTitleByColorId = (colorId, element) =>
  element ? element.querySelector(`#${colorId}`)?.textContent : undefined

/** Set the title of the shade finder 
 * @param {string} title - The title to set
 * @returns {void}
**/
const setShadeTitle = title => {
  /** @type {HTMLElement} */
  const titleElement = document.querySelector(SELECTOR_SHADE_FINDER_TITLE)
  if (!titleElement) {
    console.error(ERROR_QUERY_NOT_FOUND, SELECTOR_SHADE_FINDER_TITLE)
    return
  }
  titleElement.textContent = title
}

/** Get the value by color id
 * @param {number} colorId - The color id to get the value for
 * @param {HTMLElement} element - The element to search for the value in
 * @returns {string} - The value of the shade finder
**/
const getValueByColorId = (colorId, element) =>
  element
    ? element.querySelector(`#${colorId}`)?.querySelector(SELECTOR_INPUT)?.value
    : undefined

/** Set the shade finder form variant value
 * @param {string} value - The value to set
 * @returns {void}
**/
const setShadeFinderFormVariantValue = value => {
  /** @type {NodeListOf<HTMLInputElement>} */
  const shadeFinderFormVariantElements = document.querySelectorAll(
    SELECTOR_SHADE_FINDER_FORM_VARIANT
  )
  shadeFinderFormVariantElements.forEach(shadeFinderFormVariantElement => {
    shadeFinderFormVariantElement.value = value
  })
}

/** Display the shade finder title container element
 * @param {HTMLElement} container - The container to display
 * @returns {void}
**/
const displayShaderFinderTitleContainerElement = container => {
  if (container) {
    container.style.opacity = '1'
  }
}

// Tracking functions

/**
 * Track Tool Opened event
 * @param {boolean} isOpened - Whether the tool was opened
 */
function trackToolOpened(isOpened) {
  if (typeof gtag === 'function') {
    gtag('event', 'Open', {
      'toolOpened': isOpened ? '1' : '0'
    })
  } else {
    console.error('gtag function not available')
  }
}

/**
 * Track Skin Analysis Completed event
 * @param {string[]} matched - List of best match shades
 * @param {string[]} lighter - List of lighter shades
 * @param {string[]} deeper - List of deeper shades
 */
function trackSkinAnalysisCompleted(matched, lighter, deeper) {
  console.log('bestMatch', matched, 'lighter', lighter, 'deeper', deeper)
  if (typeof gtag === 'function') {
    gtag('event', 'skinAnalysis', {
      'Best Match': matched.join(', '),
      'Lighter': lighter.join(', '),
      'Deeper': deeper.join(', ')
    })
  } else {
    console.error('gtag function not available')
  }
}

/**
 * Track Add to Cart event
 * @param {string} product - The product name
 * @param {string} shade - The product shade
 * @param {number} value - The product value
 */
function trackAddToCart(product, shade, value) {
  if (typeof gtag === 'function') {
    gtag('event', 'TryOnAddCart', {
      'Product': product,
      'Shade': shade,
      'Value': value
    })
  } else {
    console.error('gtag function not available')
  }
}

// Listen for messages from the iframe
window.addEventListener(SELECTOR_MESSAGE, function (event) {
  if (event.data) {
    const { type } = event.data
    const messageAbovePopup = document.querySelector(
      SELECTOR_MESSAGE_ABOVE_POPUP
    )

    if (messageAbovePopup) {
      if (type === EVENT_ENABLE_BUTTON_CLICK) {
        messageAbovePopup.innerHTML = TRY_ON_POPUP_ACTIVE_HEADER
      } else if (type === EVENT_DISABLE_BUTTON_CLICK) {
        messageAbovePopup.innerHTML = TRY_ON_POPUP_SUCCESS_HEADER
      }
    }
  }
})

document.addEventListener(EVENT_DOM_CONTENT_LOADED, function () {
  const variantTitle = document.querySelector(SELECTOR_POPUP_VARIANT_TITLE)

  components('try-on-color-swatch').forEach(component => {
    component.addEventListener(EVENT_CLICK, function () {
      const title = component.getAttribute('data-title')
      if (title) {
        setShadeTitle(title)
        return
      }
      // to do: error handling
      // To do: closeModal()
    })
  })

  document
    .querySelector(SELECTOR_POPUP_VARIANT_INPUT)
    .addEventListener(EVENT_MOUSE_OVER, function () {
      variantTitle.style.display = 'inline-block'
    })

  document
    .querySelector(SELECTOR_POPUP_VARIANT_INPUT)
    .addEventListener('mouseout', function () {
      variantTitle.style.display = 'none'
    })

  const selectFirstVariant = () => {
    /** @type {NodeListOf<HTMLElement>} */
    const productInfoContainers = document.querySelectorAll(
      SELECTOR_SHADE_FINDER_INFO_CONTAINER
    )

    /** @type {HTMLElement} */
    const activeProductInfoContainer = [...productInfoContainers].find(
      container => container.classList.contains(CLASS_ACTIVE)
    )
    if (!activeProductInfoContainer) {
      console.error('Active product info container not found')
      return
    }

    /** @type {HTMLInputElement} */
    const firstVariant = activeProductInfoContainer.querySelector(
      SELECTOR_POPUP_VARIANT_INPUT
    )
    if (firstVariant) {
      firstVariant.checked = true
      firstVariant.click()
      
      /** @type {number} */
      const variantId = getVariant(firstVariant)
      if (variantId) {
        setShadeFinderFormVariantValue(variantId)
      }
    }
  }

  document.querySelectorAll(SELECTOR_CUSTOM_TRY_ON).forEach(element => {
    element.addEventListener(EVENT_CLICK, function () {
      $(SELECTOR_COLOR_SHADE).hide()
      $(SELECTOR_SHADE_FINDER_PRIVACY_POLICY).show()
      $(SELECTOR_POPUP_CONTENT_WRAP).hide()

      tryOnPopups.forEach(popup => popup.classList.add(CLASS_MODAL_OPEN))
      const productHandle = $(this).attr(ATTR_DATA_HANDLE)
      $(SELECTOR_PRODUCT_WISHED_ID).text(productHandle)
    })
  })

  document.querySelectorAll(SELECTOR_POPUP_VARIANT_INPUT).forEach(element => {
    element.addEventListener(EVENT_CLICK, function () {
      $(SELECTOR_POPUP_VARIANT_INPUT_ACTIVE).removeClass(CLASS_ACTIVE)
      $(this).addClass(CLASS_ACTIVE)
      const variantId = $(this).val()
      $(SELECTOR_POP_VARIANT).val(variantId)
    })
  })

  components('shade-color-group-tab').forEach((component, index) => {
    component.addEventListener(EVENT_CLICK, function () {
      /** @type {number} */
      const adjustedIndex = index + 1
      
      /** @type {string} */
      const productInfoSelector = `${SELECTOR_PRODUCT_INFO}${adjustedIndex}`

      /** @type {Element} */
      const currentActiveClassContainer = document.querySelector(
        SELECTOR_PRODUCT_INFO_ACTIVE
      )

      /** @type {Element} */
      const productInfo = document.querySelector(productInfoSelector)

      /** @type {Element[]} */
      const allOtherTabs = components('shade-color-group-tab')

      allOtherTabs.forEach(tab => tab.classList.remove(CLASS_ACTIVE))

      component.classList.add(CLASS_ACTIVE)

      if(currentActiveClassContainer) {
        currentActiveClassContainer.classList.remove(CLASS_ACTIVE)
      } else {
        console.error(ERROR_ELEMENT_NOT_FOUND, SELECTOR_PRODUCT_INFO_ACTIVE)
      }

      if (productInfo) {
        productInfo.classList.add(CLASS_ACTIVE)
      } else {
        console.error(ERROR_ELEMENT_NOT_FOUND, productInfoSelector)
      }

      selectFirstVariant()
    })
  })


document.getElementById(USER_CONSENT).addEventListener(EVENT_CLICK, () => {
  /** @type {HTMLElement} */
  const popupContentWrap = document.querySelector(SELECTOR_POPUP_CONTENT_WRAP)
  
  /** @type {HTMLElement} */
  const shadeFinderPrivacyPolicy = document.querySelector(SELECTOR_SHADE_FINDER_PRIVACY_POLICY)
  
  /** @type {HTMLElement} */
  const colorShade = document.querySelector(SELECTOR_COLOR_SHADE)

  if (popupContentWrap) {
    popupContentWrap.style.display = 'block'
  }

  if (shadeFinderPrivacyPolicy) {
    shadeFinderPrivacyPolicy.style.display = 'none'
  }

  window.YMK.openShadeFinder()

  setTimeout(() => {
    if (colorShade) {
      colorShade.style.display = 'block'
    }
  }, SHADE_FINDER_TIMEOUT)
})
  
  document.getElementById(SELECTOR_DISAGREE_BUTTON).addEventListener(EVENT_CLICK, () => {
    /** @type {HTMLElement} */
    const tryOnPopup = document.querySelector(SELECTOR_TRY_ON_POPUP)
    
    /** @type {HTMLElement} */
    const popupContentWrap = document.querySelector(SELECTOR_POPUP_CONTENT_WRAP)
    
    /** @type {HTMLElement} */
    const shadeFinderPrivacyPolicy = document.querySelector(SELECTOR_SHADE_FINDER_PRIVACY_POLICY)
  
    if (tryOnPopup) {
      tryOnPopup.classList.remove(CLASS_MODAL_OPEN)
    }
  
    if (popupContentWrap) {
      popupContentWrap.style.display = 'none'
    }
  
    if (shadeFinderPrivacyPolicy) {
      shadeFinderPrivacyPolicy.style.display = 'block'
    }
  })
})



/**
 * Apply makeup by SKU.
 * @param {Number} sku - The SKU to apply makeup by.
 */
const applyMakeupBySku = (sku) => {
  window.YMK.applyMakeupBySku(sku)
}

/**
 * Update the shade title.
 * @param {Number} sku - The SKU to get the title by.
 * @param {HTMLElement} container - The container element.
 */
const updateShadeTitle = (sku, container) => {
  const title = getTitleByColorId(sku, container)
  if (title) {
    setShadeTitle(title)
  }
}

/**
 * Display the SKUs.
 * @param {Array<Object>} recommendationArray - The array of recommendations.
 */


const displaySKUs = recommendationArray => {
  /** @type {HTMLElement} */
  const bestMatchTab = document.querySelector(SELECTOR_SHADE_COLOR_BEST_MATCH)

  /** @type {HTMLElement} */
  const matchedColorContainerElement = document.querySelector(
    SELECTOR_MATCHED_COLOR_CONTAINER
  )

  /** @type {HTMLElement} */
  const container = document.querySelector(
    SELECTOR_SHADE_FINDER_TITLE_CONTAINER
  )

  /** @type {NodeListOf<HTMLElement>} */
  const matchedInputs = document.querySelectorAll(SELECTOR_MATCHED_INPUT)
  if (matchedInputs.length > 0) {
    matchedInputs[0].classList.add(CLASS_ACTIVE)
  }

  /** @type {number} */
  const skuMatch = recommendationArray[0]['skuId']


  const result = {
    matchingItems: {
      lighter: [],
      matched: [],
      deeper: [],
    },
    nonMatchingItems: [],
  }

  recommendationArray.forEach(item => {
    /** @type {Array<string>} */
    const validIds = recommendationArray
      .filter(innerItem => innerItem.type === item.type)
      .map(innerItem => innerItem.skuId)

    const swatchElements = components('try-on-color-swatch')

    const type = item.type

    const filteredByType = Array.from(swatchElements).filter(
      element => element.dataset.componentTryOnColorSwatch === type
    )

    const filteredByValidIds = filteredByType.filter(element =>
      validIds.includes(element.id)
    )

    filteredByValidIds.forEach(element => {
      const titleAlreadyExists = result.matchingItems[type].find(
        item => item.dataset.title === element.dataset.title
      )
      if (!titleAlreadyExists) {
        result.matchingItems[type].push(element)
      }
    })

    filteredByType.forEach(element => {
      if (!validIds.includes(element.id)) {
        result.nonMatchingItems.push(element)
      }
    })

    result.nonMatchingItems.forEach(element => element.remove())

    if (bestMatchTab) {
      bestMatchTab.click()
    } else {
      console.error('Best match tab not found')
    }


    if (skuMatch) {
      applyMakeupBySku(skuMatch)
    } else {
      console.error('SKU not found')
    }

    updateShadeTitle(skuMatch, matchedColorContainerElement)
    updateFormVariantValue(skuMatch, matchedColorContainerElement)
    displayShaderFinderTitleContainerElement(container)
  })
  const { matched, lighter, deeper } = result.matchingItems

  trackSkinAnalysisCompleted(
    matched?.map(item => `${SHADE}-${item.dataset.title.toLowerCase()}` ),
    lighter?.map(item => `${SHADE}-${item.dataset.title.toLowerCase()}`),
    deeper?.map(item => `${SHADE}-${item.dataset.title.toLowerCase()}`)
  )
} 

/**
 * Update the shade finder form variant value.
 * @param {number} sku - The SKU to get the value by.
 * @param {HTMLElement} container - The container element.
 */
const updateFormVariantValue = (sku, container) => {
  const value = getValueByColorId(sku, container)
  if (value) {
    setShadeFinderFormVariantValue(value)
  }
}

/**
 * Find the matching item from the recommendations.
 * @param {Array} recommendations - The array of recommendations.
 * @param {string} productId - The product ID to match.
 * @returns {Object|null} - The matching item or null if not found.
 */
const findMatchingItem = (recommendations, productId) => {
  return recommendations.find(
    item => String(item.guid.productId) === String(productId)
  )
}

/**
 * Get the recommendations from the matching item.
 * @param {Object} matchingItem - The matching item.
 * @param {Array} recommendations - The array of recommendations.
 * @returns {Object} - The recommendations.
 */
const getRecommendations = (matchingItem, recommendations) => {
  const firstOrderIndex = matchingItem.order_index
  return recommendations[firstOrderIndex]
}

/**
 * Create the recommendation array from the recommendations.
 * @param {Object} recommendations - The recommendations.
 * @returns {Array} - The recommendation array.
 */
const createRecommendationArray = (recommendations) => {
  return [
    {
      type: TYPE_MATCHED,
      skuId: recommendations.matched.skuId,
      productId: recommendations.matched.productId,
    },
    {
      type: TYPE_DEEPER,
      skuId: recommendations.warmer.skuId,
      productId: recommendations.warmer.productId,
    },
    {
      type: TYPE_LIGHTER,
      skuId: recommendations.cooler.skuId,
      productId: recommendations.cooler.productId,
    },
    {
      type: TYPE_LIGHTER,
      skuId: recommendations.lighter.skuId,
      productId: recommendations.lighter.productId,
    },
    {
      type: TYPE_DEEPER,
      skuId: recommendations.darker.skuId,
      productId: recommendations.darker.productId,
    },
  ]
}

/**
 * Adjust recommendations for NuYou product.
 * @param {Array} recommendationArray - The recommendation array.
 * @param {Object} recommendations - The recommendations.
 * @returns {Array} - The adjusted recommendation array.
 */
const adjustRecommendationsForNuYou = (recommendationArray, recommendations) => {
  // Remove the 'lighter' recommendation for cooler
  const indexToRemoveLighter = recommendationArray.findIndex(
    item =>
      item.type === TYPE_LIGHTER && item.skuId === recommendations.cooler.skuId
  )
  if (indexToRemoveLighter !== -1) {
    recommendationArray = recommendationArray.toSpliced(indexToRemoveLighter, 1)
  }

  // Remove the 'warmer' recommendation
  const indexToRemoveWarmer = recommendationArray.findIndex(
    item =>
      item.type === TYPE_DEEPER && item.skuId === recommendations.warmer.skuId
  )
  if (indexToRemoveWarmer !== -1) {
    recommendationArray = recommendationArray.toSpliced(indexToRemoveWarmer, 1)
  }

  return recommendationArray
}

/**
 * Handle the shade finder complete event.
 * @param {Object} result - The result from the shade finder.
 */
const handleShadeFinderComplete = (result) => {
  const messageAbovePopup = document.querySelector(SELECTOR_MESSAGE_ABOVE_POPUP)
  if (messageAbovePopup) {
    messageAbovePopup.innerHTML = TRY_ON_POPUP_SUCCESS_HEADER
  }

  const matchingItem = findMatchingItem(result.recommendations, productId)

  if (!matchingItem) {
    console.error(ERROR_NO_MATCHING_ITEM)
    return
  }

  const recommendations = getRecommendations(matchingItem, result.recommendations)
  let recommendationArray = createRecommendationArray(recommendations)
  if (productId === PRODUCT_ID_NUYOU) {
    recommendationArray = adjustRecommendationsForNuYou(recommendationArray, recommendations)
  }

  displaySKUs(recommendationArray)

  const iframe = document.getElementById(SELECTOR_YMK_MODULE_IFRAME)
  const iframeDocument = iframe.contentDocument || iframe.contentWindow.document
  const styleElement = iframeDocument.createElement('style')

  styleElement.type = 'text/css'
  styleElement.appendChild(iframeDocument.createTextNode(CSS_RULES))
  iframeDocument.head.appendChild(styleElement)
}

/**
 * Handle the YMK closed event.
 */
const handleYMKClosed = () => {
  const modal = document.querySelector(SELECTOR_SHADE_FINDER_MODAL)
  if (!modal) {
    console.error(ERROR_MODAL_NOT_FOUND)
    return
  }
  modal.classList.remove(CLASS_MODAL_OPEN)
}

window.ymkAsyncInit = function () {
  const modalInnerWidth = $(SELECTOR_CUSTOM_MODAL_INNER).width()
  const adjustedModalWidth = modalInnerWidth - MODAL_WIDTH_ADJUSTMENT
  window.YMK.init({
    width: adjustedModalWidth,
    height: MODAL_HEIGHT,
    userConsent: USER_CONSENT,
    skinSmoothStrength: SKIN_SMOOTH_STRENGTH,
    skinSmoothColorIntensity: SKIN_SMOOTH_COLOR_INTENSITY,
  })

  window.YMK.addEventListener(STARTED, () =>{
    trackToolOpened(true)
    const messageAbovePopup = document.querySelector(SELECTOR_MESSAGE_ABOVE_POPUP)
    if (messageAbovePopup) {
      messageAbovePopup.innerHTML = SHADE_FINDER_INSTRUCTION
    }
  })
  window.YMK.addEventListener(EVENT_SHADE_FINDER_COMPLETE, handleShadeFinderComplete)
  window.YMK.addEventListener(EVENT_CLOSED, handleYMKClosed)
  document.querySelector('[data-component-shade-finder-form]')?.addEventListener(EVENT_SUBMIT, function (event) {
    event.preventDefault()
    /** @type {HTMLFormElement} */
    const form = event.target

    /** @type {HTMLInputElement} */
    const input = form.querySelector(SELECTOR_SHADE_FINDER_FORM_VARIANT)


    /** @type {string} */
    const productTitle = input.dataset.productTitle

    /** @type {string} */
    const variantTitle = `${SHADE}-${input.dataset.variantTitle.toLowerCase()}`

    /** @type {string} */
    const variantPrice = input.dataset.variantPrice


    /** @type {number} */
    const variantPriceInt = parseInt(variantPrice, 10)


    trackAddToCart( productTitle, variantTitle, variantPriceInt)
    form.submit()
  })
}