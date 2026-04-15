export type ConversionCategory = "length" | "weight"

const lengthUnits = {
  mm: 0.001,
  cm: 0.01,
  m: 1,
  km: 1000,
  in: 0.0254,
  ft: 0.3048,
  yd: 0.9144,
  mi: 1609.344,
}

const weightUnits = {
  g: 0.001,
  kg: 1,
  oz: 0.028349523125,
  lb: 0.45359237,
  st: 6.35029318,
}

export const unitOptions = {
  length: [
    { value: "mm", label: "Millimetres" },
    { value: "cm", label: "Centimetres" },
    { value: "m", label: "Metres" },
    { value: "km", label: "Kilometres" },
    { value: "in", label: "Inches" },
    { value: "ft", label: "Feet" },
    { value: "yd", label: "Yards" },
    { value: "mi", label: "Miles" },
  ],
  weight: [
    { value: "g", label: "Grams" },
    { value: "kg", label: "Kilograms" },
    { value: "oz", label: "Ounces" },
    { value: "lb", label: "Pounds" },
    { value: "st", label: "Stone" },
  ],
}

export function convertUnit(
  category: ConversionCategory,
  value: number,
  from: string,
  to: string
) {
  if (Number.isNaN(value) || value < 0) return null

  const unitMap = category === "length" ? lengthUnits : weightUnits

  const fromFactor = unitMap[from as keyof typeof unitMap]
  const toFactor = unitMap[to as keyof typeof unitMap]

  if (!fromFactor || !toFactor) return null

  const baseValue = value * fromFactor
  const convertedValue = baseValue / toFactor

  return convertedValue
}