
const cutText = (text: string, length: number) => {
  if (text.split(" ").length > 1) {
    const string = text.substring(0, length);
    const splitText = string.split(" ");
    splitText.pop();
    return splitText.join(" ") + "...";
  } else {
    return text;
  }
};
const ListaToOptionsSelect = (lista: Array<any>, indice: string, descripcion: string) => {
  const listaOpcion: Array<any> = [];

  lista.map((fila, index) => {
    listaOpcion.push({ value: fila[indice], label: fila[descripcion] });
  });

  return listaOpcion;
}

const formatDateGeneral = (date: any) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const formatDateToISO = (dateString: string) => {
  const [day, month, year] = dateString.split('/');
  return `${year}-${month}-${day}`;
};
const handleConvert = (dateString: string) => {
  const [day, month, year] = dateString.split('/').map(Number);
  const converted = new Date(year, month - 1, day); // Months are 0-based in Date constructor
  return converted;
};

function findLast<T>(array: T[], predicate: (value: T, index: number, array: T[]) => boolean): T | undefined {
  for (let i = array.length - 1; i >= 0; i--) {
    if (predicate(array[i], i, array)) {
      return array[i];
    }
  }
  return undefined;
}


const formatDateLocaleString = (date: string) => {
  return new Date(date).toLocaleDateString("es-DO", { year: 'numeric', month: 'short', day: '2-digit' }).replace("de ", "");
};

function parseStringToDate(dateString: string) {
  // Split the date string into day, month, and year
  try {
    const dateParts = dateString.split('/');
    if (dateParts.length !== 3) {
      throw new Error('Invalid date format. Use dd/mm/yyyy');
    }

    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10);
    const year = parseInt(dateParts[2], 10);

    // Create a Date object using the components
    // Note: Months in JavaScript are 0-based (0 = January, 1 = February, ...)
    const date = new Date(year, month - 1, day);

    // Check if the Date object is valid
    if (
      date.getDate() !== day ||
      date.getMonth() !== month - 1 ||
      date.getFullYear() !== year
    ) {
      throw new Error('Invalid date');
    }

    return date;
  } catch (error) {
    return new Date();
  }
}

const capitalizeFirstLetter = (string: string) => {
  if (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  } else {
    return "";
  }
};

const onlyNumber = (string: string) => {
  if (string) {
    return string.replace(/\D/g, "");
  } else {
    return "";
  }
};

const ExtractJustError = (string: string) => {
  const startText = ":";
  const endText = "at";

  const regex = new RegExp(`\\${startText}(.*?)\\${endText}`);
  const matches = string.match(regex);
  if (matches && matches.length > 0) {
    const extractedText = matches[0].trim();
    return extractedText;
  } else {
    return string;
  }
}

//const formatCurrency = (number: number) => {
//  if (number) {
//    const formattedNumber = number.toString().replace(/\D/g, "");
//    const rest = formattedNumber.length % 3;
//    let currency = formattedNumber.substr(0, rest);
//    const thousand = formattedNumber.substr(rest).match(/\d{3}/g);
//    let separator;

//    if (thousand) {
//      separator = rest ? "." : "";
//      currency += separator + thousand.join(".");
//    }

//    return currency;
//  } else {
//    return "";
//  }
//};
function NoRegistrado(texto: any) {
  return texto.length != 0 ? texto : "No Registrado";
}

function formatCurrency(number: any) {
  const fixedNumber = Number.parseFloat(number).toFixed(2);
  return String(fixedNumber).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const isset = (obj: object | string) => {
  if (obj !== null && obj !== undefined) {
    if (typeof obj === "object" || Array.isArray(obj)) {
      return Object.keys(obj).length;
    } else {
      return obj.toString().length;
    }
  }

  return false;
};

const toRaw = (obj: object) => {
  return JSON.parse(JSON.stringify(obj));
};

const randomNumbers = (from: number, to: number, length: number) => {
  const numbers = [0];
  for (let i = 1; i < length; i++) {
    numbers.push(Math.ceil(Math.random() * (from - to) + to));
  }

  return numbers;
};

const toRGB = (value: string) => {
  return parseColor(value).color.join(" ");
};

const stringToHTML = (arg: string) => {
  const parser = new DOMParser(),
    DOM = parser.parseFromString(arg, "text/html");
  return DOM.body.childNodes[0] as HTMLElement;
};

const slideUp = (
  el: HTMLElement,
  duration = 300,
  callback = (el: HTMLElement) => { }
) => {
  el.style.transitionProperty = "height, margin, padding";
  el.style.transitionDuration = duration + "ms";
  el.style.height = el.offsetHeight + "px";
  el.offsetHeight;
  el.style.overflow = "hidden";
  el.style.height = "0";
  el.style.paddingTop = "0";
  el.style.paddingBottom = "0";
  el.style.marginTop = "0";
  el.style.marginBottom = "0";
  window.setTimeout(() => {
    el.style.display = "none";
    el.style.removeProperty("height");
    el.style.removeProperty("padding-top");
    el.style.removeProperty("padding-bottom");
    el.style.removeProperty("margin-top");
    el.style.removeProperty("margin-bottom");
    el.style.removeProperty("overflow");
    el.style.removeProperty("transition-duration");
    el.style.removeProperty("transition-property");
    callback(el);
  }, duration);
};

const slideDown = (
  el: HTMLElement,
  duration = 300,
  callback = (el: HTMLElement) => { }
) => {
  el.style.removeProperty("display");
  let display = window.getComputedStyle(el).display;
  if (display === "none") display = "block";
  el.style.display = display;
  const height = el.offsetHeight;
  el.style.overflow = "hidden";
  el.style.height = "0";
  el.style.paddingTop = "0";
  el.style.paddingBottom = "0";
  el.style.marginTop = "0";
  el.style.marginBottom = "0";
  el.offsetHeight;
  el.style.transitionProperty = "height, margin, padding";
  el.style.transitionDuration = duration + "ms";
  el.style.height = height + "px";
  el.style.removeProperty("padding-top");
  el.style.removeProperty("padding-bottom");
  el.style.removeProperty("margin-top");
  el.style.removeProperty("margin-bottom");
  window.setTimeout(() => {
    el.style.removeProperty("height");
    el.style.removeProperty("overflow");
    el.style.removeProperty("transition-duration");
    el.style.removeProperty("transition-property");
    callback(el);
  }, duration);
};

const groupBy = (array: Array<any>, propiedad: string) => {
  return array.reduce((result, item) => {
    const key = item[propiedad];
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
    return result;
  }, {});
}

const getUniquePropertyValues = (array: Array<any>, propiedad: string) => {
  return Array.from(new Set(array.map(item => item[propiedad])));
}

const getUniquePropertyCombinations = (array: Array<any>, propiedades: Array<string>) => {
  return Array.from(
    new Set(array.map(item => propiedades.map(prop => item[prop]).join(',')))
  ).map(combination => combination.split(','));
}

export {
  formatDateLocaleString,
  capitalizeFirstLetter,
  onlyNumber,
  formatCurrency,
  isset,
  toRaw,
  randomNumbers,
  toRGB,
  stringToHTML,
  slideUp,
  slideDown,
  ListaToOptionsSelect,
  ExtractJustError,
  findLast,
  formatDateGeneral,
  formatDateToISO,
  handleConvert,
  parseStringToDate,
  NoRegistrado,
  groupBy,
  getUniquePropertyValues,
  getUniquePropertyCombinations
};
