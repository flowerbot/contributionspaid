multifactSumAggregator = function() {
    return function(facts) {
  
      return function() {
        var summedFacts = {};
  
        for (_i = 0, _len = facts.length; _i < _len; _i++) {
          summedFacts[facts[_i]] = 0
        }
  
        return {
  
          push: function(record) {
            for ( _i = 0, _len = facts.length; _i < _len; _i++) {
              summedFacts[facts[_i]] += (parseFloat(record[facts[_i]] || 0));
            }
          },
  
          multivalue: function() {
            return summedFacts;
          },
  
          // return the first element for unsupported renderers.
          value: function() { return summedFacts[facts[0]]; },
          format: function(x) { return x; },
  
          label: "Facts"
        };
      };
    };
  }	