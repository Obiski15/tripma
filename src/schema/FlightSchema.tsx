import { DateRange } from "react-day-picker";
import * as yup from "yup";

export const searchFlightSchema = yup.object({
  travelClass: yup
    .string<"FIRST" | "ECONOMY" | "BUSINESS" | "ECONOMY_PREMIUM">()
    .required("Travel class is required")
    .uppercase(),
  tripType: yup.string<"round" | "one way">().required("Trip type is required"),
  destination: yup.string().required("Desired destination is required"),
  date: yup
    .mixed<Date | DateRange>()
    .test(
      "is-date-or-date-range",
      'Must be a valid date or an object with a valid "from" date',
      (value): value is Date | DateRange => {
        if (value instanceof Date && !isNaN(value.getTime())) {
          return true;
        }

        if (
          typeof value === "object" &&
          value !== null &&
          "from" in value &&
          value.from instanceof Date &&
          !isNaN(value.from.getTime())
        ) {
          if (
            value.to === undefined ||
            (value.to instanceof Date && !isNaN(value.to.getTime()))
          ) {
            return true;
          }
        }

        return false;
      }
    )
    .required("Date field is required"),

  location: yup.string().required("Current location is required"),
  passengers: yup.object({
    adult: yup
      .number()
      .default(1)
      .positive()
      .min(1, "At least one adult passenger is required")
      .required("At least on passenger is required "),
    minor: yup.number().default(0).min(0),
  }),
});
