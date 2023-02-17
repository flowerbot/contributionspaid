

multifactSumAggregator = function(fmt) {

 

  return function (_arg) {
   // console.log(_arg);
  //  console.log(vals)
  
    numberFormat = function (opts) {
        var defaults;
        defaults = {
            digitsAfterDecimal: 0,
            scaler: 1,
            thousandsSep: ",",
            decimalSep: ".",
            prefix: "$",
            suffix: "",
            showZero: true
        };
        opts = $.extend(defaults, opts);
        return function (x) {
            var result;
            if (isNaN(x) || !isFinite(x)) {
                return "";
            }
            if (x === 0 && !opts.showZero) {
                return "";
            }
            result = addSeparators((opts.scaler * x).toFixed(opts.digitsAfterDecimal), opts.thousandsSep, opts.decimalSep);
            return "" + opts.prefix + result + opts.suffix;
        };
    };

    curFormat = numberFormat({
      digitsAfterDecimal: 0,
      prefix: "$"
  });


    return function (data, rowKey, colKey) {
        var _i = 0;
        var _summedFacts = {};
        var _len = _arg.length;
        if (_len == 0) {
          _arg = ["LEVIED","PAID"];
          _len = 2;
        }
        while (_i < _len) {
            _summedFacts[_arg[_i]] = 0;
            _i++;
        }
       // console.log(_arg, _summedFacts);
        return {
            push: function (record) {
                var _i = 0;
                var _len = _arg.length;
                while (_i < _len) {
                    if (!isNaN(parseFloat(record[_arg[_i]]))) {
                        _summedFacts[_arg[_i]] += parseFloat(record[_arg[_i]]);
                    } else {
                      _summedFacts[_arg[_i]] += 0;
                     // console.log("zero kicked in");
                    }
                    _i++;
                }
                //console.log(_summedFacts);
            },
            multivalue: function () {
                return _summedFacts;
            },
            value: function () {
                return _summedFacts[_arg[0]];
            }, 
            format: numberFormat.opts,
            numInputs: 3
        };
    };
};


  /*
    return function(facts) {

      console.log(facts);
  
      return function() {
        var summedFacts = {};
  
        for (_i = 0, _len = facts.length; _i < _len; _i++) {
          summedFacts[facts[_i]] = 0
        }
  
       // console.log(summedFacts);

        return {
  
          push: function(record) {
          //  console.log(record);
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
    */
  }	

/*
  mfAggregatorTemplates = {
    mfSum: function (formatter) {
      if (formatter == null) {
          formatter = usFmtInt;
      }
      return function (_arg) {
          return function (data, rowKey, colKey) {
              var _i = 0;
              var _summedFacts = {};
              var _len = _arg.length;
              while (_i < _len) {
                  _summedFacts[_arg[_i]] = 0;
                  _i++;
              }
              return {
                  push: function (record) {
                      var _i = 0;
                      var _len = _arg.length;
                      while (_i < _len) {
                          if (!isNaN(parseFloat(record[_arg[_i]]))) {
                              _summedFacts[_arg[_i]] += parseFloat(record[_arg[_i]]);
                          }
                          _i++;
                      }
                  },
                  multivalue: function () {
                      return _summedFacts;
                  },
                  value: function () {
                      return _summedFacts[_arg[0]];
                  },
                  format: formatter
              };
          };
      };
  },
  }
*/