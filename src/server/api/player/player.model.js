import mongoose, { Schema } from 'mongoose'
mongoose.Promise = require('bluebird')

const PlayerSchema = new Schema({
  name: String,
  scores: {
    history_total_dkp: Number,
    left_total_dkp: Number,
    auction_dkp: Number,
    player_total_score: Number
  },
  scores_history: [{
    scoreLabel: String,
    actionValue: String,
    scoreValue: String,
    createdAt: String
  }]
})

// Public profile information
// PlayerSchema.virtual('profile').get(function () {
//   return {
//     name: this.name,
//     scores: this.scores
//   }
// })

export default mongoose.model('Player', PlayerSchema)
