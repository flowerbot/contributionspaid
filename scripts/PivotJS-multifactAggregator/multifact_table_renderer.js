
multifactTableRenderer = function(fmt){
    return function(pivotData) {
      console.log("format:", fmt);
      console.log("pd:", pivotData);
      var aggregator, c, colAttrs, colKey, colKeys, i, j, r, result, rowAttrs, rowKey, rowKeys, th, totalAggregator, tr, txt, val, x;
      colAttrs = pivotData.colAttrs;
      rowAttrs = pivotData.rowAttrs;
      rowKeys = pivotData.getRowKeys();
      colKeys = pivotData.getColKeys();
      colSpanArray=[];
  
      result = $("<table class='table table-bordered pvtTable mfTable'>");
  
      for (j in colAttrs) {
        c = colAttrs[j];
        tr = $("<tr>");
        if (parseInt(j) === 0 && rowAttrs.length !== 0) {
  
          tr.append($("<th>").attr("colspan", rowAttrs.length).attr("rowspan", colAttrs.length));
        }
  
        tr.append($("<th class='pvtAxisLabel'>").text(c));
  
  
        tmpAggregator = pivotData.getAggregator([], []);
        if (tmpAggregator.multivalue) {
          col_colspan = Object.keys(tmpAggregator.multivalue()).length;
          col_rowspan = 1
        } else {
          col_colspan = 1
          col_rowspan = 2
        }
  
        for (i in colKeys) {
          colKey = colKeys[i];
          th = $("<th class='pvtColLabel'>").text(colKey[j]).attr("colspan", col_colspan);
          if (parseInt(j) === colAttrs.length - 1 && rowAttrs.length !== 0) {
            th.attr("rowspan", col_rowspan);
          }
          tr.append(th);
        }
        if (parseInt(j) === 0) {
          tr.append($("<th class='pvtTotalLabel'>").text("Totals").attr("colspan", col_colspan).attr("rowspan", col_rowspan));
        }
        result.append(tr);
      }
      
      //header=result;
     // console.log($('table.pvtTable tr:first'));


      

      if (rowAttrs.length !== 0) {
        tr = $("<tr>");

        let ctr = 0;
        for (i in rowAttrs) {
          r = rowAttrs[i];
          ctr++;
          var colNum = ctr;
          (colAttrs.length > 0 && colNum == rowAttrs.length) ? colSpanArray.push(2) : colSpanArray.push(1);

          //tr.append($("<th class='pvtAxisLabel'>").text(r));
          tr.append($("<th class='pvtAxisLabel' data-span='"+colSpanArray[i]+"'>").text(r));

        }
  
        tmpAggregator = pivotData.getAggregator([], []);
        if (tmpAggregator.multivalue) {
          if (colAttrs.length > 0) {
            th = $("<th>");
            tr.append(th);
          }
  
          val = tmpAggregator.multivalue();
          for (i in colKeys) {
            for (v in val) {
             (v != "") ? tr.append($("<th class='pvtColLabel'>").text(v).data("value", v)) : tr.append($("<th class='pvtColLabel'>").text("0").data("value", "0")) ;
            }
          }
  
          for (v in val) {
            (v!= "") ? tr.append($("<th class='pvtColLabel'>").text(v).data("value", v)) : tr.append($("<th class='pvtColLabel'>").text("0").data("value", "0"));
          }
        } else {
          th = $("<th>");
          if (colAttrs.length === 0) {
            th.addClass("pvtTotalLabel").text("Totals");
          }
          tr.append(th);
        }
  
        result.append(tr);
      }
      for (i in rowKeys) {
        rowKey = rowKeys[i];
        tr = $("<tr>");
        for (j in rowKey) {
          txt = rowKey[j];
          th = $("<th class='pvtRowLabel'>").text(txt).attr("rowspan", x);
          if (parseInt(j) === rowAttrs.length - 1 && colAttrs.length !== 0) {
            th.attr("colspan", 2);
          }
          tr.append(th);
        }
        for (j in colKeys) {
          colKey = colKeys[j];
          aggregator = pivotData.getAggregator(rowKey, colKey);
  
          if (aggregator.multivalue) {
            val = aggregator.multivalue();
            for (v in val) {
             // console.log("V:",typeof v,":");
              (v != "")
              ? tr.append($("<td class='pvtVal row" + i + " col" + j + v + "'>").text(aggregator.format(val[v])).data("value", val[v]))
              : tr.append($("<td class='pvtVal row" + i + " col" + j + v + "'>").text(aggregator.format(0)).data("value", 0));
            }
          } else {
            val = aggregator.value();
            (val != "") 
            ? tr.append($("<td class='pvtVal row" + i + " col" + j + v + "'>").text(aggregator.format(val)).data("value", val))
            : tr.append($("<td class='pvtVal row" + i + " col" + j + v + "'>").text(aggregator.format(0)).data("value", 0));
          }
  
        }
        totalAggregator = pivotData.getAggregator(rowKey, []);
  
  
        if (totalAggregator.multivalue) {
          val = totalAggregator.multivalue();
          for (v in val) {
            tr.append($("<td class='pvtTotal rowTotal'>").text(val[v]).data("value", val[v]).data("for", "row" + i));
          }
        } else {
          val = totalAggregator.value();
          tr.append($("<td class='pvtTotal rowTotal'>").text(val).data("value", val).data("for", "row" + i));
        }
  
        result.append(tr);
      }
      tr = $("<tr>");
      th = $("<th class='pvtTotalLabel'>").text("Totals");
      th.attr("colspan", rowAttrs.length + (colAttrs.length === 0 ? 0 : 1));
      tr.append(th);
      for (j in colKeys) {
        colKey = colKeys[j];
        totalAggregator = pivotData.getAggregator([], colKey);
  
        if (totalAggregator.multivalue) {
          val = totalAggregator.multivalue();
          for (v in val) {
            tr.append($("<td class='pvtTotal colTotal'>").text(val[v]).data("value", val[v]).data("for", "col" + j));
          }
        } else {
          val = totalAggregator.value();
          tr.append($("<td class='pvtTotal colTotal'>").text(val).data("value", val).data("for", "col" + j));
        }
      }
  
      totalAggregator = pivotData.getAggregator([], []);
  
      if (totalAggregator.multivalue) {
        val = totalAggregator.multivalue();
        for (v in val) {
          tr.append($("<td class='pvtGrandTotal'>").text(val[v]).data("value", val[v]));
        }
      } else {
        val = totalAggregator.value();
        tr.append($("<td class='pvtGrandTotal'>").text(val).data("value", val));
      }
  
      result.append(tr);
      result.data("dimensions", [rowKeys.length, colKeys.length]);
      return result;
    };
  };