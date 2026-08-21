// src/lib/attributes.ts

export interface AttributeValue {
  attributeId?: string;
  stringValue?: string | null;
  numberValue?: number | null;
  booleanValue?: boolean | null;
  attribute?: {
    id?: string;
    name: string;
    type?: string;
  };
}

const normalizeName = (str: string): string => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
};

const findAttr = (
  values: AttributeValue[] | null | undefined,
  attributeId: string,
  fallbackName?: string
): AttributeValue | null => {
  if (!values || !Array.isArray(values)) return null;

  // 1. Exact match on a.attributeId === attributeId or a.attribute.id === attributeId
  const exact = values.find(
    (a) => a.attributeId === attributeId || a.attribute?.id === attributeId
  );
  if (exact) return exact;

  // 2. Only if not found and fallbackName given: exact equality on NFD-normalised, diacritic-stripped, lowercased name
  if (fallbackName) {
    const targetName = normalizeName(fallbackName);
    const byName = values.find(
      (a) => a.attribute?.name && normalizeName(a.attribute.name) === targetName
    );
    if (byName) return byName;
  }

  return null;
};

export const getAttr = (
  values: AttributeValue[] | null | undefined,
  attributeId: string,
  fallbackName?: string
): string | number | null => {
  const attrVal = findAttr(values, attributeId, fallbackName);
  if (!attrVal) return null;

  if (attrVal.numberValue !== null && attrVal.numberValue !== undefined) {
    return attrVal.numberValue;
  }
  if (
    attrVal.stringValue !== null &&
    attrVal.stringValue !== undefined &&
    attrVal.stringValue !== ""
  ) {
    return attrVal.stringValue;
  }
  if (attrVal.booleanValue === true) {
    return "Da";
  }
  return null;
};

export const getAttrNumber = (
  values: AttributeValue[] | null | undefined,
  attributeId: string,
  fallbackName?: string
): number | null => {
  const attrVal = findAttr(values, attributeId, fallbackName);
  if (!attrVal) return null;

  if (attrVal.numberValue !== null && attrVal.numberValue !== undefined) {
    return attrVal.numberValue;
  }
  if (
    attrVal.stringValue !== null &&
    attrVal.stringValue !== undefined &&
    attrVal.stringValue !== ""
  ) {
    const cleanStr = attrVal.stringValue.replace(/[\s\u00A0]/g, "");
    const num = Number(cleanStr);
    return isNaN(num) ? null : num;
  }
  return null;
};

/**
 * Helper to resolve automotive model year.
 * On tenant cmk42dgx00ce8lj2871bq7mcy, car cmqy2lt4l0m5tp12ac4gt4fqb carries
 * attr:extra:An with stringValue "12.2015" (a month.year string), and Number("12.2015")
 * would render 12.2015 in the year cell.
 */
export const getAttrYear = (
  values: AttributeValue[] | null | undefined,
  attributeId: string,
  fallbackName?: string
): number | null => {
  const attrVal = findAttr(values, attributeId, fallbackName);
  if (!attrVal) return null;

  if (
    attrVal.numberValue !== null &&
    attrVal.numberValue !== undefined &&
    attrVal.numberValue >= 1900 &&
    attrVal.numberValue <= 2100
  ) {
    return attrVal.numberValue;
  }

  if (
    attrVal.stringValue !== null &&
    attrVal.stringValue !== undefined &&
    attrVal.stringValue !== ""
  ) {
    const yearMatch = attrVal.stringValue.match(/\b(19\d\d|20\d\d)\b/);
    if (yearMatch) {
      return Number(yearMatch[0]);
    }
  }

  return null;
};

export const hasAttr = (
  values: AttributeValue[] | null | undefined,
  attributeId: string,
  fallbackName?: string
): boolean => {
  const attrVal = findAttr(values, attributeId, fallbackName);
  if (!attrVal) return false;
  return attrVal.booleanValue === true;
};
