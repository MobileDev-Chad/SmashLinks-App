import mongoose from "mongoose";

const MatchSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    winner: { type: String, required: true },
    losser: { type: String, required: true },
    userCharacter: [],
    opponentCharacter: [],
    stages: [],
    userGames: { type: Number, min: 0, max: 2 },
    opponentGames: { type: Number, min: 0, max: 2 },
  },
  { timestamps: true }
);

const MatchModel = mongoose.model("Matches", MatchSchema);
export default MatchModel;
