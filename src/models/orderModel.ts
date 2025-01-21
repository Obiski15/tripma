import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
  tripType: {
    required: [true, "Trip type is required"],
    type: String,
    enum: {
      values: ["round", "one way"],
      message: "Trip type can either be 'round' or 'one way'",
    },
  },
  itineraries: {
    type: [
      {
        duration: {
          required: [true, "fliight duration is required"],
          type: String,
        },
        segments: {
          required: [true, "flight segments missing"],
          type: [
            {
              departure: {
                iataCode: {
                  type: String,
                  required: [true, "segment iataCode is required"],
                },
                terminal: String,
                at: {
                  required: [true, "Missing departure time"],
                  type: [String, Date],
                },
              },
              arrival: {
                iataCode: {
                  type: String,
                  required: [true, "segment iataCode is required"],
                },
                terminal: String,
                at: {
                  required: [true, "Missing arrival time"],
                  type: [String, Date],
                },
              },
              blacklistedInEU: Boolean,
              numberOfStops: {
                type: Number,
                required: [true, "No of stops is required"],
              },
              carrierCode: {
                type: String,
                required: [true, "Segment carrierCode is missing"],
              },
              duration: {
                type: String,
                required: [true, "Segment duration is missing"],
              },
              number: {
                type: Number,
                required: [true, "Flight number is missing"],
              },
              id: { type: String, required: [true, "Segment id is missing"] },
              aircraft: {
                code: {
                  type: String,
                  required: [true, "Segment aircraft code is missing"],
                },
              },
              operating: {
                carrierCode: {
                  type: String,
                  required: [true, "Segment operating carrierCode is missing"],
                },
              },
            },
          ],
        },
      },
    ],
    required: "Missing flight itineraries",
  },
  price: {
    currency: { type: String, required: [true, "currency is missing"] },
    base: { type: Number, required: [true, "Base price is missing"] },
    grandTotal: {
      type: Number,
      required: [true, "Grand total price is missing"],
    },
    fees: [
      {
        amount: Number,
        type: String,
      },
    ],
    total: { type: Number, required: [true, "Total price is missing"] },
  },
  travelers: [
    {
      price: {
        currency: {
          type: String,
          required: [true, "traveler price currency is missing"],
        },
        total: {
          type: Number,
          required: [true, "traveler total price is required"],
        },
        base: {
          type: Number,
          required: [true, "traveler base price is required"],
        },
      },
      travelerType: {
        type: String,
        required: [true, "traveler type is missing"],
        enum: {
          values: ["child", "adult"],
          message: "traveler type can be either 'child' or 'adult'",
        },
      },
      firstName: {
        type: String,
        required: [true, "traveler first name is missing"],
      },
      lastName: {
        type: String,
        required: [true, "traveler last name is missing"],
      },
      gender: {
        type: String,
        required: [true, "traveler gender is missing"],
      },
      email: {
        type: String,
        required: [true, "traveler email is missing"],
      },
      phone: {
        type: Number,
        required: [true, "traveler phone number is required"],
      },
      dob: {
        type: Date,
        required: [true, "traveler date of birth is required"],
      },
    },
  ],
  airline: {
    type: String,
    required: [true, "Missing airline name"],
  },
  emergencyContact: {
    required: [true, "Emergency contact field is required"],
    type: {
      firstName: {
        type: String,
        required: [true, "Emergency contact first name is missing"],
      },
      lastName: {
        type: String,
        required: [true, "Emergency contact last name is missing"],
      },
      phone: {
        type: Number,
        required: [true, "Emergency contact phone number is required"],
      },
      email: {
        type: String,
        required: [true, "Emergency contact email is missing"],
      },
    },
  },
  seats: {
    type: Map,
    of: {
      type: Map,
      of: String,
    },
  },
  payment_id: String,
  payment_status: {
    type: String,
    default: "prcessing",
    enum: {
      values: ["processing", "success", "cancelled", "failed"],
      message: "Invalid payment status",
    },
  },
});

export const Order = mongoose.model("Order", orderSchema);
