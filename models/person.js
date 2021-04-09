const mongoose = require('mongoose');

const PersonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        set: value => value.trim().replace(/\s+/g, " "),
        validate: [
            {
              validator: async function (value) {
                  // duplicate names allowed but not all fields duplicated
                const count = await this.model('Person')
                .countDocuments({ name: value, age: this.age, job: this.job });
      
                return !count;
              },
              message: props => `${props.value} exists. Please try a different genre name.`
            }
          ]
    },
    age: {
        type: Number,
        min: 0,
        max: 110
    },
    job: {
        type: String
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Person', PersonSchema);